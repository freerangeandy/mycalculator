import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CalcButton from '../../UI/CalcButton';
import { NUM_PAD } from '../../../shared/interpreter';
// import { SYMBOLS } from '../../../shared/symbols.js';

const NumButton = withStyles(theme => ({
  root: {
    // width: '30%',
    minWidth: 48,
    fontSize: '110%',
    lineHeight: '135%',
    borderColor: '#bdbdbd',
    backgroundColor: '#e0e0e0',
    '&:hover': {
      backgroundColor: '#b8b8b8',
    },
  },
}))(CalcButton);

export default function NumPad (props) {
    const numButtonRows = (array) => array.map((obj) => numButton(obj));
    const numButton = (obj) => {
        const displayVal = obj.display || obj.key;
        return (
            <NumButton key={obj.key} onClick={(event) => props.numberPressed(obj)}>
                {displayVal}
            </NumButton>
        )
    }

    const numpadGrid = NUM_PAD.map(([a, b, c]) => (
        <Grid key={`${a.key}${b.key}${c.key}`}
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
