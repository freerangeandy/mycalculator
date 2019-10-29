// import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default function useDisplayStyles() {
  const useStyles = makeStyles(theme => ({
    root: {
      marginTop: theme.spacing(1),
      width: '100%',
      marginBottom: theme.spacing(1),
      overflowY: 'auto', // for scrolling
      // height: '27vh',  //  fixed height
    },
    row: {
      width: '100%',
    },
    cell: {
      '& div': {
        fontSize: '12px',
      },
    },
    cellTablet:  {
      '& div': {
        fontSize: '18px',
      },
    },
    head: {
      position: 'sticky',
      top: 0,
      backgroundColor: '#e0e0e0',
      fontWeight: 800,
      zIndex: 99,
      '& span': {
         fontWeight: 300,
       },
    },
    body: {
      height: '27vh',
    },
    headerRow: {
      borderBottom: '1px solid black',
    },
    headTablet: {
      fontSize: '110%',
      paddingTop: '2%',
      paddingBottom: '2%',
    },
    bodyLandscape: {
      height: '64vh',
    },
    bodyLandscapeTablet: {
      height: '45vh',
    },
  }));

  return useStyles();
}
