import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import blue from '@material-ui/core/colors/blue';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

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
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

const getAllPoppers = (props) => {
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
      styles: makeStyles(theme => ({
        btn: {
          fontSize: '75%',
          lineHeight: '220%'
        },
      }))
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

  return {
      [SYMBOLS.assign.key]: assignPopper,
      [SYMBOLS.mode.key]: modePopper,
      [SYMBOLS.stat.key]: statPopper,
      [SYMBOLS.mat.key]: matPopper,
  };
}

export default function KeyPane (props) {
    const classes = useStyles();
    const theme = useTheme();
    const isBreakpointXS = useMediaQuery(theme.breakpoints.down('xs'));
    const allPoppers = getAllPoppers(props);

    const upperKeys = (
      <Auxy>
        <FunctionPane
            buttonPressed={props.buttonPressed}
            altState={props.altState}
            gridValues={FUNCTIONS}/>
        <ActionPane
            buttonPressed={props.actionModifier}
            columnValues={MODIFIERS}
            poppers={allPoppers}
            flexRow={isBreakpointXS}/>
      </Auxy>
    );

    const lowerKeys = (
      <Auxy>
        <ActionPane
            buttonPressed={props.secondaryAction}
            columnValues={ACTIONS}
            poppers={allPoppers}
            flexRow={isBreakpointXS}/>
        <Grid className={paneClasses.flexRow}>
          <NumPad numberPressed={props.buttonPressed} />
          <ArithmeticPane buttonPressed={props.buttonPressed} />
        </Grid>
      </Auxy>
    );

    const upperKeysClass = isBreakpointXS ? paneClasses.flexColumn : paneClasses.flexRow;
    const lowerKeysClass = isBreakpointXS ? paneClasses.flexColumn : paneClasses.flexRow;

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={0}>
                <Grid item xs={6} sm={12} className={upperKeysClass}>
                  {upperKeys}
                </Grid>
                <Grid item xs={6} sm={12} className={lowerKeysClass}>
                  {lowerKeys}
                </Grid>
            </Grid>
        </Paper>
    )
}
