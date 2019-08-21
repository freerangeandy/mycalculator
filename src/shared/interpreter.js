import nerdamer from 'nerdamer/nerdamer.core';
import 'nerdamer/Algebra';
import 'nerdamer/Calculus';

import { DISPLAY_SYMBOL, CONVERTED_SYMBOL } from './symbols.js';

export const BUTTON_CONVERSION = {
    [DISPLAY_SYMBOL.divide] : CONVERTED_SYMBOL.divide,
    [DISPLAY_SYMBOL.multiply] : CONVERTED_SYMBOL.multiply,
    [DISPLAY_SYMBOL.subtract] : CONVERTED_SYMBOL.subtract,
    [DISPLAY_SYMBOL.add] : CONVERTED_SYMBOL.add,
    [DISPLAY_SYMBOL.sum] : CONVERTED_SYMBOL.sum,
    [DISPLAY_SYMBOL.integrate] : CONVERTED_SYMBOL.integrate,
    [DISPLAY_SYMBOL.diff] : CONVERTED_SYMBOL.diff,
    [DISPLAY_SYMBOL.sqRoot] : CONVERTED_SYMBOL.sqRoot,
    [DISPLAY_SYMBOL.sin]: CONVERTED_SYMBOL.sin,
    [DISPLAY_SYMBOL.cos] : CONVERTED_SYMBOL.cos,
    [DISPLAY_SYMBOL.tan] : CONVERTED_SYMBOL.tan,
    [DISPLAY_SYMBOL.naturalLog] : CONVERTED_SYMBOL.naturalLog,
    [DISPLAY_SYMBOL.negate]: CONVERTED_SYMBOL.negate,
};

export const ARITHMETIC_OPERATORS = [
    DISPLAY_SYMBOL.divide,
    DISPLAY_SYMBOL.multiply,
    DISPLAY_SYMBOL.subtract,
    DISPLAY_SYMBOL.add,
]; // ['∕', '×', '—', '+'];

export const NUM_PAD = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [0, '.', DISPLAY_SYMBOL.negate],
];
// [7, 8, 9],
// [4, 5, 6],
// [1, 2, 3],
// [0, '.', '( − )'],

export const FUNCTIONS = [
    [DISPLAY_SYMBOL.sum, DISPLAY_SYMBOL.integrate, DISPLAY_SYMBOL.diff, DISPLAY_SYMBOL.sqRoot],
    [DISPLAY_SYMBOL.sin , DISPLAY_SYMBOL.cos , DISPLAY_SYMBOL.tan , DISPLAY_SYMBOL.naturalLog],
    [DISPLAY_SYMBOL.equals , DISPLAY_SYMBOL.greaterThan , DISPLAY_SYMBOL.lessThan , ' '],
    ['(',')', ',', DISPLAY_SYMBOL.exponent],
];
// ['∑', '∫', '∂', '√'],
// ['sin', 'cos', 'tan', 'ln'],
// ['=','>','<', 'C'],
// ['(',')', ',', '^'],

export const MODIFIERS = [
    DISPLAY_SYMBOL.secondFunc,
    '.',
    '.',
    '.',
];

export const ACTIONS = [
    DISPLAY_SYMBOL.delete,
    DISPLAY_SYMBOL.answer,
    DISPLAY_SYMBOL.assign,
    DISPLAY_SYMBOL.clear,
];

export const ALTERNATES = {
    [DISPLAY_SYMBOL.sin]: DISPLAY_SYMBOL.asin,
    [DISPLAY_SYMBOL.cos]: DISPLAY_SYMBOL.acos,
    [DISPLAY_SYMBOL.tan]: DISPLAY_SYMBOL.atan,
}

export const evalExpression = (expression) => {
    const out = nerdamer(expression).evaluate();
    return out;
};
