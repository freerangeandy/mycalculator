import { updateObject, insertReplace } from './utility';
import { setVariable } from './interpreter';

export const SYMBOLS = {
    0: {key: '0', display: '0'},
    1: {key: '1', display: '1'},
    2: {key: '2', display: '2'},
    3: {key: '3', display: '3'},
    4: {key: '4', display: '4'},
    5: {key: '5', display: '5'},
    6: {key: '6', display: '6'},
    7: {key: '7', display: '7'},
    8: {key: '8', display: '8'},
    9: {key: '9', display: '9'},
    negate: {key: 'negate', display: '( − )', converted: '-'},
    divide: {key: 'divide', display: '∕', converted: '/'},
    multiply: {key: 'multiply', display: '*', converted: '*'},
    subtract: {key: 'subtract', display: '—', converted: '-'},
    add: {key: 'add', display: '+', converted: '+'},
    comma: {key: 'comma', display: ',', converted: ','},
    point: {key: 'point', display: '.', converted: '.'},
    sum: {
        key: 'sum', display: '∑', converted: 'sum(', prefix: '*'},
    integrate: {
        key: 'integrate', display: '∫', converted: 'integrate(', prefix: '*'},
    diff: {
        key: 'diff', display: '∂', converted: 'diff(', prefix: '*'},
    limit: {
        key: 'limit', display: 'lim', converted: 'limit(', prefix: '*'},
    sqRoot: {
        key: 'sqRoot', display: '√', converted: 'sqrt(', prefix: '*'},
    sin: {
        key: 'sin', display: 'sin', converted: 'sin(', prefix: '*'},
    cos: {
        key: 'cos', display: 'cos', converted: 'cos(', prefix: '*'},
    tan: {
        key: 'tan', display: 'tan', converted: 'tan(', prefix: '*'},
    asin: {
        key: 'asin', display: 'sin⁻¹', converted: 'asin(', prefix: '*'},
    acos: {
        key: 'acos', display: 'cos⁻¹', converted: 'acos(', prefix: '*'},
    atan: {
        key: 'atan', display: 'tan⁻¹', converted: 'atan(', prefix: '*'},
    naturalLog: {
        key: 'naturalLog', display: 'ln', converted: 'log(', prefix: '*'},
    logarithm: {
        key: 'logarithm', display: 'log', converted: 'log10(', prefix: '*'},
    lParen: {key: 'lParen', display: '(', converted: '('},
    rParen: {key: 'rParen', display: ')', converted: ')'},
    lBracket: {key: 'lBracket', display: '[', converted: '['},
    rBracket: {key: 'rBracket', display: ']', converted: ']'},
    equals: {key: 'equals', display: '=', converted: '='},
    greaterThan: {key: 'greaterThan', display: '>', converted: '>'},
    lessThan: {key: 'lessThan', display: '<', converted: '<'},
    gtEqual: {key: 'gtEqual', display: '≥', converted: '≥'},
    ltEqual: {key: 'ltEqual', display: '≤', converted: '≤'},
    exponent: {key: 'exponent', display: '^', converted: '^'},
    secondFunc: {key: 'secondFunc', display: '2nd'},
    mode: {key: 'mode', display: 'mode'},
    stat: {key: 'stat', display: 'stat'},
    mat: {key: 'mat', display: 'mat'},
    sciNotation: {key: 'sciNotation', display: 'EE', converted: '*10^('},
    pi:
        {key: 'pi', display: 'π', converted: 'π', prefix: '*'},
    euler:
        {key: 'euler', display: 'ℯ', converted: 'e', prefix: '*'},
    random: {key: 'random', display: 'rand', converted: 'rand('},
    modulo: {key: 'modulo', display: 'mod', converted: 'mod('},
    factorial: {key: 'factorial', display: '!', converted: 'fact('},
    median: {key: 'median', display: 'med', converted:  'median('},
    mean: {key: 'mean', display: 'x̄', converted: 'mean('},
    stdDev: {key: 'stdDev', display: '𝜎', converted: 'stdev('},
    variance: {key: 'variance', display: '𝜎²', converted: 'variance('},
    crossProd: {key: 'crossProd', display: '×', converted: 'cross('},
    dotProd: {key: 'dotProd', display: '⋅', converted: 'dot('},
    transpose: {key: 'transpose', display: 'ᵀ', converted: 'transpose('},
    determinant: {key: 'determinant', display: 'det', converted: 'determinant('},
    inverse: {key: 'inverse', display: '⁻¹', converted: 'invert('},
    delete:
        {key: 'delete', display: '⌫', action:
            (state, action) => {
                let curSelection = state.selection;
                const curSelectionWidth = curSelection[1] - curSelection[0];
                if (curSelectionWidth === 0 && curSelection[0] > 0) {
                    curSelection[0] -= 1; // select previous character (to delete)
                }
                return insertReplace("", curSelection, state.entryVal);
            }},
    answer:
        {key: 'answer', display: 'ans', action:
            (state, action) => {
                if (state.displayRows.length > 0) {
                  const prevAnswerObj = state.displayRows.slice(-1)[0][1];
                  const prevAnswer = state.useDecimals ? prevAnswerObj.text('decimals')
                                                       : prevAnswerObj.text('fraction');
                  const ansLength = prevAnswer.length;
                  return {
                    entryVal: prevAnswer,
                    selection: [ansLength,ansLength],
                  }
              } else return {...state};
            }},
    assign:
        {key: 'assign', display: '↦', action:
            (state, action) => {
                const assignmentSuccess = setVariable(action.payload, state.entryVal);
                return assignmentSuccess
                  ? {
                    showSnackbar: true,
                    snackbarMsg: `${action.payload} assigned to value: ${state.entryVal}`,
                  } : {
                    errorName: 'setVarError',
                    errorMsg: `${action.payload} is not a valid variable name`,
                };
            }},
    clear:
        {key: 'clear', display: 'C', action:
            (state, action) => {
                return {
                  entryVal: '',
                  selection: [0,0],
                }
            }},
}
