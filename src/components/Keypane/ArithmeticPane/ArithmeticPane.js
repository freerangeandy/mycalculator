import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Grid from '@material-ui/core/Grid';

import CalcButton from '../../UI/CalcButton';
import { ARITHMETIC_OPERATORS } from '../../../shared/interpreter';

const borderColor = '#4c885a';
const backgroundColor = green[500];
const bgHoverColor = green[700];

const ArithmeticButton = withStyles(theme => ({
  root: {
    fontWeight: 600,
    minWidth: 48,
    borderColor: borderColor, //'#4c885a',
    backgroundColor: backgroundColor,//'#4caf50',
    '&:hover': {
      backgroundColor: bgHoverColor,//'#388e3c',
    },
  },
}))(CalcButton);

export default function ArithmeticPane (props) {
    const arithmeticButton = (val) => (
        <ArithmeticButton key={val} onClick={(event) => props.buttonPressed(val)}>
            {val}
        </ArithmeticButton>
    );

    const arithmeticGroup = ARITHMETIC_OPERATORS.map((val) => (
        <Grid key={val}
            container
            spacing={0}
            direction="column"
            alignItems="center">
          <Grid item>
            <ButtonGroup
                variant="contained"
                size="small"
                aria-label="small contained button group">
              {arithmeticButton(val)}
            </ButtonGroup>
          </Grid>
        </Grid>
    ));

    return (
        <div>
            {arithmeticGroup}
        </div>
    );
};
