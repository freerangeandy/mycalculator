import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles} from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import Grid from '@material-ui/core/Grid';

import CalcButton from '../../UI/CalcButton';
import { MODIFIERS } from '../../../shared/interpreter';

const borderColor = '#bdbdbd';
const backgroundColor = yellow[400];
const bgHoverColor = yellow[600];

const ModifierButton = withStyles(theme => ({
  root: {
    fontWeight: 600,
    minWidth: 48,
    borderColor: borderColor, //'#bdbdbd',
    backgroundColor: backgroundColor, //'#d9f253',
    '&:hover': {
      backgroundColor: bgHoverColor,
    },
  },
}))(CalcButton);

export default function ModifierPane (props) {
    const modifierButton = (val) => (
        <ModifierButton key={val} onClick={(event) => props.actionModifier(val)}>
            {val}
        </ModifierButton>
    );

    const modifierGroup = MODIFIERS.map((val) => (
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
              {modifierButton(val)}
            </ButtonGroup>
          </Grid>
        </Grid>
    ));

    return (
        <div>
            {modifierGroup}
        </div>
    );
};
