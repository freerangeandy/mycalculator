import nerdamer from 'nerdamer';

export const BUTTON_CONVERSION = {
    '∕' : '/',
    '×' : '*',
    '—' : '-',
    '+' : '+',
    '∑' : 'sum(',
    '∫' : 'integrate(',
    '∂' : '√',
    'sin': 'sin(',
    'cos' : 'cos(',
    'tan' : 'tan(',
    'ln' : 'ln(',
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
export const evaluate = (expression) => {
    const out = nerdamer(expression).evaluate();
    return out;
}
