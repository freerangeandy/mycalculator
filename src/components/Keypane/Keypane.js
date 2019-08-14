import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import NumPad from './NumPad/NumPad';
import ArithmeticPane from './ArithmeticPane/ArithmeticPane';
import FunctionPane from './FunctionPane/FunctionPane';

import paneClasses from './KeyPane.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
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
            <div className={paneClasses.upperKeys}>
                <FunctionPane numberPressed={props.numberPressed} />
            </div>
            <div className={paneClasses.lowerKeys}>
                <NumPad numberPressed={props.numberPressed} />
                <ArithmeticPane numberPressed={props.numberPressed} />
            </div>
        </Paper>
    )
}
