import React, { useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';

import { FONT_SIZES } from '../../shared/utility';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'right',
    marginRight: 4,
  },
  iconButton: {
    transform: 'rotate(270deg)'
  },
  textField: {
    width: '50%',
    fontSize: FONT_SIZES.normal,
    backgroundColor: 'white',
    alignItems: 'right',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(0),
  },
  fontTablet: {
    fontSize: FONT_SIZES.tablet,
  },
  dense: {
    marginTop: theme.spacing(1),
  },
}));

const SubmitButton = (props) => (
    <IconButton
        color="primary"
        size="small"
        edge="end"
        className={props.iconClass}
        onClick={props.clickHandler}
        aria-label="directions">
      <GetAppIcon />
    </IconButton>
);

const InputPopper = (props) => {
    const classes = useStyles();
    const inputRef = useRef(null);

    const submitAndClose = (varName) => {
        props.closeHandler();
        return props.submitHandler(varName);
    }

    const submitVariable = (
        <SubmitButton
            clickHandler={() => submitAndClose(inputRef.current.value)}
            iconClass={classes.iconButton}/>
    );

    return (
        <div className={classes.root}>
            <OutlinedInput
                inputRef={inputRef}
                className={clsx(classes.textField, classes.dense, props.largeSize && classes.fontTablet)}
                autoFocus={true}
                defaultValue="x"
                margin="dense"
                endAdornment={submitVariable}
            />
        </div>
    )
}

export default InputPopper;
