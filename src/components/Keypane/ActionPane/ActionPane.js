import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';

import ActionButton from './ActionButton/ActionButton';
import PopperWrapper from '../../UI/PopperWrapper';
// import { SYMBOLS } from '../../../shared/symbols.js';

export default function ActionPane (props) {
    const actionButton = (obj) => {
        const displayVal = obj.display || obj.key;
        const actionComponent = props.poppers && obj.key === props.poppers.actionKey
            ?   (<PopperWrapper {...props.poppers} buttonType={ActionButton}>
                    {displayVal}
                </PopperWrapper>)
            :   (<ActionButton key={obj.key} onClick={(event) => props.buttonPressed(obj.key)}>
                    {displayVal}
                </ActionButton>);
        return actionComponent;
    };

    const actionGroup = props.columnValues.map((obj) => (
        <Grid key={`${obj.key}_grid`}
            container
            spacing={0}
            direction="column"
            alignItems="center">
          <Grid item>
            <ButtonGroup
                variant="contained"
                size="small"
                aria-label="small contained button group">
              {actionButton(obj)}
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
