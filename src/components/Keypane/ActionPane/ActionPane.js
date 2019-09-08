import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';

import ActionButton from './ActionButton';
import PopperWrapper from '../../UI/PopperWrapper';
import { DISPLAY_SYMBOL } from '../../../shared/symbols.js';

export default function ActionPane (props) {
    const actionButton = (val) => {
        const displayVal = val in DISPLAY_SYMBOL ? DISPLAY_SYMBOL[val]: val;
        const actionComponent = props.poppers && val === props.poppers.action
            ?   (<PopperWrapper {...props.poppers} buttonType={ActionButton}>
                    {displayVal}
                </PopperWrapper>)
            :   (<ActionButton key={val} onClick={(event) => props.buttonPressed(val)}>
                    {displayVal}
                </ActionButton>);
        return actionComponent;
    };

    const actionGroup = props.columnValues.map((val) => (
        <Grid key={val}
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
            {actionGroup}
        </div>
    );
};
