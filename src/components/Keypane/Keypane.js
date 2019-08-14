import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import NumPad from './NumPad/NumPad';
import ArithmeticPane from './ArithmeticPane/ArithmeticPane';
import FunctionPane from './FunctionPane/FunctionPane';

const keypane = (props) => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper>
                    <FunctionPane />
                </Paper>
            </Grid>
            <Grid item xs={5}>
                <NumPad numberPressed={props.numberPressed}/>
            </Grid>
            <Grid item xs={2}>
                <Paper>
                    <ArithmeticPane />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default keypane;
