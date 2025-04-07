
export const arrow = {
	name: 'arrow',

	init(jsep) {
		// arrow-function expressions: () => x, v => v, (a, b) => v
		jsep.addBinaryOp('=>', 0.1, true);

		// this hook searches for the special case () => ...
		// which would normally throw an error because of the invalid LHS to the bin op
		jsep.hooks.add('gobble-expression', function gobbleEmptyArrowArg(env) {
			this.gobbleSpaces();
			if (this.code === jsep.OPAREN_CODE) {
				const backupIndex = this.index;
				this.index++;

				this.gobbleSpaces();
				if (this.code === jsep.CPAREN_CODE) {
					this.index++;

					const biop = this.gobbleBinaryOp();
					if (biop === '=>') {
						// () => ...
						const body = this.gobbleBinaryExpression();
						if (!body) {
							this.throwError("Expected expression after " + biop);
						}
						env.node = {
							type: 'ArrowFunctionExpression',
							params: null,
							body,
						};
						return;
					}
				}
				this.index = backupIndex;
			}
		});

		jsep.hooks.add('after-expression', function fixBinaryArrow(env) {
			updateBinariesToArrows(env.node);
		});

		function updateBinariesToArrows(node) {
			if (node) {
				// Traverse full tree, converting any sub-object nodes as needed
				Object.values(node).forEach((val) => {
					if (val && typeof val === 'object') {
						updateBinariesToArrows(val);
					}
				});

				if (node.operator === '=>') {
					node.type = ARROW_EXP;
					node.params = node.left ? [node.left] : null;
					node.body = node.right;
					if (node.params && node.params[0].type === jsep.SEQUENCE_EXP) {
						node.params = node.params[0].expressions;
					}
					delete node.left;
					delete node.right;
					delete node.operator;
				}
			}
		}
	}
};

const OCURLY_CODE = 123; // {
const CCURLY_CODE = 125; // }
const OBJECT_EXP  = 'ObjectExpression';
const PROPERTY    = 'Property';

export const object = {
	name: 'object',

	init(jsep) {
		// Object literal support
		function gobbleObjectExpression(env) {
			if (this.code === OCURLY_CODE) {
				this.index++;
				const properties = [];

				while (!isNaN(this.code)) {
					this.gobbleSpaces();
					if (this.code === CCURLY_CODE) {
						this.index++;
						env.node = this.gobbleTokenProperty({
							type: OBJECT_EXP,
							properties,
						});
						return;
					}

					// Note: using gobbleExpression instead of gobbleToken to support object destructuring
					const key = this.gobbleExpression();
					if (!key) {
						break; // missing }
					}

					this.gobbleSpaces();
					if (key.type === jsep.IDENTIFIER && (this.code === jsep.COMMA_CODE || this.code === CCURLY_CODE)) {
						// property value shorthand
						properties.push({
							type: PROPERTY,
							computed: false,
							key,
							value: key,
							shorthand: true,
						});
					}
					else if (this.code === jsep.COLON_CODE) {
						this.index++;
						const value = this.gobbleExpression();

						if (!value) {
							this.throwError('unexpected object property');
						}
						const computed = key.type === jsep.ARRAY_EXP;
						properties.push({
							type: PROPERTY,
							computed,
							key: computed
								? key.elements[0]
								: key,
							value: value,
							shorthand: false,
						});
						this.gobbleSpaces();
					}
					else if (key) {
						// spread, assignment (object destructuring with defaults), etc.
						properties.push(key);
					}

					if (this.code === jsep.COMMA_CODE) {
						this.index++;
					}
				}
				this.throwError('missing }');
			}
		}

		jsep.hooks.add('gobble-token', gobbleObjectExpression);
	}
};

const FSLASH_CODE = 47; // '/'
const BSLASH_CODE = 92; // '\\'

export const regex = {
	name: 'regex',

	init(jsep) {
		// Regex literal: /abc123/ig
		jsep.hooks.add('gobble-token', function gobbleRegexLiteral(env) {
			if (this.code === FSLASH_CODE) {
				const patternIndex = ++this.index;

				let inCharSet = false;
				while (this.index < this.expr.length) {
					if (this.code === FSLASH_CODE && !inCharSet) {
						const pattern = this.expr.slice(patternIndex, this.index);

						let flags = '';
						while (++this.index < this.expr.length) {
							const code = this.code;
							if ((code >= 97 && code <= 122) // a...z
								|| (code >= 65 && code <= 90) // A...Z
								|| (code >= 48 && code <= 57)) { // 0-9
								flags += this.char;
							}
							else {
								break;
							}
						}

						let value;
						try {
							value = new RegExp(pattern, flags);
						}
						catch (e) {
							this.throwError(e.message);
						}

						env.node = {
							type: jsep.LITERAL,
							value,
							raw: this.expr.slice(patternIndex - 1, this.index),
						};

						// allow . [] and () after regex: /regex/.test(a)
						env.node = this.gobbleTokenProperty(env.node);
						return env.node;
					}
					if (this.code === jsep.OBRACK_CODE) {
						inCharSet = true;
					}
					else if (inCharSet && this.code === jsep.CBRACK_CODE) {
						inCharSet = false;
					}
					this.index += this.code === BSLASH_CODE ? 2 : 1;
				}
				this.throwError('Unclosed Regex');
			}
		});
	},
};

export const jsepSpread = {
	name: 'jsepSpread',

	init(jsep) {
		// Spread operator: ...a
		// Works in objects { ...a }, arrays [...a], function args fn(...a)
		// NOTE: does not prevent `a ? ...b : ...c` or `...123`
		jsep.hooks.add('gobble-token', function gobbleSpread(env) {
			if ([0, 1, 2].every(i => this.expr.charCodeAt(this.index + i) === jsep.PERIOD_CODE)) {
				this.index += 3;
				env.node = {
					type: 'SpreadElement',
					argument: this.gobbleExpression(),
				};
			}
		});
	},
};

const BTICK_CODE = 96; // `
const TAGGED_TEMPLATE_EXPRESSION = 'TaggedTemplateExpression';
const TEMPLATE_LITERAL = 'TemplateLiteral';
const TEMPLATE_ELEMENT = 'TemplateElement';

export const jsepTemplateLiteral = {
	name: 'jsepTemplateLiteral',

	init(jsep) {
		function gobbleTemplateLiteral(env, gobbleMember = true) {
			if (this.code === BTICK_CODE) {
				const node = {
					type: TEMPLATE_LITERAL,
					quasis: [],
					expressions: [],
				};
				let cooked = '';
				let raw = '';
				let closed = false;
				const length = this.expr.length;
				const pushQuasi = () => node.quasis.push({
					type: TEMPLATE_ELEMENT,
					value: {
						raw,
						cooked,
					},
					tail: closed,
				});

				while (this.index < length) {
					let ch = this.expr.charAt(++this.index);

					if (ch === '`') {
						this.index += 1;
						closed = true;
						pushQuasi();

						env.node = node;

						if (gobbleMember) {
						  // allow . [] and () after template: `foo`.length
						  env.node = this.gobbleTokenProperty(env.node);
						}

						return env.node;
					}
					else if (ch === '$' && this.expr.charAt(this.index + 1) === '{') {
						this.index += 2;
						pushQuasi();
						raw = '';
						cooked = '';
						node.expressions.push(...this.gobbleExpressions(CCURLY_CODE));
						if (this.code !== CCURLY_CODE) {
							this.throwError('unclosed ${');
						}
					}
					else if (ch === '\\') {
						// Check for all of the common escape codes
						raw += ch;
						ch = this.expr.charAt(++this.index);
						raw += ch;

						switch (ch) {
							case 'n': cooked += '\n'; break;
							case 'r': cooked += '\r'; break;
							case 't': cooked += '\t'; break;
							case 'b': cooked += '\b'; break;
							case 'f': cooked += '\f'; break;
							case 'v': cooked += '\x0B'; break;
							default : cooked += ch;
						}
					}
					else {
						cooked += ch;
						raw += ch;
					}
				}
				this.throwError('Unclosed `');
			}
		}

		jsep.hooks.add('gobble-token', gobbleTemplateLiteral);

		jsep.hooks.add('after-token', function gobbleTaggedTemplateIdentifier(env) {
			if ((env.node.type === jsep.IDENTIFIER || env.node.type === jsep.MEMBER_EXP) && this.code === BTICK_CODE) {
				env.node = {
					type: TAGGED_TEMPLATE_EXPRESSION,
					tag: env.node,
					quasi: gobbleTemplateLiteral.bind(this)(env, false),
				};

				// allow . [] and () after tagged template: bar`foo`.length
				env.node = this.gobbleTokenProperty(env.node);

				return env.node;
			}
		});
	}
};

