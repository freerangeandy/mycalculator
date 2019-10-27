import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import NumPad from './NumPad/NumPad';
import ArithmeticPane from './ArithmeticPane/ArithmeticPane';
import FunctionPane from './FunctionPane/FunctionPane';
import ActionPane from './ActionPane/ActionPane';
import paneClasses from './KeyPane.css';
import { FUNCTIONS, MODIFIERS, ACTIONS } from '../../shared/buttonLayout';
import Auxy from '../../hoc/Auxy/Auxy';
import { getAllPoppers } from './Poppers/poppers';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

export default function KeyPane (props) {
    const classes = useStyles();
    const {keyPadBelow} = props.mediaQueries;
    const allPoppers = getAllPoppers(props);

    const upperKeys = (
      <Auxy>
        <FunctionPane
            buttonPressed={props.buttonPressed}
            altState={props.altState}
            gridValues={FUNCTIONS}
            mediaQueries={props.mediaQueries}/>
        <ActionPane
            buttonPressed={props.actionModifier}
            columnValues={MODIFIERS}
            poppers={allPoppers}
            flexRow={keyPadBelow}/>
      </Auxy>
    );

    const lowerKeys = (
      <Auxy>
        <ActionPane
            buttonPressed={props.secondaryAction}
            columnValues={ACTIONS}
            poppers={allPoppers}
            flexRow={keyPadBelow}/>
        <Grid className={paneClasses.flexRow}>
          <NumPad numberPressed={props.buttonPressed} />
          <ArithmeticPane buttonPressed={props.buttonPressed} />
        </Grid>
      </Auxy>
    );

    const upperKeysClass = keyPadBelow ? paneClasses.flexColumn : paneClasses.flexRow;
    const lowerKeysClass = keyPadBelow ? paneClasses.flexColumn : paneClasses.flexRow;
    const containerJustify = keyPadBelow ? "center" : "flex-start";

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
