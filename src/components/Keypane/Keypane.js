import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import NumPad from './NumPad/NumPad';
import ArithmeticPane from './ArithmeticPane/ArithmeticPane';
import FunctionPane from './FunctionPane/FunctionPane';
import ActionPane from './ActionPane/ActionPane';
import paneClasses from './KeyPane.css';
import { MODIFIERS, ACTIONS } from '../../shared/interpreter';
import PopperWrapper from '../UI/PopperWrapper';
import Auxy from '../../hoc/Auxy/Auxy';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

export default function KeyPane (props) {
    const classes = useStyles();

    const upperKeys = (
      <Auxy>
        <FunctionPane
            buttonPressed={props.buttonPressed}
            altState={props.altState} />
        <ActionPane
            actionModifier={props.actionModifier}
            columnValues={MODIFIERS} />
      </Auxy>
    );
    // <PopperWrapper
    //     actionModifier={props.secondaryAction}
    //     columnValues={ACTIONS}
    //     placement="left" />
    const lowerKeys = (
      <Auxy>
        <PopperWrapper
            actionModifier={props.secondaryAction}
            columnValues={ACTIONS}
            placement="left" />
        <NumPad numberPressed={props.buttonPressed} />
        <ArithmeticPane buttonPressed={props.buttonPressed} />
      </Auxy>
    );

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={0}>
                <Grid item xs={6} sm={12} className={paneClasses.upperKeys}>
                  {upperKeys}
                </Grid>
                <Grid item xs={6} sm={12} className={paneClasses.lowerKeys}>
                  {lowerKeys}
                </Grid>
            </Grid>
        </Paper>
    )
}
