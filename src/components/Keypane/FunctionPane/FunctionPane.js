import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { FUNCTIONS_OTHERS, BUTTON_CONVERSION } from '../../../shared/interpreter';

const FunctionButton = withStyles(theme => ({
  root: {
    borderRadius: 0,
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '13px',
    padding: '4px',
    border: '1px solid',
    lineHeight: '22.75px',
    width: '25%',

    '&:hover': {

      boxShadow: 'none',
    },
  },
}))(Button);

export default function FunctionPane (props) {
    const functionButtonRows = (array) => array.map((val) => functionButton(val));

    const functionButton = (val) => (
        <FunctionButton key={val} onClick={(event) => {
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
