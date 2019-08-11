import React from 'react';

const display = (props) => (
    <div>
        <input
            type="input"
            disabled
            value={props.displayOutput} />
    </div>
);

export default display;
