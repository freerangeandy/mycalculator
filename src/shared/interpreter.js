import nerdamer from 'nerdamer/nerdamer.core';
import 'nerdamer/Algebra';
import 'nerdamer/Calculus';

export const BUTTON_CONVERSION = {
    '∕' : '/',
    '×' : '*',
    '—' : '-',
    '+' : '+',
    '∑' : 'sum(',
    '∫' : 'integrate(',
    '∂' : 'diff(',
    '√' : 'sqrt(',
    'sin': 'sin(',
    'cos' : 'cos(',
    'tan' : 'tan(',
    'ln' : 'ln(',
    '( − )': '-',
}
export const ARITHMETIC_OPERATORS = ['∕', '×', '—', '+']; // [/, *, -, +] &#x[unicode]

export const NUM_PAD = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [0, '.', '( − )'],
];

export const FUNCTIONS_OTHERS = [
    ['∑', '∫', '∂', '√'],
    ['sin', 'cos', 'tan', 'ln'],
    ['=','>','<', 'C'],
    ['(',')', ',', '^'],
];
export const evalExpression = (expression) => {
    const out = nerdamer(expression).evaluate();
    return out;
}
