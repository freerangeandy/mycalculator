import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
      marginLeft: 4,
      fontSize: '90%',
      fontWeight: 600,
      padding: '4px',
      border: '1px solid',
      lineHeight: '160%',
  },
}));


const SwitchPopper = (props) => {
    const classes = useStyles();
    const [state, setState] = useState({
        checkedB: false,
    });

    const handleChange = name => event => {
      setState({ ...state, [name]: event.target.checked });
    };

    return (
        <Paper className={classes.root}>
            <Grid component="label" container alignItems="center" spacing={0}>
              <Grid item>frac</Grid>
              <Grid item>
                <Switch
                    size="small"
                    checked={props.useDecimals}
                    onChange={props.toggleDecimals}
                    />
              </Grid>
              <Grid item>dec</Grid>
            </Grid>
            <Grid component="label" container alignItems="center" spacing={0}>
              <Grid item>rad</Grid>
              <Grid item>
                <Switch
                    size="small"
                    checked={props.useDegrees}
                    onChange={props.toggleDegrees}
                    value="checkedC"    />
              </Grid>
              <Grid item>deg</Grid>
            </Grid>
        </Paper>
    );
}

export default SwitchPopper;
