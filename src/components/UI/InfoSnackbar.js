import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles1 = makeStyles(theme => ({
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = InfoIcon;

  return (
    <SnackbarContent
      className={clsx(classes['info'], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function InfoSnackbar(props) {
  const classes = useStyles2();

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    props.closeInfo();
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.showInfo}
        autoHideDuration={6000}
        onClose={handleClose}
      >
      <MySnackbarContentWrapper
        onClose={handleClose}
        variant="info"
        className={classes.margin}
        message="This is an information message!"
      />
      </Snackbar>
    </div>
  );
}
