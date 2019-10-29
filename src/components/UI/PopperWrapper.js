import React, { useState } from 'react';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

import Auxy from '../../hoc/Auxy/Auxy';

const useStyles = makeStyles(theme => ({
  btnGroup: {
    boxShadow: 'none',
  }
}));

export default function PopperWrapper(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleClick = val => event => {
        // console.log('handleClick');
        setAnchorEl(event.currentTarget);
        setOpen(prev => !prev);
    };

    const handleClickAway = () => {
        // console.log('handleClickAway');
        setOpen(false);
    };

    const popperButton = (val) => {
        const PopperButton = props.buttonType;
        const btnStyle = props.styles || null;
        return (
            <PopperButton key={val} actionstyles={{...btnStyle}} onClick={handleClick(val)}>
                {props.children}
            </PopperButton>
        )
    };

    const popperContent = props.component(() => setOpen(prev => !prev));

    return (
        <Auxy>
            <Popper open={open} anchorEl={anchorEl} placement={props.placement} transition>
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <Fade {...TransitionProps} timeout={350}>
                            <div>
                                {popperContent}
                            </div>
                        </Fade>
                    </ClickAwayListener>
                 )}
            </Popper>
            <ButtonGroup
                variant="contained"
                size="small"
                className={classes.btnGroup}
                aria-label="popper button group">
                {popperButton(props.actionKey)}
            </ButtonGroup>
        </Auxy>
    )
}
