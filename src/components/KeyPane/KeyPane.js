import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
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
  root: {
    marginTop: theme.spacing(1),
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

const getAllPoppers = (props, altPlacement) => {
  const assignPopper = {
      component: (closeHandler) => (
          <InputPopper
              closeHandler={closeHandler}
              submitHandler={(varName) => props.secondaryAction(SYMBOLS.assign.key, varName)}
          />
      ),
      placement: altPlacement ? 'top-end' : 'left',
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
      placement: altPlacement ? 'bottom' : 'right',
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
      placement: altPlacement ? 'bottom' : 'right',
  };

  const matPopper = {
      component: (closeHandler) => (
          <FunctionPane
              buttonPressed={props.buttonPressed}
              gridValues={MAT_POP}
              colorOverride={colorOverride}
          />
      ),
      placement: altPlacement ? 'bottom' : 'right',
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
    const isBreakpointSM = useMediaQuery(theme.breakpoints.down('sm'));
    const allPoppers = getAllPoppers(props, isBreakpointSM);

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
            flexRow={isBreakpointSM}/>
      </Auxy>
    );

    const lowerKeys = (
      <Auxy>
        <ActionPane
            buttonPressed={props.secondaryAction}
            columnValues={ACTIONS}
            poppers={allPoppers}
            flexRow={isBreakpointSM}/>
        <Grid className={paneClasses.flexRow}>
          <NumPad numberPressed={props.buttonPressed} />
          <ArithmeticPane buttonPressed={props.buttonPressed} />
        </Grid>
      </Auxy>
    );

    const upperKeysClass = isBreakpointSM ? paneClasses.flexColumn : paneClasses.flexRow;
    const lowerKeysClass = isBreakpointSM ? paneClasses.flexColumn : paneClasses.flexRow;
    const containerJustify = isBreakpointSM ? "center" : "left";
    // paper shadow only for test purposes, can replace with div using same class
    return (
        <div className={classes.root}>
            <Grid container justify={containerJustify} spacing={0}>
                <Grid item className={upperKeysClass}>
                  {upperKeys}
                </Grid>
                <Grid item className={lowerKeysClass}>
                  {lowerKeys}
                </Grid>
            </Grid>
        </div>
    )
}
