import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import amber from '@material-ui/core/colors/amber';

import InputPopper from './InputPopper';
import CalcButton from './CalcButton';
import { KEYS, DISPLAY_SYMBOL } from '../../shared/symbols.js';

const borderColor = '#bdbdbd';
const backgroundColor = amber[200];
const bgHoverColor = amber[500];

const ActionButton = withStyles(theme => ({
  root: {
    fontWeight: 600,
    minWidth: 48,
    borderColor: borderColor,// '#bdbdbd',
    backgroundColor: backgroundColor, //'#d9f253',
    '&:hover': {
      backgroundColor: bgHoverColor, //'#c6db4b',
    },
  },
}))(CalcButton);

export default function PopperWrapper(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClick = val => event => {
        console.log('handleClick');
        setAnchorEl(event.currentTarget);
        setOpen(prev => !prev);
    };

    const handleClickAway = () => {
        console.log('handleClickAway');
        setOpen(false);
    };

    const actionButton = (val) => {
        const displayVal = val in DISPLAY_SYMBOL ? DISPLAY_SYMBOL[val]: val;
        const clickAction = val === KEYS.assign
            ? handleClick(val)
            : (event) => props.actionModifier(val);

        return (
            <ActionButton key={val} onClick={clickAction}>
                {displayVal}
            </ActionButton>
        )
    };

    const actionGroup = props.columnValues.map((val) => (
        <Grid key={`${val}grid`}
            container
            spacing={0}
            direction="column"
            alignItems="center">
          <Grid item>
            <ButtonGroup
                variant="contained"
                size="small"
                aria-label="small contained button group">
              {actionButton(val)}
            </ButtonGroup>
          </Grid>
        </Grid>
    ));

    return (
        <div>
            <Popper open={open} anchorEl={anchorEl} placement={'left'} transition>
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <Fade {...TransitionProps} timeout={350}>
                            <InputPopper
                                closeHandler={() => setOpen(prev => !prev)}
                                submitHandler={props.assignVariable}
                                />
                        </Fade>
                    </ClickAwayListener>
                 )}
            </Popper>
            {actionGroup}
        </div>
    )
}
