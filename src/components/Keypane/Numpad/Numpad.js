import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// import Paper from '@material-ui/core/Paper';

import { createMuiTheme, withStyles, makeStyles } from '@material-ui/core/styles';
// import { ThemeProvider } from '@material-ui/styles';
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

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {},
});

export default function NumPad (props) {
    // const classes = useStyles();

    return (
        <div>
            <Grid container spacing={0} direction="column" alignItems="center">
              <Grid item>
                <ButtonGroup
                    variant="contained"
                    size="small"
                    aria-label="small contained button group">
                  <NumButton onClick={(event) => props.numberPressed(7)}>
                      7
                  </NumButton>
                  <NumButton onClick={(event) => props.numberPressed(8)}>
                      8
                  </NumButton>
                  <NumButton onClick={(event) => props.numberPressed(9)}>
                      9
                  </NumButton>
                </ButtonGroup>
              </Grid>
            </Grid>
            <Grid container spacing={0} direction="column" alignItems="center">
              <Grid item>
                <ButtonGroup
                    variant="contained"
                    size="small"
                    aria-label="small contained button group">
                  <NumButton onClick={(event) => props.numberPressed(4)}>
                    4
                  </NumButton>
                  <NumButton onClick={(event) => props.numberPressed(5)}>
                    5
                  </NumButton>
                  <NumButton onClick={(event) => props.numberPressed(6)}>
                    6
                  </NumButton>
                </ButtonGroup>
              </Grid>
            </Grid>
            <Grid container spacing={0} direction="column" alignItems="center">
              <Grid item>
                <ButtonGroup
                  variant="contained"
                  size="small"
                  aria-label="small contained button group">
                  <NumButton onClick={(event) => props.numberPressed(1)}>
                    1
                  </NumButton>
                  <NumButton onClick={(event) => props.numberPressed(2)}>
                    2
                  </NumButton>
                  <NumButton onClick={(event) => props.numberPressed(3)}>
                    3
                  </NumButton>
                </ButtonGroup>
              </Grid>
            </Grid>
            <Grid container spacing={0} direction="column" alignItems="center">
              <Grid item>
                <ButtonGroup
                  variant="contained"
                  size="small"
                  aria-label="small contained button group">
                  <NumButton onClick={(event) => props.numberPressed(0)}>
                    0
                  </NumButton>
                  <NumButton onClick={(event) => props.numberPressed('.')}>
                    .
                  </NumButton>
                  <NumButton onClick={(event) => props.numberPressed('—')}>
                    —
                  </NumButton>
                </ButtonGroup>
              </Grid>
            </Grid>
        </div>
    );
}
