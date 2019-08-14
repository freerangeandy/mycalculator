import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const NumButton = withStyles(theme => ({
  root: {
    borderRadius: 0,
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '13px',
    padding: '4px',
    border: '1px solid',
    lineHeight: '22.75px',
    width: '24px',
    borderColor: '#bdbdbd',
    backgroundColor: '#e0e0e0',
    '&:hover': {
      backgroundColor: '#d5d5d5',
      boxShadow: 'none',
    },
  },
}))(Button);

const gridValues = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [0, '.', '( − )'],
];
// &#x[unicode]

export default function NumPad (props) {
    const numButtonRows = (array) => array.map((val) => numButton(val));

    const numButton = (val) => (
        <NumButton key={val} onClick={(event) => props.numberPressed(val)}>
            {val}
        </NumButton>
    )

    const numpadGrid = gridValues.map(([a, b, c]) => (
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
