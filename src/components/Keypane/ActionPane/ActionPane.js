import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles} from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import Grid from '@material-ui/core/Grid';

import CalcButton from '../../UI/CalcButton';
import { ACTIONS, BUTTON_CONVERSION } from '../../../shared/interpreter';

const borderColor = '#bdbdbd';
const backgroundColor = yellow[400];
const bgHoverColor = yellow[600];

const ActionButton = withStyles(theme => ({
  root: {
    fontWeight: 600,
    width: '100%',
    borderColor: borderColor,// '#bdbdbd',
    backgroundColor: backgroundColor, //'#d9f253',
    '&:hover': {
      backgroundColor: bgHoverColor, //'#c6db4b',
    },
  },
}))(CalcButton);

export default function ActionPane (props) {
    const actionButton = (val) => (
        <ActionButton key={val} onClick={(event) => {
            const convertedVal = val in BUTTON_CONVERSION ? BUTTON_CONVERSION[val] : val;
            return props.actionModifier(convertedVal);
        }}>
            {val}
        </ActionButton>
    );

    const actionGroup = ACTIONS.map((val) => (
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
