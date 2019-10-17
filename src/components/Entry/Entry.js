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
    transform: 'rotate(270deg)'
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

function Entry(props) {
    const classes = useStyles();
    const entryPlaceholder = "evaluate this expression";
    const inputField = (
      <InputBase
          inputRef={props.entryRef}
          className={classes.input}
          placeholder={entryPlaceholder}
          onChange={(event) => props.entryChanged(event.target.value)}
          onSelect={(event) => props.selectionChanged(event.target.selectionStart, event.target.selectionEnd)}
          value={props.entryVal}/>
    );

    const iconButton = (
      <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="directions"
          onClick={() => props.enterPressed()} >
        <ForwardIcon />
      </IconButton>
    );

    return (
        <Paper className={classes.root}>
            {inputField}
            <Divider className={classes.divider} />
            {iconButton}
        </Paper>
    )
};

export default Entry;
