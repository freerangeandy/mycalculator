import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import tableClasses from './Display.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    marginBottom: theme.spacing(2),
    overflowY: 'auto', // for scrolling
    height: '30vh',  //  fixed height
  },
}));

function createData(input, output) {
  return { input, output };
}

function Display(props){
    const classes = useStyles();
    const displayRows = props.displayRows;
    // console.log(`number of rows: ${displayRows.length}`)

    const rows = displayRows.map(([input, output]) => {
        return createData(input, output);
    });

    return (
        <div className={classes.root}>
           <Paper className={classes.paper}>
             <Table size="small">
               <TableHead>
                 <TableRow className={tableClasses.headerRow}>
                   <TableCell className={tableClasses.head}>input</TableCell>
                   <TableCell className={tableClasses.head} align="right">output</TableCell>
                 </TableRow>
               </TableHead>
               <TableBody>
                 {rows.map((row, idx) => (
                   <TableRow className={tableClasses.row} key={idx}>
                     <TableCell className={tableClasses.cell} align="left">{row.input}</TableCell>
                     <TableCell className={tableClasses.cell} align="right">{row.output}</TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           </Paper>
         </div>
    )
};

export default Display;
