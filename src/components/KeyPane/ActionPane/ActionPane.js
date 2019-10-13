import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';

import ActionButton from './ActionButton/ActionButton';
import PopperWrapper from '../../UI/PopperWrapper';

export default function ActionPane (props) {
    const actionButton = (obj) => {
        const displayVal = obj.display || obj.key;
        const actionComponent = props.poppers && obj.key in props.poppers
            ?   (<PopperWrapper {...props.poppers[obj.key]} buttonType={ActionButton}>
                    {displayVal}
                </PopperWrapper>)
            :   (<ActionButton key={obj.key} onClick={(event) => props.buttonPressed(obj.key)}>
                    {displayVal}
                </ActionButton>);
        return actionComponent;
    };

    const gridDirection = props.flexRow ? "row" : "column";

    const actionGroup = props.columnValues.map((obj) => (
        <Grid key={`${obj.key}_grid`} item>
          <ButtonGroup
              variant="contained"
              size="small"
              aria-label="small contained button group">
            {actionButton(obj)}
          </ButtonGroup>
        </Grid>
    ));

    return (
      <Grid container
          wrap="nowrap"
          spacing={0}
          direction={gridDirection}
          alignItems="center">
          {actionGroup}
      </Grid>
    );
};
