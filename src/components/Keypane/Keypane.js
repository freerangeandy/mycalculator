import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import NumPad from './NumPad/NumPad';
import ArithmeticPane from './ArithmeticPane/ArithmeticPane';
import FunctionPane from './FunctionPane/FunctionPane';
import paneClasses from './KeyPane.css';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

export default function KeyPane (props) {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={0}>
                <Grid item xs={6} sm={12} className={paneClasses.upperKeys}>
                    <FunctionPane numberPressed={props.numberPressed} />
                </Grid>
                <Grid item xs={6} sm={12} className={paneClasses.lowerKeys}>
                    <NumPad numberPressed={props.numberPressed} />
                    <ArithmeticPane numberPressed={props.numberPressed} />
                </Grid>
            </Grid>
        </Paper>
    )
}
