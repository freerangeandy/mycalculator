// import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function useMediaLayout() {
    const theme = useTheme();
    const queries = {
      // isBreakpointXS: false,
      // landscape: false,
      tinyWidth: false,
      // tinyHeight: false,
      wideBreakpoint: false,
      tabletSize: false,
      keyPadBelow: false,
    };
    queries.isBreakpointXS = useMediaQuery(theme.breakpoints.down('xs'));
    queries.landscape = useMediaQuery('(orientation: landscape)');
    queries.tinyWidth = useMediaQuery('(max-width: 370px)');
    queries.tinyHeight = useMediaQuery('(max-height: 370px)');
    queries.wideBreakpoint = useMediaQuery('(min-width: 675px)');
    queries.tabletSize = useMediaQuery('(min-height: 1000px)');
    queries.keyPadBelow = queries.isBreakpointXS
                        && !(queries.tinyHeight & queries.landscape);
    return queries;
};
