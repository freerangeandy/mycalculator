import React from 'react';
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
  label: {
      fontSize: '90%',
  },
  largeLabel: {
      fontSize: '110%',
  }
}));


const SwitchPopper = (props) => {
    const classes = useStyles();
    const switchSize = props.largeSize ? null : {size: "small"};
    const labelClass = props.largeSize ? classes.largeLabel : classes.label;
    return (
        <Paper className={classes.root}>
            <Grid component="label" container alignItems="center" justify="flex-end" spacing={0}>
              <Grid item className={labelClass}>frac</Grid>
              <Grid item>
                <Switch
                    {...switchSize}
                    checked={props.useDecimals}
                    onChange={props.toggleDecimals}
                    />
              </Grid>
              <Grid item className={labelClass}>dec</Grid>
            </Grid>
            <Grid component="label" container alignItems="center" justify="flex-end" spacing={0}>
              <Grid item className={labelClass}>rad</Grid>
              <Grid item>
                <Switch
                    {...switchSize}
                    checked={props.useDegrees}
                    onChange={props.toggleDegrees}
                    />
              </Grid>
              <Grid item className={labelClass}>deg</Grid>
            </Grid>
        </Paper>
    );
}

export default SwitchPopper;
