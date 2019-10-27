export const updateObject = (oldObject, updatedProps) => {
    return {
        ...oldObject,
        ...updatedProps
    };
};

export const insertSymbol = (curState, symbolObj) => {
  const { selection, entryVal } = curState;
  const [selectStart, selectEnd] = selection;

  const insertVal = symbolObj.converted || symbolObj.key;
  const prefix = symbolObj.prefix && charIsDigit(entryVal, selection[0]) ? symbolObj.prefix : '';
  const suffix = symbolObj.suffix || '';

  const selectWidth = selectEnd - selectStart;
  const selectionShift = prefix.length + insertVal.toString().length - selectWidth;
  const newSelection = [selectEnd + selectionShift, selectEnd + selectionShift];

  const preInsert = selectStart > 0 ? entryVal.slice(0, selectStart) : '';
  const postInsert = selectEnd < entryVal.length ? entryVal.slice(selectEnd) : '';
  const newEntryVal =  preInsert + prefix + insertVal + suffix + postInsert;

  const newState = {
    entryVal: newEntryVal,
    selection: newSelection,
  };

  return newState;
}

export const createData = (input, output) => {
  return { input, output };
}

export const charIsDigit = (str, cursorPos) => {
  return cursorPos === 0 ? false : str.charAt(cursorPos-1).match(/\d/);
}

export const clearUndefined = (obj) => {
    let clearedObj = {};
    for(let key in obj) clearedObj[key] = obj[key] || '';
    return clearedObj;
}

export const handleError = (e) => {
    const errorName = e.name;
    const errorMsg = e.message;
    console.log(errorName, errorMsg);
    return {
      errorName: errorName,
      errorMsg: errorMsg,
  };
}

export const getFontSize = (mediaQueries, condensed=false) => {
    const {tinySize, tabletSize} = mediaQueries;
    const currentMedia = tinySize ? 'tiny' : tabletSize ? 'tablet' : 'normal';
    return condensed ? CONDENSED_FONT_SIZES[currentMedia] : FONT_SIZES[currentMedia];
}

export const FONT_SIZES = {
    tiny: '80%',
    normal: '90%',
    tablet: '110%',
};

const CONDENSED_FONT_SIZES = {
    tiny: '73%',
    normal: '83%',
    tablet: '110%',
};
