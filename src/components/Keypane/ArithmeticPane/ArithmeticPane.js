import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CalcButton from '../../UI/CalcButton';
import { ARITHMETIC_OPERATORS, BUTTON_CONVERSION } from '../../../shared/interpreter';

const ArithmeticButton = withStyles(theme => ({
  root: {
    fontWeight: 600,
    width: '100%',
    borderColor: '#4c885a',
    backgroundColor: '#4caf50',
    '&:hover': {
      backgroundColor: '#388e3c',
    },
  },
}))(CalcButton);

export default function ArithmeticPane (props) {
    const arithmeticButton = (val) => (
        <ArithmeticButton key={val} onClick={(event) => {
            const convertedVal = val in BUTTON_CONVERSION ? BUTTON_CONVERSION[val] : val;
            return props.numberPressed(convertedVal);
        }}>
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
