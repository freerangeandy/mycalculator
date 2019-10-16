// import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const CalcButton = withStyles(theme => ({
  root: {
    borderRadius: 0,
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '90%',
    padding: '3px',
    border: '1px solid',
    lineHeight: '185%',
    minWidth: 42,
    maxWidth: 42,
    '&:hover': {
      boxShadow: 'none',
    },
  },
}))(Button);

export default CalcButton;
