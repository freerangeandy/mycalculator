import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { InlineMath } from 'react-katex';

import { createData } from '../../shared/utility';
import tableClasses from './Display.css';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    marginBottom: theme.spacing(2),
    overflowY: 'auto', // for scrolling
    height: '30vh',  //  fixed height
  },
}));

function Display(props){
    const classes = useStyles();
    const {displayRows} = props;
    const tableEndRef = useRef(null);

    const scrollToBottom = () => {
      if (displayRows.length > 0) {
        tableEndRef.current.scrollIntoView({ behavior: "smooth" });
        console.log('scrolled');
      }
    };

    useEffect(scrollToBottom, [displayRows]);

    const formattedRows = displayRows.map(([input, output]) => createData(input, output));

    const headerRow = (
      <TableRow className={tableClasses.headerRow}>
        <TableCell className={tableClasses.head}>input</TableCell>
        <TableCell className={tableClasses.head} align="right">output</TableCell>
      </TableRow>
    );

    const tableRows = formattedRows.map((row, idx, arr) => {
      const tableRowAttribute = (idx === arr.length - 1) ? { ref: tableEndRef } : {};
      return (
        <TableRow {...tableRowAttribute} className={tableClasses.row} key={idx}>
          <TableCell className={tableClasses.cell} align="left"><InlineMath math={row.input}/></TableCell>
          <TableCell className={tableClasses.cell} align="right"><InlineMath math={row.output}/></TableCell>
        </TableRow>
      )
    });

    return (
       <Paper className={classes.paper}>
         <Table size="small">
           <TableHead>
             {headerRow}
           </TableHead>
           <TableBody>
             {tableRows}
           </TableBody>
         </Table>
       </Paper>
    )
};

export default Display;
