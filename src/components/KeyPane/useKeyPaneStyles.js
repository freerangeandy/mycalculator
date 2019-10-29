// import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default function useKeyPaneStyles() {
  const useStyles = makeStyles(theme => ({
    root: {
      marginTop: theme.spacing(1),
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    Enter: {
        backgroundColor: 'blue',
        border: 'none',
        color: 'white',
        outline: 'none',
        cursor: 'pointer',
        font: 'inherit',
        padding: '10px',
        margin: '10px',
        fontWeight: 'bold',
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
    },
  }));

  return useStyles();
}
