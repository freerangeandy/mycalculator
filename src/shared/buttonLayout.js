import { SYMBOLS } from './symbols';

export const ARITHMETIC_OPERATORS = [
    SYMBOLS.divide,
    SYMBOLS.multiply,
    SYMBOLS.subtract,
    SYMBOLS.add,
]; // ['∕', '*', '—', '+'];

export const NUM_PAD = [
    [SYMBOLS[7], SYMBOLS[8], SYMBOLS[9]],          // [7, 8, 9],
    [SYMBOLS[4], SYMBOLS[5], SYMBOLS[6]],          // [4, 5, 6],
    [SYMBOLS[1], SYMBOLS[2], SYMBOLS[3]],          // [1, 2, 3],
    [SYMBOLS[0], SYMBOLS.point, SYMBOLS.negate], // [0, '.', '( − )'],
];

export const FUNCTIONS = [
    [SYMBOLS.sum, SYMBOLS.integrate, SYMBOLS.diff, SYMBOLS.limit],  // ['∑', '∫', '∂', 'lim'],
    [SYMBOLS.sin, SYMBOLS.cos, SYMBOLS.tan, SYMBOLS.naturalLog],     // ['sin', 'cos', 'tan', 'ln'],
    [SYMBOLS.equals, SYMBOLS.greaterThan, SYMBOLS.lessThan, SYMBOLS.sqRoot], // ['=','>','<', '√'],
    [SYMBOLS.lParen, SYMBOLS.rParen, SYMBOLS.pi, SYMBOLS.exponent],  // ['(',')', ',', '^'],
];

export const MODIFIERS = [
    SYMBOLS.secondFunc,
    SYMBOLS.mode,
    SYMBOLS.stat,
    SYMBOLS.mat,
];

export const ACTIONS = [
    SYMBOLS.delete,
    SYMBOLS.answer,
    SYMBOLS.assign,
    SYMBOLS.clear,
];

export const ALTERNATES = {
    [SYMBOLS.sum.key]: SYMBOLS.sum, //same
    [SYMBOLS.integrate.key]: SYMBOLS.integrate, //same
    [SYMBOLS.diff.key]: SYMBOLS.diff, //same
    [SYMBOLS.limit.key]: SYMBOLS.limit, //same
    [SYMBOLS.sqRoot.key]: SYMBOLS.factorial,
    [SYMBOLS.equals.key]: SYMBOLS.modulo,
    [SYMBOLS.sin.key]: SYMBOLS.asin,
    [SYMBOLS.cos.key]: SYMBOLS.acos,
    [SYMBOLS.tan.key]: SYMBOLS.atan,
    [SYMBOLS.lParen.key]: SYMBOLS.lBracket,
    [SYMBOLS.rParen.key]: SYMBOLS.rBracket,
    [SYMBOLS.greaterThan.key]: SYMBOLS.gtEqual,
    [SYMBOLS.lessThan.key]: SYMBOLS.ltEqual,
    [SYMBOLS.naturalLog.key]: SYMBOLS.logarithm,
    [SYMBOLS.exponent.key]: SYMBOLS.sciNotation,
    [SYMBOLS.pi.key]: SYMBOLS.comma,
};

export const STAT_POP = [
    [SYMBOLS.mean, SYMBOLS.median],
    [SYMBOLS.stdDev, SYMBOLS.variance],
];

export const MAT_POP = [
    [SYMBOLS.crossProd, SYMBOLS.dotProd],
    [SYMBOLS.inverse, SYMBOLS.transpose],
    [SYMBOLS.determinant, SYMBOLS.random],
];
