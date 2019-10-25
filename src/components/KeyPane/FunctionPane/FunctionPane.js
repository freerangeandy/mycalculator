import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CalcButton from '../../UI/CalcButton';
import { ALTERNATES } from '../../../shared/buttonLayout';

const FunctionButton = withStyles(theme => ({
  root: props => ({
    // width: '25%',
    ...props.fontsizeoverride,
    ...props.coloroverride,
  })
}))(CalcButton);

export default function FunctionPane (props) {
    const functionButtonRows = (array) => array.map((obj) => functionButton(obj));

    const bgColor = props.altState ? "secondary" : "primary";
    const functionButton = (obj) => {
        const funcObj = props.altState
                        ? (ALTERNATES[obj.key] || obj)
                        : obj;
        const displayVal = funcObj.display || funcObj.key;
        const fontOverride = funcObj.fontSize ? {fontSize: funcObj.fontSize} : null;
        return (
            <FunctionButton
                color={bgColor}
                coloroverride={{...props.colorOverride}}
                fontsizeoverride={{...fontOverride}}
                key={obj.key}
                onClick={(event) => props.buttonPressed(funcObj)}>
                {displayVal}
            </FunctionButton>
        )
    }

    const functionGrid = props.gridValues.map((row) => (
        <Grid key={`${row[0].key}_grid`}
            container
            spacing={0}
            direction="column">
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
