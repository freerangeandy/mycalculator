import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CalcButton from '../../UI/CalcButton';
import { FUNCTIONS, ALTERNATES } from '../../../shared/interpreter';
import { SYMBOLS } from '../../../shared/symbols.js';

const FunctionButton = withStyles(theme => ({
  root: {
    // width: '25%',
    minWidth: 48,
  },
}))(CalcButton);

export default function FunctionPane (props) {
    const functionButtonRows = (array) => array.map((obj) => functionButton(obj));

    const bgColor = props.altState ? "secondary" : "primary";
    const functionButton = (obj) => {
        const funcObj = props.altState
                        ? (ALTERNATES[obj.key] || obj)
                        : obj;
        const displayVal = funcObj.display || funcObj.key;

        return (
            <FunctionButton color={bgColor} key={funcObj.key} onClick={(event) => props.buttonPressed(funcObj)}>
                {displayVal}
            </FunctionButton>
        )
    }

    const functionGrid = FUNCTIONS.map((row) => (
        <Grid key={row[0]}
            container
            spacing={0}
            direction="column"
            alignItems="center">
          <Grid item>
            <ButtonGroup
                variant="contained"
                size="small"
                aria-label="small contained button group">
              {functionButtonRows(row)}
            </ButtonGroup>
          </Grid>
        </Grid>
    ));

    return (
        <div>
            {functionGrid}
        </div>
    );
};
