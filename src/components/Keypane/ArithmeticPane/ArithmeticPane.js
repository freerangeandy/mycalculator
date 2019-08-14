import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const ArithmeticButton = withStyles(theme => ({
  root: {
    borderRadius: 0,
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '13px',
    padding: '4px',
    border: '1px solid',
    lineHeight: '22.75px',
    width: '24px',
    borderColor: '#4c885a',
    backgroundColor: '#4caf50',
    '&:hover': {
      backgroundColor: '#388e3c',
      boxShadow: 'none',
    },
  },
}))(Button);

const gridValues = ['∕', '×', '—', '+']; // [/, *, -, +] &#x[unicode]

export default function ArithmeticPane (props) {
    const arithmeticButton = (val) => (
        <ArithmeticButton key={val} onClick={(event) => props.numberPressed(val)}>
            {val}
        </ArithmeticButton>
    );

    const arithmeticGroup = gridValues.map((val) => (
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
