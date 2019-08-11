import React from 'react';

const entry = (props) => (
    <div>
        <input
                type="input"
                value={props.entryVal}
                onChange={(event) => props.entryChanged(event)}/>
    </div>
);

export default entry;
