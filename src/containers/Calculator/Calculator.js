import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Entry from '../../components/Entry/Entry';
import Display from '../../components/Display/Display';
import KeyPane from '../../components/KeyPane/KeyPane';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Calculator() {
    const classes = useStyles();

    const [entryVal, setEntryVal] = useState("");
    const [displayRows, setDisplayRows] = useState([]);

    const onEntryChanged = (event) => {
        setEntryVal(event.target.value);
    }

    const submitEntry = (event) => {
        const currentEntry = entryVal;
        const squaredEntry = currentEntry * currentEntry; // arbitrary calculation
        setDisplayRows([...displayRows, [currentEntry, squaredEntry]]);
        setEntryVal('');
    }

    const onNumberPress = (val) => {
        const currentEntry = entryVal;
        const newEntry = currentEntry + val;
        setEntryVal(newEntry);
        //console.log(newEntry);
    }

    const gridProps = {
        onKeyPress: (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                submitEntry(event);
            }
        },
    }
    return (
        <Container>
            <Grid {...gridProps} container spacing={1}>
                <Grid item xs={8}>
                    <Display displayRows={displayRows} />
                    <Entry
                        entryChanged={onEntryChanged}
                        enterPressed={submitEntry}
                        entryVal={entryVal} />
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <KeyPane numberPressed={onNumberPress} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Calculator;
