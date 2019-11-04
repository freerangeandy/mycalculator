import nerdamer from 'nerdamer/nerdamer.core';
import 'nerdamer/Algebra';
import 'nerdamer/Calculus';
import 'nerdamer/Extra';

import { SYMBOLS } from './symbols';
import { containsMatrix,
    isVector,
    containsDerivative,
    containsTrig,
    containsSquareRoot,
    containsSciNotation,
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
    // console.log('postEvalObj: ' + postEvalObj);
    // console.log(postEvalObj);
    const noFurtherEval = preventFurtherEval(postEvalObj, useDecimals);
    const resultObject = noFurtherEval ? postEvalObj : postEvalObj.evaluate();
    const resultString = useDecimals ? resultObject.text('decimals') : resultObject.text('fractions');
    return resultString;
};

export const convertToLaTeXString = (expression, useDecimals=false, evalBeforeConversion=true, isInput=false) => {
    if (isInput) return convertInputToLaTeX(expression);
    else         return convertOutputToLaTeX(expression, useDecimals, evalBeforeConversion);
}
// stop it from rendering decimals as fractions
export const convertInputToLaTeX = (expression) => {
    let finalTeX;
    const matrixFound = containsMatrix(expression);
    const vectorFound = isVector(expression);
    const diffFound = containsDerivative(expression);
    if (matrixFound)        finalTeX = processMatrix(matrixFound, true);
    else if (diffFound)     finalTeX = processDerivative(expression);
    else if (vectorFound)   finalTeX = expression;
    else                    finalTeX = nerdamer.convertToLaTeX(expression);
    return finalTeX;
}

export const convertOutputToLaTeX = (expression, useDecimals, evalBeforeConversion) => {
    let finalTeX;
    const matrixFound = containsMatrix(expression);
    const vectorFound = isVector(expression);
    if (useDecimals) {
        if (matrixFound) finalTeX = processMatrix(matrixFound, false);
        else             finalTeX = processDecimalLaTeX(expression);
    } else {
        if (!evalBeforeConversion)  finalTeX = nerdamer(expression).toTeX();
        else if (matrixFound)       finalTeX = processMatrix(matrixFound, false);
        else if (vectorFound)       finalTeX = expression;
        else                        finalTeX = nerdamer.convertToLaTeX(expression);
    }
    finalTeX = postProcessLaTeXOutput(finalTeX);
    return finalTeX;
}

export const postProcessLaTeXOutput = (tempLaTeX) => {
  const sciNotationFound = containsSciNotation(tempLaTeX);
  if (!sciNotationFound)  return processSciNotation(tempLaTeX);
  else                    return tempLaTeX;
}

export const processDecimalLaTeX = (expression) => {
    const regex = new RegExp(/\.+/);
    if (expression.match(regex) != null) {
        let convertedLaTeX = expression.replace('*',' \\cdot ');
        return convertedLaTeX;
    } else return nerdamer(expression).toTeX();
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

const processMatrix = (matchObj, isInput) => {
    const {before, match, after} = matchObj;
    const convertedExp = (isInput && before.length === 0 && after.length === 0)
                        ? before + match + after
                        : before + nerdamer(match).toTeX() + after;
    return convertedExp;
}
// refactor function
export const processSciNotation = (laTeXExpression) => {
    const matchObj = containsSciNotation(laTeXExpression);
    if (!matchObj) return laTeXExpression;
    const {fracOpenBrack, ePlus, magnitude, closeBrack} = matchObj;
    const ePlusMagnitude = ePlus.concat(magnitude);
    let processedLaTeX = laTeXExpression;
    if (fracOpenBrack.length > 0) {
        processedLaTeX = processedLaTeX.replace(fracOpenBrack,'');
        processedLaTeX = processedLaTeX.replace(closeBrack,'');
        processedLaTeX = processedLaTeX.replace(ePlusMagnitude,`*{10}^{-${magnitude}}`);
    } else {
        processedLaTeX = processedLaTeX.replace(ePlusMagnitude,`*{10}^{${magnitude}}`);
    }
    return processedLaTeX;
}

export const processDerivative = (expression) => {
    const laTeXExpression = nerdamer.convertToLaTeX(expression);
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
