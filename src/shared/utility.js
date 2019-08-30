export const updateObject = (oldObject, updatedProps) => {
    return {
        ...oldObject,
        ...updatedProps
    };
};

export const insertReplace = (insertVal, selection, targetStr) => {
    const currentEntryVal = targetStr;
    const [selectStart, selectEnd] = selection;

    const selectWidth = selectEnd - selectStart;
    const selectionShift = insertVal.toString().length - selectWidth;
    const newSelection = [selectEnd + selectionShift, selectEnd + selectionShift];

    const preInsert = selectStart > 0 ? currentEntryVal.slice(0, selectStart) : '';
    const postInsert = selectEnd < currentEntryVal.length ? currentEntryVal.slice(selectEnd) : '';
    const newEntryVal =  preInsert + insertVal + postInsert;

    const newState = {
      entryVal: newEntryVal,
      selection: newSelection,
    };
    
    return newState;
}
