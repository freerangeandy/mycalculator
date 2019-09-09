import nerdamer from 'nerdamer/nerdamer.core';
import 'nerdamer/Algebra';
import 'nerdamer/Calculus';

export {
    ARITHMETIC_OPERATORS,
    NUM_PAD,
    FUNCTIONS,
    MODIFIERS,
    ACTIONS,
    ALTERNATES,
} from './buttonLayout';

export const evalExpression = (expression) => {
    const out = nerdamer(expression).evaluate();
    return out;
};

export const convertToLaTeXString = (expression) => {
    return nerdamer.convertToLaTeX(expression).toString();
}

export const setVariable = (varName, varValue) => {
    if (nerdamer.validVarName(varName)) {
        nerdamer.setVar(varName, varValue);
        return true;
    } else return false;
}
