import React, { useState } from 'react';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

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

    const popperButton = (val) => {
        const PopperButton = props.buttonType;
        return (
            <PopperButton key={val} onClick={handleClick(val)}>
                {props.children}
            </PopperButton>
        )
    };

    const popperContent = props.component(() => setOpen(prev => !prev));

    return (
        <div>
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
            {popperButton(props.actionKey)}
        </div>
    )
}
