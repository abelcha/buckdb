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
	| 'TaggedTemplateExpression'
	| 'TemplateLiteral'
	| 'TemplateElement'
	| 'ConditionalExpression'


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
	value: string | number | boolean | null | RegExp; // Allow RegExp
	valueType: 'string' | 'number' | 'boolean' | 'null' | 'RegExp'; // Type of the value
	raw: string;
}
export interface Property extends BaseExpression {
	type: 'Property';
	key: Expression;
	value: Expression;
	computed: boolean;
	optional?: boolean;
	shorthand?: boolean; // Add missing optional property
}

export interface ObjectExpression extends BaseExpression {
	type: 'ObjectExpression';
	properties: (Property | Expression)[]; // Allow SpreadElement etc.
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
	params: (Identifier | MemberExpression)[] | null; // Allow null for () => ...
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

// Add Template Element interface
export interface TemplateElement extends BaseExpression {
	type: 'TemplateElement';
	value: {
		raw: string;
		cooked: string | null; // Cooked can be null if invalid escape sequence
	};
	tail: boolean;
}

// Add Template Literal interface
export interface TemplateLiteral extends BaseExpression {
	type: 'TemplateLiteral';
	quasis: TemplateElement[];
	expressions: Expression[];
}

// Add Tagged Template Expression interface
export interface TaggedTemplateExpression extends BaseExpression {
	type: 'TaggedTemplateExpression';
	tag: Expression;
	quasi: TemplateLiteral;
}

export interface ConditionalExpression extends BaseExpression {
	type: 'ConditionalExpression';
	tag: Expression;
	quasi: TemplateLiteral;
	test: BinaryExpression | UnaryExpression | Expression
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
	| TaggedTemplateExpression // Add Template Literal types to main union
	| TemplateLiteral
	| TemplateElement
	| ConditionalExpression

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

// Type for hook callbacks
type HookCallback = (this: Jsep, env: HookEnv) => void;

class Hooks {
	// Index signature to allow string indexing for hook names
	[key: string]: HookCallback[] | undefined | ((name: string | string[] | Record<string, HookCallback>, callback?: HookCallback, first?: boolean) => void) | ((name: string, env: HookEnv) => void);

	add(name: string | string[] | Record<string, HookCallback>, callback?: HookCallback, first?: boolean): void {
		if (typeof name === 'object' && !Array.isArray(name)) {
			// Multiple hook callbacks, keyed by name
			const hookMap = name; // Rename for clarity
			const isFirstArg = callback; // The second arg is 'first' in this overload
			for (const hookName in hookMap) {
				// Pass the actual callback from the map and the correct 'first' value
				this.add(hookName, hookMap[hookName], isFirstArg);
			}
		} else {
			const names = Array.isArray(name) ? name : [name];
			names.forEach((n) => {
				const currentHooks = this[n] || [];
				if (callback && Array.isArray(currentHooks)) { // Type guard for array push
					currentHooks[first ? 'unshift' : 'push'](callback);
					this[n] = currentHooks; // Reassign if necessary (though push modifies in place)
				} else if (!this[n]) {
					this[n] = callback ? [callback] : [];
				}
			});
		}
	}


	run(name: string, env: HookEnv): void { // Use specific HookEnv type
		const callbacks = this[name];
		if (Array.isArray(callbacks)) {
			callbacks.forEach((callback: HookCallback) => { // Use specific HookCallback type
				callback.call(env.context, env); // Ensure context is Jsep instance
			});
		}
	}
}

interface JSEPPlugin {
	name: string;
	init(jsxp: typeof Jsep): void;
}

class Plugins {
	jsep: typeof Jsep; // Use typeof Jsep
	registered: Record<string, JSEPPlugin>; // Use specific JSEPPlugin type

	constructor(jsep: typeof Jsep) { // Use typeof Jsep
		this.jsep = jsep;
		this.registered = {};
	}


	register(...plugins: JSEPPlugin[]) { // Use specific JSEPPlugin type
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
	static literals: Record<string, boolean | null | number | string | RegExp>; // Allow RegExp
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
	// Added template types to NodeType union
	static TAGGED_TEMPLATE_EXPRESSION: 'TaggedTemplateExpression';
	static TEMPLATE_LITERAL: 'TemplateLiteral';
	static TEMPLATE_ELEMENT: 'TemplateElement';


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
	static BTICK_CODE: number; // `
	static OCURLY_CODE: number; // {
	static CCURLY_CODE: number; // }
	static FSLASH_CODE: number; // /
	static BSLASH_CODE: number; // \


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

	static addLiteral(literal_name: string, literal_value: boolean | null | number | string | RegExp): typeof Jsep { // Use specific types
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
	runHook(name: string, node?: Expression | null): Expression | null { // Allow null return
		const callbacks = Jsep.hooks[name];
		if (Array.isArray(callbacks)) { // Check hook exists and is array
			const env: HookEnv = { context: this, node: node || null }; // Use HookEnv type
			Jsep.hooks.run(name, env);
			// Ensure undefined is not returned, only Expression or null
			return env.node === undefined ? null : env.node;
		}
		return node || null; // Return original node or null
	}

	/**
	 * Runs a given hook until one returns a node
	 */
	searchHook(name: string): Expression | undefined { // Allow undefined return
		const callbacks = Jsep.hooks[name];
		if (Array.isArray(callbacks)) { // Check if callbacks is an array
			const env: HookEnv = { context: this, node: undefined };
			// Use Array.prototype.some for efficiency
			callbacks.some((callback: HookCallback) => {
				callback.call(env.context, env);
				return !!env.node; // Stop searching once node is found
			});
			// Ensure node is Expression or undefined, not null
			return env.node ? env.node : undefined;
		}
		return undefined; // Return undefined if hook doesn't exist or callbacks is not an array
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

		// Handle case where gobbleExpressions returns empty array (e.g., empty input)
		if (nodes.length === 0) {
			this.throwError('Empty expression');
		}

		const node: Expression = nodes.length === 1
			? nodes[0]
			: {
				type: Jsep.COMPOUND,
				body: nodes
			};

		// Ensure node is not null before passing to runHook
		const finalNode = node ? this.runHook('after-all', node) : null;
		if (!finalNode) {
			// This should ideally not happen if the input expression was valid
			// and hooks didn't clear the node, but handle it defensively.
			this.throwError('Parser finished with no expression node.');
		}
		// After the check, finalNode is guaranteed to be Expression.
		return finalNode;
	}
	/*	 * top-level parser (but can be reused within as well)*/

	/**
	 * top-level parser (but can be reused within as well)
	 */
	gobbleExpressions(untilICode?: number): Expression[] {
		const nodes: Expression[] = []; // Ensure nodes array type
		let ch_i: number;
		let node: Expression | null;

		while (this.index < this.expr.length) {
			ch_i = this.code;

			if (ch_i === Jsep.SEMCOL_CODE || ch_i === Jsep.COMMA_CODE) {
				this.index++; // ignore separators
			}
			else {
				// Try to gobble each expression individually
				node = this.gobbleExpression(); // Can return null
				if (node) { // Check if node is not null
					nodes.push(node);
					// If we weren't able to find a binary expression and are out of room, then
					// the expression passed in probably has too much
				}
				else if (this.index < this.expr.length) {
					if (ch_i === untilICode) {
						break;
					}
					this.throwError('Unexpected "' + this.char + '"');
				} else {
					// End of expression string reached after trying to gobble an expression
					break;
				}
			}
		}

		return nodes;
	}
	/** 	 * The main parsing function. */
	gobbleExpression(): Expression | null { // Allow null return
		let node = this.searchHook('gobble-expression') || this.gobbleBinaryExpression();
		this.gobbleSpaces();
		// runHook can return null, so the final return type must accommodate that
		node = this.runHook('after-expression', node);
		// runHook now correctly returns Expression | null
		return node;
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
	// Can return any Expression type if no binary op is found
	gobbleBinaryExpression(): Expression | null {
		let node: Expression | undefined | null; // Allow undefined during processing
		let biop: string | boolean;
		let prec: number;
		let stack: (Expression | BinaryOpInfo)[] = []; // Initialize stack type
		let biop_info: BinaryOpInfo;
		let left: Expression | null;
		let right: Expression | null;
		let i: number;
		let cur_biop: string | boolean;


		// First, try to get the leftmost thing
		// Then, check to see if there's a binary operator operating on that leftmost thing
		// Don't gobbleBinaryOp without a left-hand-side
		left = this.gobbleToken(); // gobbleToken can return null
		if (!left) {
			return null; // Return null if no left side
		}
		biop = this.gobbleBinaryOp(); // biop can be string or false

		// If there wasn't a binary operator (biop is false), just return the leftmost node
		if (biop === false) {
			return left;
		}

		// Otherwise, we need to start a stack to properly place the binary operations in their precedence structure
		// Type guard to ensure biop is a string here
		if (typeof biop !== 'string') {
			// This should theoretically not happen based on the check above, but satisfies TS
			this.throwError('Internal error: Invalid binary operator state.');
		}
		biop_info = { value: biop, prec: Jsep.binaryPrecedence(biop), right_a: Jsep.right_associative.has(biop) };

		right = this.gobbleToken(); // Can return null

		if (!right) {
			this.throwError("Expected expression after " + biop);
		}

		stack = [left, biop_info, right]; // left and right are Expression | null

		// Properly deal with precedence using [recursive descent](http://www.engr.mun.ca/~theo/Misc/exp_parsing.htm)
		while ((cur_biop = this.gobbleBinaryOp())) { // Assign to cur_biop, check truthiness
			// Type guard: cur_biop must be string here
			if (typeof cur_biop !== 'string') break;

			prec = Jsep.binaryPrecedence(cur_biop);

			if (prec === 0) {
				this.index -= cur_biop.length; // Use cur_biop length
				break;
			}

			biop_info = { value: cur_biop, prec, right_a: Jsep.right_associative.has(cur_biop) };

			// Reduce: make a binary expression from the three topmost entries.
			const comparePrev = (prev: BinaryOpInfo) => biop_info.right_a && prev.right_a
				? prec > prev.prec
				: prec <= prev.prec;

			while (stack.length > 2 && comparePrev(stack[stack.length - 2] as BinaryOpInfo)) {
				right = stack.pop() as Expression; // Assert Expression type after check
				const current_op_info = stack.pop() as BinaryOpInfo; // Assert BinaryOpInfo
				left = stack.pop() as Expression; // Assert Expression type

				node = {
					type: Jsep.BINARY_EXP,
					operator: current_op_info.value,
					left: left, // Ensure left is Expression
					right: right, // Ensure right is Expression
					parenthesis: false
				};
				stack.push(node);
			}

			const nextToken = this.gobbleToken(); // Can return null

			if (!nextToken) {
				this.throwError("Expected expression after " + cur_biop);
			}

			stack.push(biop_info, nextToken);
		}

		// Combine remaining stack items
		let finalNode = stack.pop(); // Could be Expression or BinaryOpInfo initially

		while (stack.length > 1) {
			const opInfo = stack.pop() as BinaryOpInfo; // Assert BinaryOpInfo
			const leftNode = stack.pop() as Expression; // Assert Expression

			if (!finalNode || typeof finalNode === 'boolean' || !('type' in finalNode)) {
				// Handle cases where finalNode might not be a valid Expression (though unlikely here)
				this.throwError('Internal error: Invalid stack state during binary expression reduction.');
			}


			finalNode = {
				type: Jsep.BINARY_EXP,
				operator: opInfo.value,
				left: leftNode,
				right: finalNode as Expression, // Assert finalNode is Expression
				parenthesis: false
			};
		}


		// Final node should be the single remaining Expression on the stack
		return finalNode as Expression | null; // Cast final result, could be null if input was empty
	}
	/**
	 * An individual part of a binary expression:
	 * e.g. `foo.bar(baz)`, `1`, `"abc"`, `(a % 2)` (because it's in parenthesis)
	 */
	gobbleToken(): Expression | null { // Allow null return
		let ch: number;
		let to_check: string;
		let tc_len: number;
		let node: Expression | undefined | null; // Allow undefined/null during processing

		this.gobbleSpaces();
		node = this.searchHook('gobble-token'); // Can return undefined
		if (node) {
			// runHook now correctly returns Expression | null
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
					// runHook now correctly returns Expression | null
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
				const idNode = this.gobbleIdentifier(); // Store in temp var
				node = idNode; // Assign to node
				if (Jsep.literals.hasOwnProperty(idNode.name)) {
					const literalValue = Jsep.literals[idNode.name];
					// Check value is not undefined before assigning
					if (literalValue !== undefined) {
						node = {
							type: Jsep.LITERAL,
							value: literalValue,
							valueType: typeof literalValue,
							raw: idNode.name,
						};
					}
					// If literalValue is undefined, node remains the Identifier
				}
				else if (idNode.name === Jsep.this_str) {
					node = { type: Jsep.THIS_EXP };
				}
			}
			else if (ch === Jsep.OPAREN_CODE) { // open parenthesis
				node = this.gobbleGroup();
			}
		}

		if (!node) {
			// runHook now correctly returns Expression | null
			return this.runHook('after-token', node || null); // Pass null explicitly if node is null/undefined
		}

		node = this.gobbleTokenProperty(node); // Can return null
		// runHook now correctly returns Expression | null
		return this.runHook('after-token', node || null); // Pass null explicitly if node is null/undefined
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
				const propertyExpr = this.gobbleExpression(); // Can return null
				if (!propertyExpr) {
					this.throwError('Expected expression within []');
				}
				node = {
					type: Jsep.MEMBER_EXP,
					computed: true,
					object: node,
					property: propertyExpr
				};
				// No need to check node.property existence after assignment
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
				// Ensure node is MemberExpression before setting optional
				if (node.type === Jsep.MEMBER_EXP || node.type === Jsep.CALL_EXP) {
					node.optional = true;
				}
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
			valueType: 'number',
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
			else if (ch === '\\') { // Correct escape character check
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
			valueType: 'string',
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
	// Allow null elements for array literals like [,,]
	gobbleArguments(termination: number): (Expression | null)[] {
		const args: (Expression | null)[] = []; // Initialize with correct type
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
					// Handle sparse arrays like [a,,c]
					else if (termination === Jsep.CBRACK_CODE) {
						// Push null for the missing element before the comma
						args.push(null);
						// If there are multiple commas like [a,,,d], keep pushing null
						while (this.expr.charCodeAt(this.index) === Jsep.COMMA_CODE) {
							this.index++;
							separator_count++;
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
	TAGGED_TEMPLATE_EXPRESSION: 'TaggedTemplateExpression',
	TEMPLATE_LITERAL: 'TemplateLiteral',
	TEMPLATE_ELEMENT: 'TemplateElement',


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
	BTICK_CODE: 96, // `
	OCURLY_CODE: 123, // {
	CCURLY_CODE: 125, // }
	FSLASH_CODE: 47, // /
	BSLASH_CODE: 92, // \


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
		'null': null,
		// Numbers and strings are handled directly, no need to list them here
	} as Record<string, boolean | null | number | string | RegExp>, // Ensure type matches static property

	// Except for `this`, which is special. This could be changed to something like `'self'` as well
	this_str: 'this',
});
Jsep.max_unop_len = Jsep.getMaxKeyLen(Jsep.unary_ops);
Jsep.max_binop_len = Jsep.getMaxKeyLen(Jsep.binary_ops);


const ARROW_EXP = 'ArrowFunctionExpression';


const CONDITIONAL_EXP = 'ConditionalExpression';

export const ternary: JSEPPlugin = {
	name: 'ternary',

	init(jsep) {
		// Ternary expression: test ? consequent : alternate
		jsep.hooks.add('after-expression', function gobbleTernary(env: HookEnv) {
			if (env.node && this.code === jsep.QUMARK_CODE) {
				this.index++;
				const test = env.node as BinaryExpression;
				const consequent = this.gobbleExpression();

				if (!consequent) {
					this.throwError('Expected expression');
				}

				this.gobbleSpaces();

				if (this.code === jsep.COLON_CODE) {
					this.index++;
					const alternate = this.gobbleExpression();

					if (!alternate) {
						this.throwError('Expected expression');
					}
					env.node = {
						type: CONDITIONAL_EXP as 'ConditionalExpression', // Use constant and assert type
						test,
						consequent,
						alternate,
					};

					// check for operators of higher priority than ternary (i.e. assignment)
					// jsep sets || at 1, and assignment at 0.9, and conditional should be between them
					if (test.operator && jsep.binary_ops[test.operator] <= 0.9) {
						let newTest = test;
						while (newTest.right.operator && jsep.binary_ops[newTest.right.operator] <= 0.9) {
							newTest = newTest.right;
						}
						env.node.test = newTest.right;
						newTest.right = env.node;
						env.node = test;
					}
				}
				else {
					this.throwError('Expected :');
				}
			}
		});
	},
};


export const arrow: JSEPPlugin = {
	name: 'arrow',

	init(jsxp) {
		// arrow-function expressions: () => x, v => v, (a, b) => v
		jsxp.addBinaryOp('=>', 0.1, true);

		// this hook searches for the special case () => ...
		// which would normally throw an error because of the invalid LHS to the bin op
		// Use HookCallback type for consistency
		jsxp.hooks.add('gobble-expression', function gobbleEmptyArrowArg(this: Jsep, env: HookEnv) {
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
						// Rename second 'body' variable to avoid conflict
						const arrowBody = this.gobbleBinaryExpression();
						if (!arrowBody) {
							this.throwError("Expected expression after " + biop);
						}
						env.node = {
							type: ARROW_EXP as 'ArrowFunctionExpression', // Use constant and assert type
							params: null,
							body: arrowBody, // Use renamed variable
						}; // Don't need 'as' assertion if types match HookEnv.node
						return; // Return from the hook callback
					}
				}
				this.index = backupIndex;
			}
		});

		// Use HookCallback type
		jsxp.hooks.add('after-expression', function fixBinaryArrow(this: Jsep, env: HookEnv) {
			updateBinariesToArrows(env.node); // Pass env.node which can be Expression | null
		});

		// node can be Expression | null
		function updateBinariesToArrows(node: Expression | null): void { // Use specific type
			if (node && typeof node === 'object') { // Check if node is an object and not null
				// Traverse full tree, converting any sub-object nodes as needed
				Object.values(node).forEach((val) => { // Infer type for val
					// Check if val is an Expression or array before recursing
					if (val && typeof val === 'object') {
						if (Array.isArray(val)) {
							val.forEach(updateBinariesToArrows);
						} else if ('type' in val) { // Basic check for Expression-like object
							updateBinariesToArrows(val as Expression);
						}
					}
				});

				// Check if node is a BinaryExpression with operator '=>'
				if (node.type === jsxp.BINARY_EXP && node.operator === '=>') {
					const arrowNode = node as any; // Cast to any to modify properties
					arrowNode.type = ARROW_EXP;
					arrowNode.params = arrowNode.left ? [arrowNode.left] : null;
					arrowNode.body = arrowNode.right;
					if (arrowNode.params && arrowNode.params[0].type === jsxp.SEQUENCE_EXP) {
						arrowNode.params = arrowNode.params[0].expressions;
					}
					// Delete properties after casting to any
					delete arrowNode.left;
					delete arrowNode.right;
					delete arrowNode.operator;
					delete arrowNode.parenthesis; // Also delete parenthesis property
				}
			}
		}
	}
};

const OBJECT_EXP = 'ObjectExpression';
const PROPERTY = 'Property';

export const object: JSEPPlugin = {
	name: 'object',

	init(jsxp) {
		// Object literal support
		// Use HookCallback type
		function gobbleObjectExpression(this: Jsep, env: HookEnv) {
			if (this.code === jsxp.OCURLY_CODE) { // Use static constant
				this.index++;
				const properties: (Property | Expression)[] = []; // Match ObjectExpression.properties type

				while (this.index < this.expr.length) { // Check index bounds
					this.gobbleSpaces();
					if (this.code === jsxp.CCURLY_CODE) { // Correct check: CCURLY_CODE
						this.index++;
						// gobbleTokenProperty expects Expression, ensure type matches
						const objNode: ObjectExpression = {
							type: OBJECT_EXP as 'ObjectExpression', // Use constant and assert
							properties,
						};
						env.node = this.gobbleTokenProperty(objNode);
						return; // Return from hook callback
					}

					// Note: using gobbleExpression instead of gobbleToken to support object destructuring
					const key = this.gobbleExpression();
					if (!key) {
						break; // missing }
					}

					this.gobbleSpaces();
					if (key.type === jsxp.IDENTIFIER && (this.code === jsxp.COMMA_CODE || this.code === jsxp.CCURLY_CODE)) {
						// property value shorthand
						properties.push({
							type: PROPERTY as 'Property', // Use constant and assert
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
							type: PROPERTY as 'Property', // Use constant and assert
							computed,
							key: computed
								// Ensure key.elements[0] is an Expression if key is ArrayExpression
								? (key as ArrayExpression).elements[0] as Expression
								: key,
							value: value,
							shorthand: false,
						});
						this.gobbleSpaces();
					}
					// Ensure key is not null before pushing
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


export const regex: JSEPPlugin = {
	name: 'regex',

	init(jsxp) {
		// Regex literal: /abc123/ig
		// Use HookCallback type
		jsxp.hooks.add('gobble-token', function gobbleRegexLiteral(this: Jsep, env: HookEnv) {
			if (this.code === jsxp.FSLASH_CODE) { // Use static constant
				const patternIndex = ++this.index;

				let inCharSet = false;
				while (this.index < this.expr.length) {
					// Check for escape char '\' before checking for '/' or '[' or ']'
					const currentCode = this.code; // Store current code

					if (currentCode === jsxp.FSLASH_CODE && !inCharSet) { // Use static constant
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
						catch (e: unknown) { // Catch unknown error type
							if (e instanceof Error) {
								this.throwError(e.message);
							} else {
								this.throwError('Invalid Regular Expression');
							}
						}

						const literalNode: Literal = { // Ensure type matches Literal
							type: jsxp.LITERAL,
							value, // Value is RegExp here
							raw: this.expr.slice(patternIndex - 1, this.index),
						};
						env.node = literalNode;

						// allow . [] and () after regex: /regex/.test(a)
						// gobbleTokenProperty expects Expression, ensure type matches
						env.node = this.gobbleTokenProperty(literalNode);
						return; // Return from hook callback
					}

					if (currentCode === jsxp.BSLASH_CODE) { // Check for backslash first
						this.index += 2; // Skip escaped char
					} else {
						if (currentCode === jsxp.OBRACK_CODE) { // [
							inCharSet = true;
						} else if (inCharSet && currentCode === jsxp.CBRACK_CODE) { // ]
							inCharSet = false;
						}
						this.index++; // Move to next char
					}
				}
				this.throwError('Unclosed Regex'); // Throw error if loop finishes without closing '/'
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
		// Use HookCallback type
		jsxp.hooks.add('gobble-token', function gobbleSpread(this: Jsep, env: HookEnv) {
			if ([0, 1, 2].every(i => this.expr.charCodeAt(this.index + i) === jsxp.PERIOD_CODE)) {
				this.index += 3;
				const argument = this.gobbleExpression(); // Can return null
				if (!argument) {
					this.throwError('Expected expression after ...');
				}
				env.node = {
					type: 'SpreadElement',
					argument: argument,
				};
			}
		});
	},
};

const TAGGED_TEMPLATE_EXPRESSION = 'TaggedTemplateExpression';
const TEMPLATE_LITERAL = 'TemplateLiteral';
const TEMPLATE_ELEMENT = 'TemplateElement'; // Now defined above

export const jsepTemplateLiteral: JSEPPlugin = {
	name: 'jsepTemplateLiteral',

	init(jsxp) {
		// env can be null when called directly, make it optional
		function gobbleTemplateLiteral(this: Jsep, env?: HookEnv | null, gobbleMember = true): TemplateLiteral | undefined {
			if (this.code === jsxp.BTICK_CODE) { // Use static constant
				const node: TemplateLiteral = { // Use TemplateLiteral type
					type: TEMPLATE_LITERAL as 'TemplateLiteral', // Use constant and assert
					quasis: [],
					expressions: [],
				};
				let cooked: string | null = ''; // cooked can be null
				let raw = '';
				let closed = false;
				const length = this.expr.length;
				const templateStart = this.index; // Keep track of start for raw value

				const pushQuasi = () => {
					const quasi: TemplateElement = { // Use TemplateElement type
						type: TEMPLATE_ELEMENT as 'TemplateElement', // Use constant and assert
						value: {
							raw: raw,
							cooked: cooked,
						},
						tail: closed,
					};
					node.quasis.push(quasi);
				};

				this.index++; // Consume opening backtick `

				while (this.index < length) {
					const elStart = this.index;
					let ch = this.expr.charAt(this.index);

					if (ch === '`') { // End of template literal
						raw = this.expr.slice(elStart, this.index);
						this.index++; // Consume closing backtick
						closed = true;
						pushQuasi();

						// Assign node to env if called as a hook
						if (env) env.node = node;

						// Optionally gobble member/call expressions after the literal
						if (gobbleMember && env) {
							// Ensure node is not null before passing
							env.node = this.gobbleTokenProperty(node);
						}

						return node; // Return the completed TemplateLiteral node
					}
					else if (ch === '$' && this.expr.charAt(this.index + 1) === '{') { // Start of expression hole ${...}
						raw = this.expr.slice(elStart, this.index);
						pushQuasi(); // Push the preceding TemplateElement

						this.index += 2; // Consume ${
						// Pass CCURLY_CODE to gobbleExpressions
						node.expressions.push(...this.gobbleExpressions(jsxp.CCURLY_CODE));
						if (this.code !== jsxp.CCURLY_CODE) { // Correct check: CCURLY_CODE
							this.throwError('unclosed ${');
						}
						this.index++; // Consume closing }

						// Reset raw/cooked for the next TemplateElement
						raw = '';
						cooked = '';
					} else { // Regular character or escape sequence
						this.index++; // Consume the character
						if (ch === '\\') { // Escape sequence
							if (this.index >= length) {
								this.throwError('Invalid escape sequence');
							}
							const escapedChar = this.expr.charAt(this.index++);
							switch (escapedChar) {
								case 'n': cooked += '\n'; break;
								case 'r': cooked += '\r'; break;
								case 't': cooked += '\t'; break;
								case 'b': cooked += '\b'; break;
								case 'f': cooked += '\f'; break;
								case 'v': cooked += '\v'; break;
								case '`': cooked += '`'; break;
								case '$': cooked += '$'; break;
								case '\\': cooked += '\\'; break;
								// TODO: Handle unicode/hex escapes if needed
								default:
									// Handle invalid escape sequences - cooked becomes null
									cooked = null;
									break;
							}
						} else {
							if (cooked !== null) { // Don't append if already invalid
								cooked += ch;
							}
						}
					}
				}
				this.throwError('Unclosed `');
			}
			return undefined; // Return undefined if not starting with `
		}

		// Use HookCallback type
		jsxp.hooks.add('gobble-token', function gobbleTemplateLiteralHook(this: Jsep, env: HookEnv) {
			// Call the main logic, assigning the result to env.node
			gobbleTemplateLiteral.call(this, env, true);
		});


		// Use HookCallback type
		jsxp.hooks.add('after-token', function gobbleTaggedTemplateIdentifier(this: Jsep, env: HookEnv) {
			// Check env.node exists and is the right type before proceeding
			if (env.node && (env.node.type === jsxp.IDENTIFIER || env.node.type === jsxp.MEMBER_EXP) && this.code === jsxp.BTICK_CODE) {
				const tag = env.node;
				// Call gobbleTemplateLiteral directly, not as a hook, don't gobble member after
				const quasi = gobbleTemplateLiteral.call(this, undefined, false); // Pass undefined for env

				if (!quasi) {
					// Should not happen if BTICK_CODE was detected, but check anyway
					this.throwError('Expected template literal after tag');
				}

				const taggedNode: TaggedTemplateExpression = { // Use specific type
					type: TAGGED_TEMPLATE_EXPRESSION as 'TaggedTemplateExpression', // Use constant and assert
					tag: tag,
					quasi: quasi,
				};
				env.node = taggedNode;


				// allow . [] and () after tagged template: bar`foo`.length
				env.node = this.gobbleTokenProperty(taggedNode);

				// No explicit return needed, env.node is modified
			}
		});
	}
};
Jsep.plugins.register(ternary, arrow, object, regex, jsepSpread, jsepTemplateLiteral);
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