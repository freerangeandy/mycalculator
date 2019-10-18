import nerdamer from 'nerdamer/nerdamer.core';
import 'nerdamer/Algebra';
import 'nerdamer/Calculus';
import 'nerdamer/Extra';

import { SYMBOLS } from './symbols';
import { containsMatrix,
    isVector,
    trigExactResult,
    containsDerivative,
    containsTrig,
    containsSquareRoot,
} from './patternMatch';

export const setConstant = (symbol, val) => {
    nerdamer.setConstant(symbol, val);
    const test = nerdamer(`${symbol}`).toString();
    console.log(test);
}
// make full evaluation tests: input -> latex, input -> result, result -> latex
export const evalExpression = (expression, useDecimals=false, useDegrees=false) => {
    const preEvalExpression = shouldConvertAnglesToRad(expression, useDegrees)
                          ? convertAnglesToRad(expression)
                          : expression;
    const postEvalObj = nerdamer(preEvalExpression);
    console.log('postEvalObj: ' + postEvalObj);
    console.log(postEvalObj);
    const noFurtherEval = preventFurtherEval(postEvalObj, useDecimals);
    const resultObject = noFurtherEval ? postEvalObj : postEvalObj.evaluate();
    const resultString = useDecimals ? resultObject.text('decimals') : resultObject.text('fractions');
    return resultString;
};

// perhaps need to add argument for input vs. output
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

export const preventFurtherEval = (postEvalObj, useDecimals) => {
  const matchesMatrix = postEvalObj.text().match(/^matrix\(/);
  const matchesTrigExact = postEvalObj.text().match(/sqrt\(/);
  return matchesMatrix || (matchesTrigExact && !useDecimals);
}

export const preventEvalOutputPreLaTeX = (expression) => containsSquareRoot(expression);
export const shouldConvertAnglesToRad = (expression, useDegrees) => useDegrees && containsTrig(expression);

export const processDerivative = (laTeXExpression) => {
    return laTeXExpression.replace(DIFFERENTIAL_BAD, DIFFERENTIAL_GOOD);
}

const DIFFERENTIAL_BAD = '\\frac{d^{1}}{d x^{1}}';
const DIFFERENTIAL_GOOD = '\\frac{d}{d x}';

export const convertRadToDeg = (rad) => nerdamer(`${rad} * 180 / pi`).evaluate().text('decimals');

export const convertDegToRad = (deg) => {
    const piLessDeg = deg.match(/(pi|π)/g)
                      ? nerdamer(deg).evaluate().text('decimals')
                      : deg;
    if (piLessDeg % 1 === 0 && piLessDeg !== '0') {
        const piCoefficient = nerdamer(`${parseInt(piLessDeg)} / 180`);
        return `${piCoefficient} * pi`;
    } else {
        const radians = nerdamer(`${parseFloat(piLessDeg)} * pi/ 180`).evaluate().text('decimals');
        return `${radians}`;
    }
}

export const convertTrigArgumentToRad = (trigFunction, regex) => {
    const parsedFunction = trigFunction.match(RegExp(regex));
    const angleDegrees = parsedFunction[1];
    const angleRadians = convertDegToRad(angleDegrees);
    return trigFunction.replace(angleDegrees, angleRadians);
}

export const convertAnglesToRad = (expression) => {
    let convertedExpression = expression;
    const regex = `\\b(?:sin|cos|tan)\\((.+?)\\)`;
    const trigFunctionMatches = expression.match(RegExp(regex, 'g')) || [];
    for (const trigFunction of trigFunctionMatches) {
        const convertedTrig = convertTrigArgumentToRad(trigFunction, regex);
        convertedExpression = convertedExpression.replace(trigFunction, convertedTrig);
    }
    return convertedExpression;
}
