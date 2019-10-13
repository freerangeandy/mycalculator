import React, { useState } from 'react';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Auxy from '../../hoc/Auxy/Auxy';

export default function PopperWrapper(props) {
    const classes = props.styles ? props.styles() : null;
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
        const btnStyle = classes ? classes.btn : null;
        return (
            <PopperButton key={val} className={btnStyle} onClick={handleClick(val)}>
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
                aria-label="popper button group">
                {popperButton(props.actionKey)}
            </ButtonGroup>
        </Auxy>
    )
}
