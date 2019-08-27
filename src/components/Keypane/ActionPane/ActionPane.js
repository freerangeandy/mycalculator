import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles} from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import Grid from '@material-ui/core/Grid';

import CalcButton from '../../UI/CalcButton';
import { DISPLAY_SYMBOL } from '../../../shared/symbols.js';

const borderColor = '#bdbdbd';
const backgroundColor = amber[200];
const bgHoverColor = amber[500];

const ActionButton = withStyles(theme => ({
  root: {
    fontWeight: 600,
    minWidth: 48,
    borderColor: borderColor,// '#bdbdbd',
    backgroundColor: backgroundColor, //'#d9f253',
    '&:hover': {
      backgroundColor: bgHoverColor, //'#c6db4b',
    },
  },
}))(CalcButton);

export default function ActionPane (props) {
    const actionButton = (val) => {
        const displayVal = val in DISPLAY_SYMBOL ? DISPLAY_SYMBOL[val]: val;
        return (
            <ActionButton key={val} onClick={(event) => props.actionModifier(val)}>
                {displayVal}
            </ActionButton>
        )
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
