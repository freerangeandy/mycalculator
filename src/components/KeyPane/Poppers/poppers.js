import React from 'react';
import blue from '@material-ui/core/colors/blue';
//not a react component
import FunctionPane from '../FunctionPane/FunctionPane';
import { STAT_POP, MAT_POP } from '../../../shared/buttonLayout';
import InputPopper from '../../UI/InputPopper';
import SwitchPopper from '../../UI/SwitchPopper';
import { SYMBOLS } from '../../../shared/symbols';

const popBgColor = blue[600];
const popHoverColor = blue[700];

const colorOverride = {
    backgroundColor: popBgColor,
    '&:hover': {
      backgroundColor: popHoverColor,
    }
};

export const getAllPoppers = (props) => {
  const {tinySize, normalSize, tabletSize, keyPadBelow: altPlacement} = props.mediaQueries;
  const assignPopper = {
      component: (closeHandler) => (
          <InputPopper
              closeHandler={closeHandler}
              submitHandler={(varName) => props.secondaryAction(SYMBOLS.assign.key, varName)}
          />
      ),
      placement: altPlacement ? 'top-end' : 'left',
  };

  const modePopper = {
      component: (closeHandler) => (
          <SwitchPopper
              closeHandler={closeHandler}
              toggleDecimals={props.toggleDecimals}
              useDecimals={props.useDecimals}
              toggleDegrees={props.toggleDegrees}
              useDegrees={props.useDegrees}
              largeSize={tabletSize}
          />
      ),
      placement: altPlacement ? 'bottom' : 'right',
      styles: {
          fontSize: tinySize ? '68%' : normalSize ? '75%' : null,
          paddingTop: tinySize ? '5px' : normalSize ? '3px' : null,
      },
  };

  const statPopper = {
      component: (closeHandler) => (
          <FunctionPane
              buttonPressed={props.buttonPressed}
              gridValues={STAT_POP}
              colorOverride={colorOverride}
          />
      ),
      placement: altPlacement ? 'bottom' : 'right',
  };

  const matPopper = {
      component: (closeHandler) => (
          <FunctionPane
              buttonPressed={props.buttonPressed}
              gridValues={MAT_POP}
              colorOverride={colorOverride}
          />
      ),
      placement: altPlacement ? 'bottom' : 'right',
  };

  return {
      [SYMBOLS.assign.key]: assignPopper,
      [SYMBOLS.mode.key]: modePopper,
      [SYMBOLS.stat.key]: statPopper,
      [SYMBOLS.mat.key]: matPopper,
  };
}
