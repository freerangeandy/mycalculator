import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// dynamically size, for ipads, iphone5, galaxy s2
const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 0,
    boxShadow: 'none',
    textTransform: 'none',
    padding: '3px',
    border: '1px solid',
    lineHeight: '185%',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  iPad: {
      fontSize: '90%',
      minWidth: 63,
      maxWidth: 63,
      minHeight: 54,
  },
  phone: {
      fontSize: '90%',
      minWidth: 42,
      maxWidth: 42,
      minHeight: 36,
  },
  tinyPhone: {
      fontSize: '80%',
      minWidth: 36,
      maxWidth: 36,
      minHeight: 36,
  },
}));

function CalcButton(props) {
    const classes = useStyles();
    // const isIPad = useMediaQuery('(min-height: 1000px)');
    // const isLandscape = useMediaQuery('(orientation: landscape)');
    const isTinyPhone = useMediaQuery('(max-width: 350px)');
    const mediaClass = isTinyPhone ? classes.tinyPhone : classes.phone;
    return <Button {...props} className={`${classes.root} ${mediaClass}`} />;
}

export default CalcButton;
