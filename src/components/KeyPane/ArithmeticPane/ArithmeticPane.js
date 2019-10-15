import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Grid from '@material-ui/core/Grid';

import CalcButton from '../../UI/CalcButton';
import { ARITHMETIC_OPERATORS } from '../../../shared/buttonLayout';

const borderColor = '#4c885a';
const backgroundColor = green[500];
const bgHoverColor = green[700];

const ArithmeticButton = withStyles(theme => ({
  root: {
    fontWeight: 600,
    borderColor: borderColor, //'#4c885a',
    backgroundColor: backgroundColor,//'#4caf50',
    '&:hover': {
      backgroundColor: bgHoverColor,//'#388e3c',
    },
  },
}))(CalcButton);

export default function ArithmeticPane (props) {
    const arithmeticButton = (obj) => {
        const displayVal = obj.display || obj.key;
        return (
            <ArithmeticButton key={obj.key} onClick={(event) => props.buttonPressed(obj)}>
                {displayVal}
            </ArithmeticButton>
        )
    };

    const arithmeticGroup = ARITHMETIC_OPERATORS.map((obj) => (
        <Grid key={`${obj.key}_grid`}
            container
            spacing={0}
            direction="column"
            alignItems="center">
          <Grid item>
            <ButtonGroup
                variant="contained"
                size="small"
                aria-label="small contained button group">
              {arithmeticButton(obj)}
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
