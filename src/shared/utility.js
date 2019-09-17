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

export const handleError = (e) => {
    const errorName = e.name;
    const errorMsg = e.message;
    console.log(errorName, errorMsg);
    return {
      errorName: errorName,
      errorMsg: errorMsg,
  };
}
