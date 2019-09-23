import nerdamer from 'nerdamer/nerdamer.core';
import 'nerdamer/Algebra';
import 'nerdamer/Calculus';
import 'nerdamer/Extra';

import { SYMBOLS } from './symbols';

export const setConstant = (symbol, val) => {
    nerdamer.setConstant(symbol, val);
    const test = nerdamer(`${symbol}`).toString();
    console.log(test);
}

export const evalExpression = (expression, evaluate=false) => {
    const out = nerdamer(expression);
    if (evaluate) return out.evaluate();
    else return out.toString();
};

export const convertToLaTeXString = (expression, evaluate=true) => {
    if (evaluate) {
        return nerdamer(expression).toTeX();
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
    const regex = new RegExp(/^[^(]*matrix\(.*\)[^)]*$/g);
    return expression.match(regex) != null;
}

export const containsVector = (expression) => {
    const regex = new RegExp(/^[^(]*vector\(.*\)[^)]*$/g);
    return expression.match(regex) != null;
}
