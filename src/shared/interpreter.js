import nerdamer from 'nerdamer';

const BUTTON_CONVERSION = {
    
}


export const evaluate = (expression) => {
    const out = nerdamer(expression).evaluate();
    return out;
}
