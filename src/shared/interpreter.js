import nerdamer from 'nerdamer/nerdamer.core';
import 'nerdamer/Algebra';
import 'nerdamer/Calculus';

export const ARITHMETIC_OPERATORS = [
    'divide',
    'multiply',
    'subtract',
    'add',
]; // ['∕', '×', '—', '+'];

export const NUM_PAD = [
    [7, 8, 9],             // [7, 8, 9],
    [4, 5, 6],          // [4, 5, 6],
    [1, 2, 3],          // [1, 2, 3],
    [0, '.', 'negate'], // [0, '.', '( − )'],
];

export const FUNCTIONS = [
    ['sum', 'integrate', 'diff', 'sqRoot'],         // ['∑', '∫', '∂', '√'],
    ['sin' , 'cos' , 'tan' , 'naturalLog'],         // ['sin', 'cos', 'tan', 'ln'],
    ['equals' , 'greaterThan' , 'lessThan' , ' '],  // ['=','>','<', ''],
    ['(',')', ',', 'exponent'],                     // ['(',')', ',', '^'],
];

export const MODIFIERS = [
    'secondFunc',
    '.',
    '.',
    '.',
];

export const ACTIONS = [
    'delete',
    'answer',
    'assign',
    'clear',
];

export const ALTERNATES = {
    sin: 'asin',
    cos: 'acos',
    tan: 'atan',
}

export const evalExpression = (expression) => {
    const out = nerdamer(expression).evaluate().toString();
    return out;
};

export const convertToLaTeXString = (expression) => {
    return nerdamer.convertToLaTeX(expression).toString();
}
