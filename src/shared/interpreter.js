import nerdamer from 'nerdamer/nerdamer.core';
import 'nerdamer/Algebra';
import 'nerdamer/Calculus';
import 'nerdamer/Extra';

import { SYMBOLS } from './symbols';
import { containsMatrix,
    isVector,
    trigExactResult,
    containsDerivative,
} from './patternMatch';

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

export const preventEvalOutputPreLaTeX = (expression) => trigExactResult(expression);

export const processDerivative = (laTeXExpression) => {
    return laTeXExpression.replace(DIFFERENTIAL_BAD, DIFFERENTIAL_GOOD);
}

const DIFFERENTIAL_BAD = '\\frac{d^{1}}{d x^{1}}';
const DIFFERENTIAL_GOOD = '\\frac{d}{d x}';

export const convertRadToDeg = (rad) => nerdamer(`${rad} * 180 / pi`).evaluate().text('decimals');

export const convertDegToRad = (deg) => {
    if (deg % 1 == 0 && deg != 0) {
        const piCoefficient = nerdamer(`${parseInt(deg)} / 180`);
        return `${piCoefficient} * pi`;
    } else {
        const piCoefficient = nerdamer(`${parseFloat(deg)} * pi/ 180`).evaluate().text('decimals');
        return `${piCoefficient}`;
    }
}
