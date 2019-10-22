import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import useMediaLayout from '../../shared/useMediaLayout';
// dynamically size, for ipads, iphone5, galaxy s2
const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 0,
    boxShadow: 'none',
    textTransform: 'none',
    padding: '3px',
    border: '1px solid',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  iPad: {
      fontSize: '90%',
      minWidth: 63,
      maxWidth: 63,
      minHeight: 54,
    lineHeight: '185%',
  },
  phone: {
      fontSize: '90%',
      minWidth: 42,
      maxWidth: 42,
      minHeight: 36,
    lineHeight: '185%',
  },
  tinyPhone: {
      fontSize: '70%',
      minWidth: 36,
      maxWidth: 36,
      minHeight: 36,
    lineHeight: '165%',
  },
}));

function CalcButton(props) {
    const classes = useStyles();
    const mediaQueries = useMediaLayout();
    const {tinyWidth, tinyHeight, landscape} = mediaQueries;
    const needTinyButtons = tinyWidth || (tinyHeight && landscape);
    const mediaClass = needTinyButtons ? classes.tinyPhone : classes.phone;
    return <Button {...props} className={`${classes.root} ${mediaClass}`} />;
}

export default CalcButton;
