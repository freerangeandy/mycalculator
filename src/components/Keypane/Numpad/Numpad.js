import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CalcButton from '../../UI/CalcButton';
import { NUM_PAD } from '../../../shared/interpreter';

const NumButton = withStyles(theme => ({
  root: {
    width: '30%',
    borderColor: '#bdbdbd',
    backgroundColor: '#e0e0e0',
    '&:hover': {
      backgroundColor: '#d5d5d5',
    },
  },
}))(CalcButton);

export default function NumPad (props) {
    const numButtonRows = (array) => array.map((val) => numButton(val));

    const numButton = (val) => (
        <NumButton key={val} onClick={(event) => props.numberPressed(val)}>
            {val}
        </NumButton>
    )

    const numpadGrid = NUM_PAD.map(([a, b, c]) => (
        <Grid key={a + b + c}
            container
            spacing={0}
            direction="column"
            alignItems="center">
          <Grid item>
            <ButtonGroup
                variant="contained"
                size="small"
                aria-label="small contained button group">
              {numButtonRows([a, b, c])}
            </ButtonGroup>
          </Grid>
        </Grid>
    ));

    return (
        <div>
            {numpadGrid}
        </div>
    );
}
