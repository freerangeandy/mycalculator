import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ForwardIcon from '@material-ui/icons/Forward';

const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    margin: 'auto'
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

function Entry(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="square this number"
                onChange={(event) => props.entryChanged(event)}
                value={props.entryVal}
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        props.enterPressed(event);
                    }
                }}/>
            <Divider className={classes.divider} />
            <IconButton
                color="primary"
                className={classes.iconButton}
                aria-label="directions"
                onClick={(event) => props.enterPressed(event)} >
              <ForwardIcon />
            </IconButton>
        </Paper>
    )
};

export default Entry;
