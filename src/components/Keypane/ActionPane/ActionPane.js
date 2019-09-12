import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';

import ActionButton from './ActionButton';
import PopperWrapper from '../../UI/PopperWrapper';
import { SYMBOLS } from '../../../shared/symbols.js';

export default function ActionPane (props) {
    const actionButton = (obj) => {
        const displayVal = obj.display || obj.key;
        const actionComponent = props.poppers && obj.key === props.poppers.action.key
            ?   (<PopperWrapper {...props.poppers} buttonType={ActionButton}>
                    {displayVal}
                </PopperWrapper>)
            :   (<ActionButton key={obj.key} onClick={(event) => props.buttonPressed(obj)}>
                    {displayVal}
                </ActionButton>);
        return actionComponent;
    };

    const actionGroup = props.columnValues.map((obj) => (
        <Grid key={obj.key}
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
