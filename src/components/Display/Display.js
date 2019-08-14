import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 450,
  },
}));

function createData(input, output) {
  return { input, output };
}

function Display(props){
    const classes = useStyles();
    const displayRows = props.displayRows;
    console.log(`number of rows: ${displayRows.length}`)
    const rows = displayRows.map(([input, output]) => {
        return createData(input, output);
    });

    return (
        <div className={classes.root}>
           <Paper className={classes.paper}>
             <Table
                 className={classes.table}
                 size="small">
               <TableHead>
                 <TableRow>
                   <TableCell>input</TableCell>
                   <TableCell align="right">output</TableCell>
                 </TableRow>
               </TableHead>
               <TableBody>
                 {rows.map((row, idx) => (
                   <TableRow key={idx}>
                     <TableCell align="left">{row.input}</TableCell>
                     <TableCell align="right">{row.output}</TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           </Paper>
         </div>

        // <div>
        //     <input
        //         type="input"
        //         disabled
        //         value={props.displayOutput} />
        // </div>
    )
};

export default Display;
