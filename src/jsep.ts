
export interface JsepError extends Error {
	index: number;
	description: string;
}

// Define Expression types based on Jsep static constants
export type NodeType =
	| 'Compound'
	| 'SequenceExpression'
	| 'Identifier'
	| 'MemberExpression'
	| 'Literal'
	| 'ThisExpression'
	| 'CallExpression'
	| 'UnaryExpression'
	| 'BinaryExpression'
	| 'ArrayExpression'
	| 'ObjectExpression'
	| 'Property'
	| 'SpreadElement'
	| 'ArrowFunctionExpression'


export interface BaseExpression {
	type: NodeType;
	optional?: boolean;
}

export interface CompoundExpression extends BaseExpression {
	type: 'Compound';
	body: Expression[];
}

export interface SequenceExpression extends BaseExpression {
	type: 'SequenceExpression';
	expressions: Expression[];
}

export interface Identifier extends BaseExpression {
	type: 'Identifier';
	name: string;
}

export interface MemberExpression extends BaseExpression {
	type: 'MemberExpression';
	computed: boolean;
	object: Expression;
	property: Expression; // Identifier or Literal usually, but can be any Expression if computed
	optional?: boolean;
}

export interface Literal extends BaseExpression {
	type: 'Literal';
	value: string | number | boolean | null; // More specific than any
	raw: string;
}
export interface Property extends BaseExpression {
	type: 'Property';
	key: Expression;
	value: Expression;
	computed: boolean;
	optional?: boolean;
}

export interface ObjectExpression extends BaseExpression {
	type: 'ObjectExpression';
	properties: Property[];
}

export interface ThisExpression extends BaseExpression {
	type: 'ThisExpression';
}

export interface CallExpression extends BaseExpression {
	type: 'CallExpression';
	arguments: (Expression | null)[];
	callee: Expression;
	optional?: boolean;
}

export interface UnaryExpression extends BaseExpression {
	type: 'UnaryExpression';
	operator: string;
	argument: Expression;
	prefix: boolean;
}

export interface BinaryExpression extends BaseExpression {
	type: 'BinaryExpression';
	operator: string;
	left: Expression;
	right: Expression;
	parenthesis: boolean;
}

export interface ArrowFunctionExpression extends BaseExpression {
	type: 'ArrowFunctionExpression';
	params: (Identifier | MemberExpression)[];
	body: Expression;
}

export interface ArrayExpression extends BaseExpression {
	type: 'ArrayExpression';
	elements: (Expression | null)[];
}
export interface SpreadElement extends BaseExpression {
	type: 'SpreadElement';
	argument: Expression;
}

// Union type for all possible expressions
export type Expression =
	| CompoundExpression
	| SequenceExpression
	| Identifier
	| MemberExpression
	| Literal
	| ThisExpression
	| CallExpression
	| UnaryExpression
	| BinaryExpression
	| ArrayExpression
	| ObjectExpression
	| Property
	| ArrowFunctionExpression
	| SpreadElement

// Type for the hook environment
interface HookEnv {
	context: Jsep;
	node?: Expression | null; // Only allow Expression or null based on actual usage
}


// Type for binary operator info used in stack
interface BinaryOpInfo {
	value: string;
	prec: number;
	right_a: boolean; // right associative
}


export class Jsep {
	// Instance properties
	expr: string;
	index: number;

	// Static properties (defined below class)
	static version: string;
	static unary_ops: Record<string, 1>;
	static binary_ops: Record<string, number>;
	static right_associative: Set<string>;
	static additional_identifier_chars: Set<string>;
	static literals: Record<string, boolean | null>;
	static this_str: string;
	static max_unop_len: number;
	static max_binop_len: number;
	static hooks: Hooks;
	static plugins: Plugins;

	// Node Type constants (defined below class)
	static COMPOUND: 'Compound';
	static SEQUENCE_EXP: 'SequenceExpression';
	static IDENTIFIER: 'Identifier';
	static MEMBER_EXP: 'MemberExpression';
	static LITERAL: 'Literal';
	static THIS_EXP: 'ThisExpression';
	static CALL_EXP: 'CallExpression';
	static UNARY_EXP: 'UnaryExpression';
	static BINARY_EXP: 'BinaryExpression';
	static ARRAY_EXP: 'ArrayExpression';

	// Char Code constants (defined below class)
	static TAB_CODE: number;
	static LF_CODE: number;
	static CR_CODE: number;
	static SPACE_CODE: number;
	static PERIOD_CODE: number;
	static COMMA_CODE: number;
	static SQUOTE_CODE: number;
	static DQUOTE_CODE: number;
	static OPAREN_CODE: number;
	static CPAREN_CODE: number;
	static OBRACK_CODE: number;
	static CBRACK_CODE: number;
	static QUMARK_CODE: number;
	static SEMCOL_CODE: number;
	static COLON_CODE: number;


	static addUnaryOp(op_name: string): typeof Jsep {
		Jsep.max_unop_len = Math.max(op_name.length, Jsep.max_unop_len);
		Jsep.unary_ops[op_name] = 1;
		return Jsep;
	}
	static addBinaryOp(op_name: string, precedence: number, isRightAssociative: boolean = false): typeof Jsep {
		Jsep.max_binop_len = Math.max(op_name.length, Jsep.max_binop_len);
		Jsep.binary_ops[op_name] = precedence;
		if (isRightAssociative) {
			Jsep.right_associative.add(op_name);
		} else {
			Jsep.right_associative.delete(op_name);
		}
		return Jsep;
	}

	static addIdentifierChar(char: string): typeof Jsep {
		Jsep.additional_identifier_chars.add(char);
		return Jsep;
	}

	static addLiteral(literal_name: string, literal_value: any): typeof Jsep {
		Jsep.literals[literal_name] = literal_value;
		return Jsep;
	}

	static removeUnaryOp(op_name: string): typeof Jsep {
		delete Jsep.unary_ops[op_name];
		if (op_name.length === Jsep.max_unop_len) {
			Jsep.max_unop_len = Jsep.getMaxKeyLen(Jsep.unary_ops);
		}
		return Jsep;
	}

	static removeAllUnaryOps(): typeof Jsep {
		Jsep.unary_ops = {};
		Jsep.max_unop_len = 0;
		return Jsep;
	}

	static removeIdentifierChar(char: string): typeof Jsep {
		Jsep.additional_identifier_chars.delete(char);
		return Jsep;
	}

	static removeBinaryOp(op_name: string): typeof Jsep {
		delete Jsep.binary_ops[op_name];
		if (op_name.length === Jsep.max_binop_len) {
			Jsep.max_binop_len = Jsep.getMaxKeyLen(Jsep.binary_ops);
		}
		Jsep.right_associative.delete(op_name);
		return Jsep;
	}

	static removeAllBinaryOps(): typeof Jsep {
		Jsep.binary_ops = {};
		Jsep.max_binop_len = 0;
		return Jsep;
	}

	static removeLiteral(literal_name: string): typeof Jsep {
		delete Jsep.literals[literal_name];
		return Jsep;
	}

	static removeAllLiterals(): typeof Jsep {
		Jsep.literals = {};
		return Jsep;
	}

	get char(): string {
		return this.expr.charAt(this.index);
	}

	get code(): number {
		return this.expr.charCodeAt(this.index);
	}


	constructor(expr: string) {
		// Create new Jsep instance with expression string
		// `index` stores the character number we are currently at
		// All of the gobbles below will modify `index` as we move along
		this.expr = expr;
		this.index = 0;
	}


	// Static top-level parser
	static parse(expr: string): Expression {
		return (new Jsep(expr)).parse();
	}

	// Assuming this utility function exists
	static getMaxKeyLen(obj: Record<string, unknown>): number {
		return Math.max(0, ...Object.keys(obj).map(k => k.length));

	}

	// Check if character code is a decimal digit (0-9)
	static isDecimalDigit(ch: number): boolean {
		return (ch >= 48 && ch <= 57); // 0...9
	}
	static binaryPrecedence(op_val: string): number {
		return Jsep.binary_ops[op_val] || 0;
	}

	static isIdentifierStart(ch: number): boolean {
		return (ch >= 65 && ch <= 90) || // A-Z
			(ch >= 97 && ch <= 122) || // a-z
			(ch >= 128 && !Jsep.binary_ops[String.fromCharCode(ch)]) || // non-ASCII not an op
			(Jsep.additional_identifier_chars.has(String.fromCharCode(ch)));
	}

	static isIdentifierPart(ch: number): boolean {
		return Jsep.isIdentifierStart(ch) || Jsep.isDecimalDigit(ch);
	}


	throwError(message: string): never {
		const error = new Error(`${message} at character ${this.index}`) as JsepError;
		error.index = this.index;
		error.description = message;
		throw error;
	}

	/**
	 * Run a given hook
	 */
	runHook(name: string, node?: Expression): Expression {
		if (Jsep.hooks[name]) {
			const env = { context: this, node: node || false };
			Jsep.hooks.run(name, env);
			return env.node as Expression;
		}
		return node;
	}

	/**
	 * Runs a given hook until one returns a node
	 */
	searchHook(name: string): Expression {
		if (Jsep.hooks[name]) {
			const env = { context: this, node: undefined };
			Jsep.hooks[name].find(function (callback) {
				callback.call(env.context, env);
				return env.node;
			});
			return env.node;
		}
	}

	gobbleSpaces(): void {
		let ch = this.code;
		while (
			ch === Jsep.SPACE_CODE ||
			ch === Jsep.TAB_CODE ||
			ch === Jsep.LF_CODE ||
			ch === Jsep.CR_CODE
		) {
			ch = this.expr.charCodeAt(++this.index);
		}
		this.runHook('gobble-spaces');
	}

	parse(): Expression {
		this.runHook('before-all');
		const nodes = this.gobbleExpressions();

		const node: Expression = nodes.length === 1
			? nodes[0]
			: {
				type: Jsep.COMPOUND,
				body: nodes
			};

		// @ts-ignore - dynamic hook behavior
		return this.runHook('after-all', node) as Expression;
	}
	/*	 * top-level parser (but can be reused within as well)*/

	/**
	 * top-level parser (but can be reused within as well)
	 */
	gobbleExpressions(untilICode?: number): Expression[] {
		let nodes = [], ch_i, node;

		while (this.index < this.expr.length) {
			ch_i = this.code;

			if (ch_i === Jsep.SEMCOL_CODE || ch_i === Jsep.COMMA_CODE) {
				this.index++; // ignore separators
			}
			else {
				// Try to gobble each expression individually
				if (node = this.gobbleExpression()) {
					nodes.push(node);
					// If we weren't able to find a binary expression and are out of room, then
					// the expression passed in probably has too much
				}
				else if (this.index < this.expr.length) {
					if (ch_i === untilICode) {
						break;
					}
					this.throwError('Unexpected "' + this.char + '"');
				}
			}
		}

		return nodes;
	}
	/** 	 * The main parsing function. */
	gobbleExpression(): Expression {
		const node = this.searchHook('gobble-expression') || this.gobbleBinaryExpression();
		this.gobbleSpaces();
		return this.runHook('after-expression', node);
	}


	/**
	 * Search for the operation portion of the string (e.g. `+`, `===`)
	 * Start by taking the longest possible binary operations (3 characters: `===`, `!==`, `>>>`)
	 * and move down from 3 to 2 to 1 character until a matching binary operation is found
	 * then, return that binary operation
	 */
	gobbleBinaryOp(): string | boolean {
		this.gobbleSpaces();
		let to_check = this.expr.substr(this.index, Jsep.max_binop_len);
		let tc_len = to_check.length;

		while (tc_len > 0) {
			// Don't accept a binary op when it is an identifier.
			// Binary ops that start with a identifier-valid character must be followed
			// by a non identifier-part valid character
			if (Jsep.binary_ops.hasOwnProperty(to_check) && (
				!Jsep.isIdentifierStart(this.code) ||
				(this.index + to_check.length < this.expr.length && !Jsep.isIdentifierPart(this.expr.charCodeAt(this.index + to_check.length)))
			)) {
				this.index += tc_len;
				return to_check;
			}
			to_check = to_check.substr(0, --tc_len);
		}
		return false;
	}
	/**
	 * This function is responsible for gobbling an individual expression,
	 * e.g. `1`, `1+2`, `a+(b*2)-Math.sqrt(2)`
	 */
	gobbleBinaryExpression(): BinaryExpression {
		let node, biop, prec, stack, biop_info, left, right, i, cur_biop;

		// First, try to get the leftmost thing
		// Then, check to see if there's a binary operator operating on that leftmost thing
		// Don't gobbleBinaryOp without a left-hand-side
		left = this.gobbleToken();
		if (!left) {
			return left;
		}
		biop = this.gobbleBinaryOp();

		// If there wasn't a binary operator, just return the leftmost node
		if (!biop) {
			return left;
		}

		// Otherwise, we need to start a stack to properly place the binary operations in their
		// precedence structure
		biop_info = { value: biop, prec: Jsep.binaryPrecedence(biop), right_a: Jsep.right_associative.has(biop) };

		right = this.gobbleToken();

		if (!right) {
			this.throwError("Expected expression after " + biop);
		}

		stack = [left, biop_info, right];

		// Properly deal with precedence using [recursive descent](http://www.engr.mun.ca/~theo/Misc/exp_parsing.htm)
		while ((biop = this.gobbleBinaryOp())) {
			prec = Jsep.binaryPrecedence(biop);

			if (prec === 0) {
				this.index -= biop.length;
				break;
			}

			biop_info = { value: biop, prec, right_a: Jsep.right_associative.has(biop) };

			cur_biop = biop;

			// Reduce: make a binary expression from the three topmost entries.
			const comparePrev = prev => biop_info.right_a && prev.right_a
				? prec > prev.prec
				: prec <= prev.prec;
			while ((stack.length > 2) && comparePrev(stack[stack.length - 2])) {
				right = stack.pop();
				biop = stack.pop().value;
				left = stack.pop();
				node = {
					type: Jsep.BINARY_EXP,
					operator: biop,
					left,
					right,
					parenthesis: false
				};
				stack.push(node);
			}

			node = this.gobbleToken();

			if (!node) {
				this.throwError("Expected expression after " + cur_biop);
			}

			stack.push(biop_info, node);
		}

		i = stack.length - 1;
		node = stack[i];

		while (i > 1) {
			node = {
				type: Jsep.BINARY_EXP,
				operator: stack[i - 1].value,
				left: stack[i - 2],
				right: node,
				parenthesis: false
			};
			i -= 2;
		}

		return node;
	}
	/**
	 * An individual part of a binary expression:
	 * e.g. `foo.bar(baz)`, `1`, `"abc"`, `(a % 2)` (because it's in parenthesis)
	 */
	gobbleToken(): Expression {
		let ch, to_check, tc_len, node;

		this.gobbleSpaces();
		node = this.searchHook('gobble-token');
		if (node) {
			return this.runHook('after-token', node);
		}

		ch = this.code;

		if (Jsep.isDecimalDigit(ch) || ch === Jsep.PERIOD_CODE) {
			// Char code 46 is a dot `.` which can start off a numeric literal
			return this.gobbleNumericLiteral();
		}

		if (ch === Jsep.SQUOTE_CODE || ch === Jsep.DQUOTE_CODE) {
			// Single or double quotes
			node = this.gobbleStringLiteral();
		}
		else if (ch === Jsep.OBRACK_CODE) {
			node = this.gobbleArray();
		}
		else {
			to_check = this.expr.substr(this.index, Jsep.max_unop_len);
			tc_len = to_check.length;

			while (tc_len > 0) {
				// Don't accept an unary op when it is an identifier.
				// Unary ops that start with a identifier-valid character must be followed
				// by a non identifier-part valid character
				if (Jsep.unary_ops.hasOwnProperty(to_check) && (
					!Jsep.isIdentifierStart(this.code) ||
					(this.index + to_check.length < this.expr.length && !Jsep.isIdentifierPart(this.expr.charCodeAt(this.index + to_check.length)))
				)) {
					this.index += tc_len;
					const argument = this.gobbleToken();
					if (!argument) {
						this.throwError('missing unaryOp argument');
					}
					return this.runHook('after-token', {
						type: Jsep.UNARY_EXP,
						operator: to_check,
						argument,
						prefix: true
					});
				}

				to_check = to_check.substr(0, --tc_len);
			}

			if (Jsep.isIdentifierStart(ch)) {
				node = this.gobbleIdentifier();
				if (Jsep.literals.hasOwnProperty(node.name)) {
					node = {
						type: Jsep.LITERAL,
						value: Jsep.literals[node.name],
						raw: node.name,
					};
				}
				else if (node.name === Jsep.this_str) {
					node = { type: Jsep.THIS_EXP };
				}
			}
			else if (ch === Jsep.OPAREN_CODE) { // open parenthesis
				node = this.gobbleGroup();
			}
		}

		if (!node) {
			return this.runHook('after-token');
		}

		node = this.gobbleTokenProperty(node);
		return this.runHook('after-token', node);
	}
	/**
	 * An individual part of a binary expression:
	 * e.g. `foo.bar(baz)`, `1`, `"abc"`, `(a % 2)` (because it's in parenthesis)
	 */
	gobbleTokenProperty(node: Expression): Expression {
		this.gobbleSpaces();

		let ch = this.code;
		while (ch === Jsep.PERIOD_CODE || ch === Jsep.OBRACK_CODE || ch === Jsep.OPAREN_CODE || ch === Jsep.QUMARK_CODE) {
			let optional;
			if (ch === Jsep.QUMARK_CODE) {
				if (this.expr.charCodeAt(this.index + 1) !== Jsep.PERIOD_CODE) {
					break;
				}
				optional = true;
				this.index += 2;
				this.gobbleSpaces();
				ch = this.code;
			}
			this.index++;

			if (ch === Jsep.OBRACK_CODE) {
				node = {
					type: Jsep.MEMBER_EXP,
					computed: true,
					object: node,
					property: this.gobbleExpression()
				};
				if (!node.property) {
					this.throwError('Unexpected "' + this.char + '"');
				}
				this.gobbleSpaces();
				ch = this.code;
				if (ch !== Jsep.CBRACK_CODE) {
					this.throwError('Unclosed [');
				}
				this.index++;
			}
			else if (ch === Jsep.OPAREN_CODE) {
				// A function call is being made; gobble all the arguments
				node = {
					type: Jsep.CALL_EXP,
					'arguments': this.gobbleArguments(Jsep.CPAREN_CODE),
					callee: node
				};
			}
			else if (ch === Jsep.PERIOD_CODE || optional) {
				if (optional) {
					this.index--;
				}
				this.gobbleSpaces();
				node = {
					type: Jsep.MEMBER_EXP,
					computed: false,
					object: node,
					property: this.gobbleIdentifier(),
				};
			}

			if (optional) {
				node.optional = true;
			} // else leave undefined for compatibility with esprima

			this.gobbleSpaces();
			ch = this.code;
		}

		return node;
	}

	/**
	 * Parse simple numeric literals: `12`, `3.4`, `.5`. Do this by using a string to
	 * keep track of everything in the numeric literal and then calling `parseFloat` on that string
	 */
	gobbleNumericLiteral(): Literal {
		let number = '', ch, chCode;

		while (Jsep.isDecimalDigit(this.code)) {
			number += this.expr.charAt(this.index++);
		}

		if (this.code === Jsep.PERIOD_CODE) { // can start with a decimal marker
			number += this.expr.charAt(this.index++);

			while (Jsep.isDecimalDigit(this.code)) {
				number += this.expr.charAt(this.index++);
			}
		}

		ch = this.char;

		if (ch === 'e' || ch === 'E') { // exponent marker
			number += this.expr.charAt(this.index++);
			ch = this.char;

			if (ch === '+' || ch === '-') { // exponent sign
				number += this.expr.charAt(this.index++);
			}

			while (Jsep.isDecimalDigit(this.code)) { // exponent itself
				number += this.expr.charAt(this.index++);
			}

			if (!Jsep.isDecimalDigit(this.expr.charCodeAt(this.index - 1))) {
				this.throwError('Expected exponent (' + number + this.char + ')');
			}
		}

		chCode = this.code;

		// Check to make sure this isn't a variable name that start with a number (123abc)
		if (Jsep.isIdentifierStart(chCode)) {
			this.throwError('Variable names cannot start with a number (' +
				number + this.char + ')');
		}
		else if (chCode === Jsep.PERIOD_CODE || (number.length === 1 && number.charCodeAt(0) === Jsep.PERIOD_CODE)) {
			this.throwError('Unexpected period');
		}

		return {
			type: Jsep.LITERAL,
			value: parseFloat(number),
			raw: number
		};
	}

	NEWLINE = String.fromCharCode(10)
	/**
	 * Parses a string literal, staring with single or double quotes with basic support for escape codes
	 * e.g. `"hello world"`, `'this is\nJSEP'`
	 */
	gobbleStringLiteral(): Literal {
		let str = '';
		const startIndex = this.index;
		const quote = this.expr.charAt(this.index++);
		let closed = false;

		while (this.index < this.expr.length) {
			let ch = this.expr.charAt(this.index++);

			if (ch === quote) {
				closed = true;
				break;
			}
			else if (ch === String.fromCharCode()) {
				// Check for all of the common escape codes
				ch = this.expr.charAt(this.index++);
				switch (ch) {
					case 'n': str += String.fromCharCode(10); break;
					case 'r': str += String.fromCharCode(13); break;
					case 't': str += String.fromCharCode(9); break;
					case 'b': str += String.fromCharCode(8); break;
					case 'f': str += String.fromCharCode(12); break;
					case 'v': str += String.fromCharCode(11); break;
					default: str += ch;
				}
			}
			else {
				str += ch;
			}
		}

		if (!closed) {
			this.throwError('Unclosed quote after "' + str + '"');
		}

		return {
			type: Jsep.LITERAL,
			value: str,
			raw: this.expr.substring(startIndex, this.index),
		};
	}

	/**
	 * Gobbles only identifiers
	 * e.g.: `foo`, `_value`, `$x1`
	 * Also, this function checks if that identifier is a literal:
	 * (e.g. `true`, `false`, `null`) or `this`
	 */
	gobbleIdentifier(): Identifier {
		let ch = this.code, start = this.index;

		if (Jsep.isIdentifierStart(ch)) {
			this.index++;
		}
		else {
			this.throwError('Unexpected ' + this.char);
		}

		while (this.index < this.expr.length) {
			ch = this.code;

			if (Jsep.isIdentifierPart(ch)) {
				this.index++;
			}
			else {
				break;
			}
		}
		return {
			type: Jsep.IDENTIFIER,
			name: this.expr.slice(start, this.index),
		};
	}

	/**
	 * Gobbles a list of arguments within the context of a function call
	 * or array literal. This function also assumes that the opening character
	 * `(` or `[` has already been gobbled, and gobbles expressions and commas
	 * until the terminator character `)` or `]` is encountered.
	 * e.g. `foo(bar, baz)`, `my_func()`, or `[bar, baz]`}
	 */
	gobbleArguments(termination: number): Expression[] {
		const args = [];
		let closed = false;
		let separator_count = 0;

		while (this.index < this.expr.length) {
			this.gobbleSpaces();
			let ch_i = this.code;

			if (ch_i === termination) { // done parsing
				closed = true;
				this.index++;

				if (termination === Jsep.CPAREN_CODE && separator_count && separator_count >= args.length) {
					this.throwError('Unexpected token ' + String.fromCharCode(termination));
				}

				break;
			}
			else if (ch_i === Jsep.COMMA_CODE) { // between expressions
				this.index++;
				separator_count++;

				if (separator_count !== args.length) { // missing argument
					if (termination === Jsep.CPAREN_CODE) {
						this.throwError('Unexpected token ,');
					}
					else if (termination === Jsep.CBRACK_CODE) {
						for (let arg = args.length; arg < separator_count; arg++) {
							args.push(null);
						}
					}
				}
			}
			else if (args.length !== separator_count && separator_count !== 0) {
				// NOTE: `&& separator_count !== 0` allows for either all commas, or all spaces as arguments
				this.throwError('Expected comma');
			}
			else {
				const node = this.gobbleExpression();

				if (!node || node.type === Jsep.COMPOUND) {
					this.throwError('Expected comma');
				}

				args.push(node);
			}
		}

		if (!closed) {
			this.throwError('Expected ' + String.fromCharCode(termination));
		}

		return args;
	}

	/**
	 * Responsible for parsing a group of things within parentheses `()`
	 * that have no identifier in front (so not a function call)
	 * This function assumes that it needs to gobble the opening parenthesis
	 * and then tries to gobble everything within that parenthesis, assuming
	 * that the next thing it should see is the close parenthesis. If not,
	 * then the expression probably doesn't have a `)`
	 */
	gobbleGroup(): Expression {
		this.index++;
		let nodes = this.gobbleExpressions(Jsep.CPAREN_CODE);
		if (this.code === Jsep.CPAREN_CODE) {
			this.index++;
			if (nodes.length === 1) {
				const node = nodes[0];
				if (node.type === Jsep.BINARY_EXP) {
					node.parenthesis = true;
				}
				return node;
			}
			else if (!nodes.length) {
				this.throwError('Empty group expression');
			}
			else {
				return {
					type: Jsep.SEQUENCE_EXP,
					expressions: nodes,
				};
			}
		} else {
			this.throwError('Unclosed (');
		}
	}

	/**
	 * Responsible for parsing Array literals `[1, 2, 3]`
	 * This function assumes that it needs to gobble the opening bracket
	 * and then tries to gobble the expressions as arguments.
	 */
	gobbleArray(): ArrayExpression {
		this.index++;

		return {
			type: Jsep.ARRAY_EXP,
			elements: this.gobbleArguments(Jsep.CBRACK_CODE)
		};
	}
}

class Hooks {

	add(name: string, callback: Function, first?: boolean) {
		if (typeof arguments[0] != 'string') {
			// Multiple hook callbacks, keyed by name
			for (let name in arguments[0]) {
				this.add(name, arguments[0][name], arguments[1]);
			}
		}
		else {
			(Array.isArray(name) ? name : [name]).forEach(function (name) {
				this[name] = this[name] || [];

				if (callback) {
					this[name][first ? 'unshift' : 'push'](callback);
				}
			}, this);
		}
	}

	run(name: string, env: any) {
		this[name] = this[name] || [];
		this[name].forEach(function (callback: Function) {
			callback.call(env && env.context ? env.context : env, env);
		});
	}
}

class Plugins {
	constructor(jsep) {
		this.jsep = jsep;
		this.registered = {};
	}
	jsep: Jsep;
	registered: Record<string, any>;

	register(...plugins: any[]) {
		plugins.forEach((plugin) => {
			if (typeof plugin !== 'object' || !plugin.name || !plugin.init) {
				throw new Error('Invalid JSEP plugin format');
			}
			if (this.registered[plugin.name]) {
				// already registered. Ignore.
				return;
			}
			plugin.init(this.jsep);
			this.registered[plugin.name] = plugin;
		});
	}
}


// Static fields:
const hooks = new Hooks();
Object.assign(Jsep, {
	hooks,
	plugins: new Plugins(Jsep),

	// Node Types
	// ----------
	// This is the full set of types that any JSEP node can be.
	// Store them here to save space when minified
	COMPOUND: 'Compound',
	SEQUENCE_EXP: 'SequenceExpression',
	IDENTIFIER: 'Identifier',
	MEMBER_EXP: 'MemberExpression',
	LITERAL: 'Literal',
	THIS_EXP: 'ThisExpression',
	CALL_EXP: 'CallExpression',
	UNARY_EXP: 'UnaryExpression',
	BINARY_EXP: 'BinaryExpression',
	ARRAY_EXP: 'ArrayExpression',

	TAB_CODE: 9,
	LF_CODE: 10,
	CR_CODE: 13,
	SPACE_CODE: 32,
	PERIOD_CODE: 46, // '.'
	COMMA_CODE: 44, // ','
	SQUOTE_CODE: 39, // single quote
	DQUOTE_CODE: 34, // double quotes
	OPAREN_CODE: 40, // (
	CPAREN_CODE: 41, // )
	OBRACK_CODE: 91, // [
	CBRACK_CODE: 93, // ]
	QUMARK_CODE: 63, // ?
	SEMCOL_CODE: 59, // ;
	COLON_CODE: 58, // :


	// Operations
	// ----------
	// Use a quickly-accessible map to store all of the unary operators
	// Values are set to `1` (it really doesn't matter)
	unary_ops: {
		'-': 1,
		'!': 1,
		'~': 1,
		'+': 1
	},

	// Also use a map for the binary operations but set their values to their
	// binary precedence for quick reference (higher number = higher precedence)
	// see [Order of operations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
	binary_ops: {
		'||': 1, '??': 1,
		'&&': 2, '|': 3, '^': 4, '&': 5,
		'==': 6, '!=': 6, '===': 6, '!==': 6,
		'<': 7, '>': 7, '<=': 7, '>=': 7,
		'<<': 8, '>>': 8, '>>>': 8,
		'+': 9, '-': 9,
		'*': 10, '/': 10, '%': 10,
		'**': 11,
	},

	// sets specific binary_ops as right-associative
	right_associative: new Set(['**']),

	// Additional valid identifier chars, apart from a-z, A-Z and 0-9 (except on the starting char)
	additional_identifier_chars: new Set(['$', '_']),

	// Literals
	// ----------
	// Store the values to return for the various literals we may encounter
	literals: {
		'true': true,
		'false': false,
		'null': null
	},

	// Except for `this`, which is special. This could be changed to something like `'self'` as well
	this_str: 'this',
});
Jsep.max_unop_len = Jsep.getMaxKeyLen(Jsep.unary_ops);
Jsep.max_binop_len = Jsep.getMaxKeyLen(Jsep.binary_ops);


const ARROW_EXP = 'ArrowFunctionExpression';

interface JSEPPlugin {
	name: string;
	init(jsxp: typeof Jsep): void;
}

export const arrow: JSEPPlugin = {
	name: 'arrow',

	init(jsxp) {
		// arrow-function expressions: () => x, v => v, (a, b) => v
		jsxp.addBinaryOp('=>', 0.1, true);

		// this hook searches for the special case () => ...
		// which would normally throw an error because of the invalid LHS to the bin op
		jsxp.hooks.add('gobble-expression', function gobbleEmptyArrowArg(env: { node: ArrowFunctionExpression }) {
			this.gobbleSpaces();
			if (this.code === jsxp.OPAREN_CODE) {
				const backupIndex = this.index;
				this.index++;

				this.gobbleSpaces();
				if (this.code === jsxp.CPAREN_CODE) {
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
						} as ArrowFunctionExpression;
						return;
					}
				}
				this.index = backupIndex;
			}
		});

		jsxp.hooks.add('after-expression', function fixBinaryArrow(env) {
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
					if (node.params && node.params[0].type === jsxp.SEQUENCE_EXP) {
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
const OBJECT_EXP = 'ObjectExpression';
const PROPERTY = 'Property';

export const object: JSEPPlugin = {
	name: 'object',

	init(jsxp) {
		// Object literal support
		function gobbleObjectExpression(env: { node: ObjectExpression }) {
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
					if (key.type === jsxp.IDENTIFIER && (this.code === jsxp.COMMA_CODE || this.code === CCURLY_CODE)) {
						// property value shorthand
						properties.push({
							type: PROPERTY,
							computed: false,
							key,
							value: key,
							shorthand: true,
						});
					}
					else if (this.code === jsxp.COLON_CODE) {
						this.index++;
						const value = this.gobbleExpression();

						if (!value) {
							this.throwError('unexpected object property');
						}
						const computed = key.type === jsxp.ARRAY_EXP;
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

					if (this.code === jsxp.COMMA_CODE) {
						this.index++;
					}
				}
				this.throwError('missing }');
			}
		}

		jsxp.hooks.add('gobble-token', gobbleObjectExpression);
	}
};

const FSLASH_CODE = 47; // '/'
const BSLASH_CODE = 92; // '\\'

export const regex: JSEPPlugin = {
	name: 'regex',

	init(jsxp) {
		// Regex literal: /abc123/ig
		jsxp.hooks.add('gobble-token', function gobbleRegexLiteral(env) {
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
							type: jsxp.LITERAL,
							value,
							raw: this.expr.slice(patternIndex - 1, this.index),
						};

						// allow . [] and () after regex: /regex/.test(a)
						env.node = this.gobbleTokenProperty(env.node);
						return env.node;
					}
					if (this.code === jsxp.OBRACK_CODE) {
						inCharSet = true;
					}
					else if (inCharSet && this.code === jsxp.CBRACK_CODE) {
						inCharSet = false;
					}
					this.index += this.code === BSLASH_CODE ? 2 : 1;
				}
				this.throwError('Unclosed Regex');
			}
		});
	},
};

export const jsepSpread: JSEPPlugin = {
	name: 'jsepSpread',

	init(jsxp) {
		// Spread operator: ...a
		// Works in objects { ...a }, arrays [...a], function args fn(...a)
		// NOTE: does not prevent `a ? ...b : ...c` or `...123`
		jsxp.hooks.add('gobble-token', function gobbleSpread(env: { node: SpreadElement }) {
			if ([0, 1, 2].every(i => this.expr.charCodeAt(this.index + i) === jsxp.PERIOD_CODE)) {
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

export const jsepTemplateLiteral: JSEPPlugin = {
	name: 'jsepTemplateLiteral',

	init(jsxp) {
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
					else if (ch === String.fromCharCode(47)) {
						// Check for all of the common escape codes
						raw += ch;
						ch = this.expr.charAt(++this.index);
						raw += ch;

						switch (ch) {
							case 'n': cooked += String.fromCharCode(10); break;
							case 'r': cooked += String.fromCharCode(13); break;
							case 't': cooked += String.fromCharCode(9); break;
							case 'b': cooked += String.fromCharCode(8); break;
							case 'f': cooked += String.fromCharCode(12); break;
							case 'v': cooked += String.fromCharCode(11); break;
							default: cooked += ch;
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

		jsxp.hooks.add('gobble-token', gobbleTemplateLiteral);

		jsxp.hooks.add('after-token', function gobbleTaggedTemplateIdentifier(env) {
			if ((env.node.type === jsxp.IDENTIFIER || env.node.type === jsxp.MEMBER_EXP) && this.code === BTICK_CODE) {
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
Jsep.plugins.register(arrow, object, regex, jsepSpread, jsepTemplateLiteral);
// Backward Compatibility:
const jsep = expr => (new Jsep(expr)).parse() as Expression;
const stdClassProps = Object.getOwnPropertyNames(class Test { });
Object.getOwnPropertyNames(Jsep)
	.filter(prop => !stdClassProps.includes(prop) && jsep[prop] === undefined)
	.forEach((m) => {
		jsep[m] = Jsep[m];
	});
jsep.Jsep = Jsep; // allows for const { Jsep } = require('jsep');
export default jsep;
