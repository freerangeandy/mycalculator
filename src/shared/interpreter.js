import nerdamer from 'nerdamer/nerdamer.core';
import 'nerdamer/Algebra';
import 'nerdamer/Calculus';

import { KEYS } from './symbols';

export const ARITHMETIC_OPERATORS = [
    KEYS.divide,
    KEYS.multiply,
    KEYS.subtract,
    KEYS.add,
]; // ['∕', '×', '—', '+'];

export const NUM_PAD = [
    [7, 8, 9],          // [7, 8, 9],
    [4, 5, 6],          // [4, 5, 6],
    [1, 2, 3],          // [1, 2, 3],
    [0, '.', KEYS.negate], // [0, '.', '( − )'],
];

export const FUNCTIONS = [
    [KEYS.sum, KEYS.integrate, KEYS.diff, KEYS.sqRoot],  // ['∑', '∫', '∂', '√'],
    [KEYS.sin, KEYS.cos, KEYS.tan, KEYS.naturalLog],     // ['sin', 'cos', 'tan', 'ln'],
    [KEYS.equals, KEYS.greaterThan, KEYS.lessThan, ' '], // ['=','>','<', ''],
    ['(',')', ',', KEYS.exponent],                       // ['(',')', ',', '^'],
];

export const MODIFIERS = [
    KEYS.secondFunc,
    '.',
    '.',
    '.',
];

export const ACTIONS = [
    KEYS.delete,
    KEYS.answer,
    KEYS.assign,
    KEYS.clear,
];

export const ALTERNATES = {
    [KEYS.sin]: KEYS.asin,
    [KEYS.cos]: KEYS.acos,
    [KEYS.tan]: KEYS.atan,
}

export const evalExpression = (expression) => {
    const out = nerdamer(expression).evaluate();
    return out;
};

export const convertToLaTeXString = (expression) => {
    return nerdamer.convertToLaTeX(expression).toString();
}
