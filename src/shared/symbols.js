import React from 'react';
import { InlineMath } from 'react-katex';

import { insertSymbol } from './utility';
import { setVariable } from './interpreter';

const laTeXWrapper = (laTeX) => (<InlineMath math={laTeX}/>);

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
        key: 'sum', display: laTeXWrapper('\\sum'), converted: 'sum(', prefix: '*', suffix: ',i,1,n)'},
    product: {
        key: 'product', display: laTeXWrapper('\\prod'), converted: 'product(', prefix: '*', suffix: ',i,1,n)'},
    integrate: {
        key: 'integrate', display: laTeXWrapper('\\int'), converted: 'integrate(', prefix: '*', suffix: ',x)'},
    defint: {
        key: 'defint', display: laTeXWrapper('\\int_a^b'), converted: 'defint(', prefix: '*', suffix: 'a,b,x)'},
    diff: {
        key: 'diff', display: laTeXWrapper('\\frac{d}{dx}'), converted: 'diff(', prefix: '*', suffix: ',x,1)'},
    limit: {
        key: 'limit', display: 'lim', converted: 'limit(', prefix: '*', suffix: ',x,0)'},
    sqRoot: {
        key: 'sqRoot', display: '√', converted: 'sqrt(', prefix: '*', suffix: ')'},
    sin: {
        key: 'sin', display: 'sin', converted: 'sin(', prefix: '*', suffix: ')'},
    cos: {
        key: 'cos', display: 'cos', converted: 'cos(', prefix: '*', suffix: ')'},
    tan: {
        key: 'tan', display: 'tan', converted: 'tan(', prefix: '*', suffix: ')'},
    asin: {
        key: 'asin', display: 'sin⁻¹', converted: 'asin(', prefix: '*', suffix: ')', fontSize: '83%'},
    acos: {
        key: 'acos', display: 'cos⁻¹', converted: 'acos(', prefix: '*', suffix: ')', fontSize: '83%'},
    atan: {
        key: 'atan', display: 'tan⁻¹', converted: 'atan(', prefix: '*', suffix: ')', fontSize: '83%'},
    naturalLog: {
        key: 'naturalLog', display: 'ln', converted: 'log(', prefix: '*', suffix: ')'},
    logarithm: {
        key: 'logarithm', display: 'log', converted: 'log10(', prefix: '*', suffix: ')'},
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
    sciNotation:
        {key: 'sciNotation', display: 'EE', converted: '*10^(', suffix: ')'},
    random:
        {key: 'random', display: 'rand', converted: 'rand(', suffix: ')'},
    modulo:
        {key: 'modulo', display: 'mod', converted: 'mod(', suffix: ')'},
    factorial:
        {key: 'factorial', display: '!', converted: 'fact(', suffix: ')'},
    median:
        {key: 'median', display: 'med', converted:  'median(', suffix: ')'},
    mean:
        {key: 'mean', display: 'x̄', converted: 'mean(', suffix: ')'},
    stdDev:
        {key: 'stdDev', display: '𝜎', converted: 'stdev(', suffix: ')'},
    variance:
        {key: 'variance', display: '𝜎²', converted: 'variance(', suffix: ')'},
    crossProd:
        {key: 'crossProd', display: '×', converted: 'cross(', suffix: ', )'},
    dotProd:
        {key: 'dotProd', display: '⋅', converted: 'dot(', suffix: ', )'},
    transpose:
        {key: 'transpose', display: 'ᵀ', converted: 'transpose(', suffix: ')'},
    determinant:
        {key: 'determinant', display: 'det', converted: 'determinant(', suffix: ')'},
    inverse:
        {key: 'inverse', display: '⁻¹', converted: 'invert(', suffix: ')'},
    identity:
        {key: 'identity', display: '𝐼', converted: 'imatrix(', suffix: ')'},
    pi:
        {key: 'pi', display: laTeXWrapper('\\pi'), converted: 'π', prefix: '*'}, //'π'
    euler:
        {key: 'euler', display: 'ℯ', converted: 'e', prefix: '*'},
    imaginary:
        {key: 'imaginary', display: laTeXWrapper('i'), converted: 'i', prefix: '*'},
    secondFunc: {key: 'secondFunc', display: '2nd'},
    mode: {key: 'mode', display: 'mode'},
    stat: {key: 'stat', display: 'stat'},
    mat: {key: 'mat', display: 'mat'},
    delete:
        {key: 'delete', display: '⌫', action:
            (state, action) => {
                let curSelection = state.selection;
                const curSelectionWidth = curSelection[1] - curSelection[0];
                if (curSelectionWidth === 0 && curSelection[0] > 0) {
                    curSelection[0] -= 1; // select previous character (to delete)
                }
                return insertSymbol(state, {key: ''});
            }},
    answer:
        {key: 'answer', display: 'ans', action:
            (state, action) => {
                if (state.displayRows.length > 0) {
                  const prevAnswer = state.displayRows.slice(-1)[0][1];
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
