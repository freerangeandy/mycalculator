import React from 'react';

import classes from './Keyboard.css';

const keyboard = (props) => (
    <div>
        <button
            onClick={props.entered}
            className={classes.Enter} >Square</button>
    </div>
);

export default keyboard;
