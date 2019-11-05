import React, { useRef, useEffect } from 'react';
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
import useDisplayStyles from './useDisplayStyles';

const IS_INPUT = true;
const IS_FALSE = false;

const createFormattedRowData = ([input, output, formatObj]) => {
  try {
      const latexEntry = convertToLaTeXString(input, formatObj.useDecimals, IS_INPUT);
      console.log(`input string: ${input} latexEntry:${latexEntry}`);
      const latexResult = convertToLaTeXString(output, formatObj.useDecimals, IS_FALSE);
      console.log(`result string: ${output} latexResult:${latexResult}`);
      return createData(latexEntry, latexResult);
  } catch (e) {
    console.log(e);
    return createData(input, output);
  }
}

const createTableRowComponents = (lastRowRef, classes, tabletSize) => (row, idx, arr) => {
  const fadeTime = 200;
  const isNewRow = idx === arr.length - 1;
  const tableRowAttribute = isNewRow ? { ref: lastRowRef } : {};
  const inlineInput = (<div><InlineMath math={row.input}/></div>);
  const inlineOutput = (<div><InlineMath math={row.output}/></div>);
  const inlineFadeInput = isNewRow ? (<Fade in={true} timeout={fadeTime}>{inlineInput}</Fade>) : inlineInput;
  const inlineFadeOutput = isNewRow ? (<Fade in={true} timeout={fadeTime}>{inlineOutput}</Fade>) : inlineOutput;

  const tableRowClass = tabletSize ? classes.cellTablet : classes.cell;
  return (
    <TableRow {...tableRowAttribute} className={classes.row} key={idx}>
      <TableCell className={tableRowClass} align="left">{inlineFadeInput}</TableCell>
      <TableCell className={tableRowClass} align="right">{inlineFadeOutput}</TableCell>
    </TableRow>
  )
}

function Display(props){
    const classes = useDisplayStyles();
    const {displayRows} = props;
    const tableEndRef = useRef(null);
    const {landscape, tabletSize} = props.mediaQueries;
    const scrollToBottom = () => {
      if (displayRows.length > 0) {
        tableEndRef.current.scrollIntoView({ behavior: "smooth" });
        console.log('scrolled');
      }
    };
    useEffect(scrollToBottom, [displayRows]);

    const degreesMode = props.useDegrees ? 'degrees' : 'radians';
    const decimalMode = props.useDecimals ? 'decimals' : 'fractions';
    const tableHeaderClass = tabletSize ? `${classes.head} ${classes.headTablet}` : classes.head;
    const headerRow = (
      <TableRow className={classes.headerRow}>
        <TableCell className={tableHeaderClass}>input <span>({degreesMode})</span></TableCell>
        <TableCell className={tableHeaderClass} align="right"><span>({decimalMode})</span> output</TableCell>
      </TableRow>
    );

    const formattedRows = displayRows.map(createFormattedRowData);
    const tableRows = formattedRows.map(createTableRowComponents(tableEndRef, classes, tabletSize));
    const tableBodyClass = landscape ?
                            tabletSize ?
                              classes.bodyLandscapeTablet
                              : classes.bodyLandscape
                            : classes.body;
    return (
       <Paper className={`${classes.root} ${tableBodyClass}`}>
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
