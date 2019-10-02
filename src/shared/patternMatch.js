import { clearUndefined } from './utility';

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
  const regex = RegExp(/\b(sin|cos|tan)\(([^.]*(?=pi|π)[^.]*)\)$/);
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
