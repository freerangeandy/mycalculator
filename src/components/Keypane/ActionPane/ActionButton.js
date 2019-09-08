// import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';

import CalcButton from '../../UI/CalcButton';

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

export default ActionButton;
