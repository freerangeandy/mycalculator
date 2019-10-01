import nerdamer from 'nerdamer/nerdamer.core';
import 'nerdamer/Algebra';
import 'nerdamer/Calculus';
import 'nerdamer/Extra';

import { SYMBOLS } from './symbols';
import { clearUndefined } from './utility';

export const setConstant = (symbol, val) => {
    nerdamer.setConstant(symbol, val);
    const test = nerdamer(`${symbol}`).toString();
    console.log(test);
}

export const evalExpression = (expression, useDecimals=false) => {
    const evalObj = nerdamer(expression);
    const noEval = containsMatrix(expression) || trigExactResult(expression, useDecimals);
    const outObject = noEval ? evalObj : evalObj.evaluate();
    const outString = useDecimals ? outObject.text('decimals') : outObject.text('fractions');
    return outString;
};

export const preventEvalOutputPreLaTeX = (expression) => trigExactResult(expression);

export const convertToLaTeXString = (expression, evalBeforeConversion=true) => {
    const matrixFound = containsMatrix(expression);
    const vectorFound = isVector(expression);
    const diffFound = containsDerivative(expression);
    if (!evalBeforeConversion) {
        return nerdamer(expression).toTeX();
    } else if (matrixFound) {
        const {before, match, after} = matrixFound;
        const finalTeX = before + nerdamer(match).toTeX() + after;
        return finalTeX;
    } else if (diffFound) {
        const tempTeX = nerdamer.convertToLaTeX(expression);
        const finalTeX = processDerivative(tempTeX);
        return finalTeX;
        // return nerdamer.convertToLaTeX(expression);
    } else if (vectorFound) {
        return expression;
    } else {
        return nerdamer.convertToLaTeX(expression);
    }
}

export const setVariable = (varName, varValue) => {
    const varUnreserved = !(varName === SYMBOLS.euler.converted
                        || varName === SYMBOLS.pi.converted)
    if (nerdamer.validVarName(varName) && varUnreserved) {
        nerdamer.setVar(varName, varValue);
        return true;
    } else return false;
}

export const containsMatrix = (expression) => {
    const regex = new RegExp(/^(.*\W)?(matrix\([^()]*\))(.*)?$/);
    const match = expression.match(regex);
    if (!match) return false;
    else {
        const matchObj = clearUndefined({
            before: match[1],
            match: match[2],
            after: match[3],
        });
        return matchObj;
    }
}

export const isVector = (expression) => {
    const regex = new RegExp(/^\[[^[\]]*\]$/);
    return expression.match(regex) != null;
}

export const containsVector = (expression) => {
    const regex = new RegExp(/^(.*)\b(vector\([^()]*\))(.*)?$/);
    return expression.match(regex) != null;
}

export const containsVectorFunction = (expression) => {
    const regex = new RegExp(/^[^(]*\b(cross|dot)\((.*)\)[^)]*$/);
    const match = expression.match(regex);
    if (!match) return false;
    else {
        const matchObj = clearUndefined({
            func: match[1],
            args: match[2],
        });
        return matchObj;
    }
}

export const trigExactResult = (expression, decimals) => {
  const regex = RegExp(/\b(sin|cos|tan)\((.*(?=pi|π).*)\)$/);
  const match = expression.match(regex);
  if (decimals || !match) return false;
  else {
    const matchObj = clearUndefined({
        trig: match[1],
        arg: match[2],
    });
    return matchObj;
  }
}

export const containsDerivative = (expression) => {
    const regex = new RegExp(/^(.*)?\b(diff)(\(.*\).*?)$/);
    return expression.match(regex);
}

export const processDerivative = (laTeXExpression) => {
    return laTeXExpression.replace(DIFFERENTIAL_BAD, DIFFERENTIAL_GOOD);
}

const DIFFERENTIAL_BAD = '\\frac{d^{1}}{d x^{1}}';
const DIFFERENTIAL_GOOD = '\\frac{d}{d x}';
