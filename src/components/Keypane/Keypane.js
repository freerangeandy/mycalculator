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
import { SYMBOLS } from '../../shared/symbols';
import Auxy from '../../hoc/Auxy/Auxy';
import InputPopper from '../UI/InputPopper';
import SwitchPopper from '../UI/SwitchPopper';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

export default function KeyPane (props) {
    const classes = useStyles();

    const popperObj = {
        actionKey: SYMBOLS.assign.key,
        component: (closeHandler) => (
            <InputPopper
                closeHandler={closeHandler}
                submitHandler={(varName) => props.secondaryAction(SYMBOLS.assign.key, varName)}
            />
        ),
        placement: 'left',
    };

    const popperObj2 = {
        actionKey: SYMBOLS.mode.key,
        component: (closeHandler) => (
            <SwitchPopper
                closeHandler={closeHandler}
                toggleDecimals={props.toggleDecimals}
                useDecimals={props.useDecimals}
            />
        ),
        placement: 'right',
    };

    const upperKeys = (
      <Auxy>
        <FunctionPane
            buttonPressed={props.buttonPressed}
            altState={props.altState} />
        <ActionPane
            buttonPressed={props.actionModifier}
            columnValues={MODIFIERS}
            poppers={popperObj2}/>
      </Auxy>
    );

    const lowerKeys = (
      <Auxy>
        <ActionPane
            buttonPressed={props.secondaryAction}
            columnValues={ACTIONS}
            poppers={popperObj} />
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
