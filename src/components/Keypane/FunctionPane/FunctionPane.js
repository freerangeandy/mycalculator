import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CalcButton from '../../UI/CalcButton';
import { FUNCTIONS, ALTERNATES } from '../../../shared/interpreter';
import { DISPLAY_SYMBOL } from '../../../shared/symbols.js';

const FunctionButton = withStyles(theme => ({
  root: {
    // width: '25%',
    minWidth: 48,
  },
}))(CalcButton);

export default function FunctionPane (props) {
    const functionButtonRows = (array) => array.map((val) => functionButton(val));

    const bgColor = props.altState ? "secondary" : "primary";
    const functionButton = (val) => {
        const funcVal = props.altState
                        ? (val in ALTERNATES
                            ? ALTERNATES[val]
                            : val)
                        : val;
        const displayVal = funcVal in DISPLAY_SYMBOL ? DISPLAY_SYMBOL[funcVal] : val;

        return (
            <FunctionButton color={bgColor} key={funcVal} onClick={(event) => props.buttonPressed(funcVal)}>
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
