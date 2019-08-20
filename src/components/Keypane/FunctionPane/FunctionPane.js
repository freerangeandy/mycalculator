import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CalcButton from '../../UI/CalcButton';
import { FUNCTIONS_OTHERS, BUTTON_CONVERSION } from '../../../shared/interpreter';

const FunctionButton = withStyles(theme => ({
  root: {
    width: '25%',
  },
}))(CalcButton);

export default function FunctionPane (props) {
    const functionButtonRows = (array) => array.map((val) => functionButton(val));

    const functionButton = (val) => (
        <FunctionButton color="primary" key={val} onClick={(event) => {
                const convertedVal = val in BUTTON_CONVERSION ? BUTTON_CONVERSION[val] : val;
                return props.numberPressed(convertedVal);
            }}>
            {val}
        </FunctionButton>
    )

    const functionGrid = FUNCTIONS_OTHERS.map((row) => (
        <Grid key={row[0]}
            container
            spacing={0}
            direction="column"
            alignItems="center">
          <Grid item>
            <ButtonGroup
                variant="contained"
                size="small"
                aria-label="small contained button group">
              {functionButtonRows(row)}
            </ButtonGroup>
          </Grid>
        </Grid>
    ));

    return (
        <div>
            {functionGrid}
        </div>
    );
};
