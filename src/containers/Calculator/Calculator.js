import React from 'react';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Entry from '../../components/Entry/Entry';
import Display from '../../components/Display/Display';
import KeyPane from '../../components/KeyPane/KeyPane';
import * as actions from '../../store/actions/index';

function Calculator (props) {
    const gridAttributes = {
        onKeyPress: (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                props.onEnterPress();
            }
        },
    }
    return (
        <Container>
            <Grid {...gridAttributes} container spacing={1}>
                <Grid item xs={8}>
                    <Display displayRows={props.currentDisplay} />
                    <Entry
                        entryChanged={props.onEntryChange}
                        enterPressed={props.onEnterPress}
                        entryVal={props.currentEntry} />
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <KeyPane numberPressed={props.onButtonPress} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        currentEntry: state.entryVal,
        currentDisplay: state.displayRows,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onButtonPress: (btnVal) => dispatch(actions.buttonEntry(btnVal)),
        onEntryChange: (newEntry) => dispatch(actions.inputEntry(newEntry)),
        onEnterPress: () => dispatch(actions.evaluate()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
