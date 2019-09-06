import React, { useRef, useState, useEffect } from 'react';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Entry from '../../components/Entry/Entry';
import Display from '../../components/Display/Display';
import KeyPane from '../../components/KeyPane/KeyPane';
import ErrorModal from '../../components/UI/ErrorModal';
import InfoSnackbar from '../../components/UI/InfoSnackbar';
import * as actions from '../../store/actions/index';
import Auxy from '../../hoc/Auxy/Auxy';

function Calculator (props) {
    const entryRef = useRef();
    const [errorOpen, setErrorOpen] = useState(false);

    useEffect(() => {
      if (props.errorMsg) setErrorOpen(true);
    },[props.errorMsg]);

    useEffect(() => {
      const [start, end] = props.currentSelection;
      entryRef.current.focus();
      entryRef.current.setSelectionRange(start,end);
    },[props.currentSelection]);

    const gridAttributes = {
      onKeyPress: (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          enterThenFocus();
        }
      },
    }

    const enterThenFocus = () => {
      props.onEvaluate();
      entryRef.current.focus();
    }

    const handleClose = () => {
      props.onSetError('','');
      setErrorOpen(false);
    }

    const errorModal = (
      <ErrorModal
        isOpen={errorOpen}
        handleClose={handleClose}
        errorName={props.errorName}
        errorMsg={props.errorMsg}/>
    );

    const entryDisplayPane = (
      <Auxy>
        <Display
            displayRows={props.currentDisplay}
            useDecimals={props.useDecimals}/>
        <Entry
            entryRef={entryRef}
            entryChanged={props.onTypedEntry}
            enterPressed={enterThenFocus}
            entryVal={props.currentEntry}
            selectionChanged={props.onChangeSelection}/>
      </Auxy>
    );

    const keyPane = (
      <KeyPane
          altState={props.altState}
          buttonPressed={props.onButtonEntry}
          actionModifier={props.onSetModifier}
          secondaryAction={props.onSetSecondaryAction}
          assignVariable={props.onAssignVariable} />
    );

    return (
        <Container>
            {errorModal}
            <Grid {...gridAttributes} container spacing={1}>
                <Grid item xs={12} sm={8}>
                  {entryDisplayPane}
                </Grid>
                <Grid item xs={12} sm={4}>
                  {keyPane}
                </Grid>
            </Grid>
            <InfoSnackbar
              showInfo={props.showSnackbar}
              closeInfo={props.onCloseSnackbar}
              message={props.snackbarMsg}/>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        currentEntry: state.entryDisplay.entryVal,
        currentSelection: state.entryDisplay.selection,
        currentDisplay: state.entryDisplay.displayRows,
        errorName: state.entryDisplay.errorName,
        errorMsg: state.entryDisplay.errorMsg,
        altState: state.keyPane.showAltButtons,
        useDecimals: state.entryDisplay.useDecimals,
        showSnackbar: state.entryDisplay.showSnackbar,
        snackbarMsg: state.entryDisplay.snackbarMsg,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onButtonEntry: (btnVal) => dispatch(actions.buttonEntry(btnVal)),
        onTypedEntry: (newEntry) => dispatch(actions.typedEntry(newEntry)),
        onEvaluate: () => dispatch(actions.evaluate()),
        onChangeSelection: (start, end) => dispatch(actions.changeSelection(start, end)),
        onSetError: (name, msg) => dispatch(actions.setError(name, msg)),
        onSetModifier: (btnVal) => dispatch(actions.setModifier(btnVal)),
        onSetSecondaryAction: (btnVal) => dispatch(actions.setSecondaryAction(btnVal)),
        onCloseSnackbar: () => dispatch(actions.closeSnackbar()),
        onAssignVariable: (varName) => dispatch(actions.assignVariable(varName)),
        // toggleDecimals: () => dispatch(actions.useDecimals()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
