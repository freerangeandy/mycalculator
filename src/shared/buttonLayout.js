import { KEYS } from './symbols';

export const ARITHMETIC_OPERATORS = [
    KEYS.divide,
    KEYS.multiply,
    KEYS.subtract,
    KEYS.add,
]; // ['∕', '*', '—', '+'];

export const NUM_PAD = [
    [7, 8, 9],          // [7, 8, 9],
    [4, 5, 6],          // [4, 5, 6],
    [1, 2, 3],          // [1, 2, 3],
    [0, KEYS.point, KEYS.negate], // [0, '.', '( − )'],
];

export const FUNCTIONS = [
    [KEYS.sum, KEYS.integrate, KEYS.diff, KEYS.limit],  // ['∑', '∫', '∂', 'lim'],
    [KEYS.sin, KEYS.cos, KEYS.tan, KEYS.naturalLog],     // ['sin', 'cos', 'tan', 'ln'],
    [KEYS.equals, KEYS.greaterThan, KEYS.lessThan, KEYS.sqRoot], // ['=','>','<', '√'],
    [KEYS.lParen, KEYS.rParen, KEYS.pi, KEYS.exponent],  // ['(',')', ',', '^'],
];

export const MODIFIERS = [
    KEYS.secondFunc,
    'mode',
    'stat',
    'mat',
];

export const ACTIONS = [
    KEYS.delete,
    KEYS.answer,
    KEYS.assign,
    KEYS.clear,
];

export const ALTERNATES = {
    [KEYS.sum]: KEYS.sum, //same
    [KEYS.integrate]: KEYS.integrate, //same
    [KEYS.diff]: KEYS.diff, //same
    [KEYS.limit]: KEYS.limit, //same
    [KEYS.sqRoot]: KEYS.factorial,
    [KEYS.equals]: KEYS.modulo,
    [KEYS.sin]: KEYS.asin,
    [KEYS.cos]: KEYS.acos,
    [KEYS.tan]: KEYS.atan,
    [KEYS.lParen]: KEYS.lBracket,
    [KEYS.rParen]: KEYS.rBracket,
    [KEYS.greaterThan]: KEYS.gtEqual,
    [KEYS.lessThan]: KEYS.ltEqual,
    [KEYS.naturalLog]: KEYS.logarithm,
    [KEYS.exponent]: KEYS.sciNotation,
    [KEYS.pi]: KEYS.comma,
}
