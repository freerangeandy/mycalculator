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
import staticClasses from './Display.css';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    width: '100%',
    marginBottom: theme.spacing(1),
    overflowY: 'auto', // for scrolling
    // height: '27vh',  //  fixed height
  },
  headTablet: {
    fontSize: '110%',
    paddingTop: '2%',
    paddingBottom: '2%',
  },
  bodyLandscape: {
    height: '32vh',
  },
  bodyLandscapeTablet: {
    height: '45vh',
  },
}));

const createFormattedRowData = ([input, output, formatObj]) => {
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
}

const createTableRowComponents = (lastRowRef, tabletSize) => (row, idx, arr) => {
  const fadeTime = 200;
  const isNewRow = idx === arr.length - 1;
  const tableRowAttribute = isNewRow ? { ref: lastRowRef } : {};
  const inlineInput = (<div><InlineMath math={row.input}/></div>);
  const inlineOutput = (<div><InlineMath math={row.output}/></div>);
  const inlineFadeInput = isNewRow ? (<Fade in={true} timeout={fadeTime}>{inlineInput}</Fade>) : inlineInput;
  const inlineFadeOutput = isNewRow ? (<Fade in={true} timeout={fadeTime}>{inlineOutput}</Fade>) : inlineOutput;

  const tableRowClass = tabletSize ? staticClasses.cellTablet : staticClasses.cell;
  return (
    <TableRow {...tableRowAttribute} className={staticClasses.row} key={idx}>
      <TableCell className={tableRowClass} align="left">{inlineFadeInput}</TableCell>
      <TableCell className={tableRowClass} align="right">{inlineFadeOutput}</TableCell>
    </TableRow>
  )
}

function Display(props){
    const classes = useStyles();
    const {displayRows} = props;
    const tableEndRef = useRef(null);
    const {landscape, normalSize, tabletSize} = props.mediaQueries;
    const scrollToBottom = () => {
      if (displayRows.length > 0) {
        tableEndRef.current.scrollIntoView({ behavior: "smooth" });
        console.log('scrolled');
      }
    };
    useEffect(scrollToBottom, [displayRows]);

    const degreesMode = props.useDegrees ? 'degrees' : 'radians';
    const decimalMode = props.useDecimals ? 'decimals' : 'fractions';
    const tableHeaderClass = tabletSize ? `${staticClasses.head} ${classes.headTablet}` : staticClasses.head;
    const headerRow = (
      <TableRow className={staticClasses.headerRow}>
        <TableCell className={tableHeaderClass}>input <span>({degreesMode})</span></TableCell>
        <TableCell className={tableHeaderClass} align="right"><span>({decimalMode})</span> output</TableCell>
      </TableRow>
    );

    const formattedRows = displayRows.map(createFormattedRowData);
    const tableRows = formattedRows.map(createTableRowComponents(tableEndRef, tabletSize));
    const tableBodyClass = landscape ?
                            tabletSize ?
                              classes.bodyLandscapeTablet
                              : classes.bodyLandscape
                            : staticClasses.body;
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
