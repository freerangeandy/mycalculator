import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import blue from '@material-ui/core/colors/blue';

import NumPad from './NumPad/NumPad';
import ArithmeticPane from './ArithmeticPane/ArithmeticPane';
import FunctionPane from './FunctionPane/FunctionPane';
import ActionPane from './ActionPane/ActionPane';
import paneClasses from './KeyPane.css';
import { FUNCTIONS, MODIFIERS, ACTIONS, STAT_POP, MAT_POP } from '../../shared/buttonLayout';
import { SYMBOLS } from '../../shared/symbols';
import Auxy from '../../hoc/Auxy/Auxy';
import InputPopper from '../UI/InputPopper';
import SwitchPopper from '../UI/SwitchPopper';

const popBgColor = blue[600];
const popHoverColor = blue[700];

const colorOverride = {
    backgroundColor: popBgColor,
    '&:hover': {
      backgroundColor: popHoverColor,
    }
};

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    width: '125%',
    marginBottom: theme.spacing(2),
  },
}));

export default function KeyPane (props) {
    const classes = useStyles();
    // import these from another file
    const assignPopper = {
        component: (closeHandler) => (
            <InputPopper
                closeHandler={closeHandler}
                submitHandler={(varName) => props.secondaryAction(SYMBOLS.assign.key, varName)}
            />
        ),
        placement: 'left',
    };

    const modePopper = {
        component: (closeHandler) => (
            <SwitchPopper
                closeHandler={closeHandler}
                toggleDecimals={props.toggleDecimals}
                useDecimals={props.useDecimals}
                toggleDegrees={props.toggleDegrees}
                useDegrees={props.useDegrees}
            />
        ),
        placement: 'right',
    };

    const statPopper = {
        component: (closeHandler) => (
            <FunctionPane
                buttonPressed={props.buttonPressed}
                gridValues={STAT_POP}
                colorOverride={colorOverride}
            />
        ),
        placement: 'right',
    };

    const matPopper = {
        component: (closeHandler) => (
            <FunctionPane
                buttonPressed={props.buttonPressed}
                gridValues={MAT_POP}
                colorOverride={colorOverride}
            />
        ),
        placement: 'right',
    };

    const allPoppers = {
        [SYMBOLS.assign.key]: assignPopper,
        [SYMBOLS.mode.key]: modePopper,
        [SYMBOLS.stat.key]: statPopper,
        [SYMBOLS.mat.key]: matPopper,
    };

    const upperKeys = (
      <Auxy>
        <FunctionPane
            buttonPressed={props.buttonPressed}
            altState={props.altState}
            gridValues={FUNCTIONS}/>
        <ActionPane
            buttonPressed={props.actionModifier}
            columnValues={MODIFIERS}
            poppers={allPoppers}/>
      </Auxy>
    );

    const lowerKeys = (
      <Auxy>
        <ActionPane
            buttonPressed={props.secondaryAction}
            columnValues={ACTIONS}
            poppers={allPoppers} />
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
