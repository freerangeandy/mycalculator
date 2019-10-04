import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import { InlineMath } from 'react-katex';

import { createData } from '../../shared/utility';
import { convertToLaTeXString } from '../../shared/interpreter'
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

    const formattedRows = displayRows.map(([input, output, formatObj]) => {
      try {
          const latexEntry = convertToLaTeXString(input);
          console.log(`input string:${input} latexEntry:${latexEntry}`);
          const latexResult = formatObj.useDecimals ? output : convertToLaTeXString(output, formatObj.evalOutputPreLaTeX);
          console.log(`result string: ${output} latexResult:${latexResult}`);
          return createData(latexEntry, latexResult);
      } catch (e) {
        console.log(e);
        return createData(input, output);
      }
    });

    const headerRow = (
      <TableRow className={tableClasses.headerRow}>
        <TableCell className={tableClasses.head}>input</TableCell>
        <TableCell className={tableClasses.head} align="right">output</TableCell>
      </TableRow>
    );

    const tableRows = formattedRows.map((row, idx, arr) => {
      const isNewRow = idx === arr.length - 1;
      const tableRowAttribute = isNewRow ? { ref: tableEndRef } : {};
      const inlineInput = (<div><InlineMath math={row.input}/></div>);
      const inlineOutput = (<div><InlineMath math={row.output}/></div>);
      const inlineFadInput = isNewRow ? (<Fade in={true} timeout={200}>{inlineInput}</Fade>) : inlineInput;
      const inlineFadOutput = isNewRow ? (<Fade in={true} timeout={200}>{inlineOutput}</Fade>) : inlineOutput;

      return (
        <TableRow {...tableRowAttribute} className={tableClasses.row} key={idx}>
          <TableCell className={tableClasses.cell} align="left">{inlineFadInput}</TableCell>
          <TableCell className={tableClasses.cell} align="right">{inlineFadOutput}</TableCell>
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
