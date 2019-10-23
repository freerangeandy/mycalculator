// import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { useTheme } from '@material-ui/core/styles';

const tinyLength = '370px';
const bigLength = '1000px';

export default function useMediaLayout() {
    // const theme = useTheme();
    const queries = {
      // isBreakpointXS: false,
      // landscape: false,
      // tinyWidth: false,
      // tinyHeight: false,
      // bigWidth: false,
      // bigHeight: false,
      keyPadBelow: false,
      tabletSize: false,
      tinySize: false,
      normalSize: true,
    };
    // const isBreakpointXS = useMediaQuery(theme.breakpoints.down('xs'));
    const tinyWidth = useMediaQuery(`(max-width: ${tinyLength})`);
    const tinyHeight = useMediaQuery(`(max-height: ${tinyLength})`);
    const bigWidth = useMediaQuery(`(min-width: ${bigLength})`);
    const bigHeight = useMediaQuery(`(min-height: ${bigLength})`);
    const landscape = useMediaQuery('(orientation: landscape)');
    queries.tabletSize = bigHeight || (bigWidth && landscape);
    queries.tinySize = tinyWidth || (tinyHeight && landscape);
    queries.normalSize = !queries.tabletSize && !queries.tinySize;
    // queries.keyPadBelow = (isBreakpointXS && !(queries.tinyHeight && queries.landscape))
    //                 || (!isBreakpointXS && queries.tabletSize && !queries.landscape);
    queries.keyPadBelow = !landscape;
    return queries;
};

// Material-UI isBreakpointXS
// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 960px
// lg, large: 1280px
// xl, extra-large: 1920px
