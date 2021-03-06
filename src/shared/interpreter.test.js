import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';

import { evalExpression,
        convertToLaTeXString,
        convertInputToLaTeX,
        convertOutputToLaTeX,
        convertDegToRad,
        convertRadToDeg,
        convertAnglesToRad,
        processDecimalLaTeX,
        processSciNotation,
} from './interpreter.js';

configure({adapter: new Adapter()}); // adapt enzyme to react v16

const IS_INPUT = true;
const IS_FALSE = false;

describe('convertToLaTeXString', () => {
    it(`should render desired LaTeX with input of '2+2'`, () => {
        const inputString = '2+2';
        const inputLaTeX = '2 + 2';
        expect(convertToLaTeXString(inputString, null, IS_INPUT)).toEqual(inputLaTeX);
    });

    it(`should render desired LaTeX with input or output of 'x^4'`, () => {
        const inputString = 'x^4';
        const inputLaTeX = '{x}^{4}';
        const outputString = inputString;
        const outputLaTeX = inputLaTeX;
        expect(convertToLaTeXString(inputString, null, IS_INPUT)).toEqual(inputLaTeX);
        expect(convertToLaTeXString(outputString, null, IS_FALSE)).toEqual(outputLaTeX);
    });

    it(`should render desired LaTeX with input or output of '500/9'`, () => {
        const inputString = '500/9';
        const inputLaTeX = '\\frac{500}{9}';
        const outputString = inputString;
        const outputLaTeX = inputLaTeX;
        expect(convertToLaTeXString(inputString, null, IS_INPUT)).toEqual(inputLaTeX);
        expect(convertToLaTeXString(outputString, null, IS_FALSE)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX with input of 'cos(pi)'`, () => {
        const inputString = 'cos(π)';
        const inputLaTeX = '\\mathrm{cos}\\left(π\\right)';
        expect(convertToLaTeXString(inputString, null, IS_INPUT)).toEqual(inputLaTeX);
    });

    it(`should match desired LaTeX with input or output of 'matrix([1,0],[2,2])'`, () => {
        const inputString = 'matrix([1,0],[2,2])';
        const inputLaTeX = 'matrix([1,0],[2,2])';
        const outputString = inputString;
        const outputLaTeX = '\\begin{vmatrix}1 & 0 \\cr 2 & 2\\end{vmatrix}';
        expect(convertToLaTeXString(inputString, null, IS_INPUT)).toEqual(inputLaTeX);
        expect(convertToLaTeXString(outputString, null, IS_FALSE)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX with input of 'determinant(matrix([1,0],[2,2]))'`, () => {
        const inputString = 'determinant(matrix([1,0],[2,2]))';
        const inputLaTeX = 'determinant(\\begin{vmatrix}1 & 0 \\cr 2 & 2\\end{vmatrix})';
        expect(convertToLaTeXString(inputString, null, IS_INPUT)).toEqual(inputLaTeX);
    });
    //vector functions (dot, cross) with '[...]' as arguments crash the laTeX conversion
    //MUST CONVERT CROSS(A, B) -> AxB manually
    xit(`should match desired LaTeX string given input of 'cross([1,2,3], [4,5,6])'`, () => {
        const inputString = 'cross([1,2,3], [4,5,6])';
        const outputLaTeX = '[1, 2, 3]\\times[4, 5, 6]';
        expect(convertToLaTeXString(inputString)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX with input of 'integrate(3*x^2,x)'`, () => {
        const inputString = 'integrate(3*x^2,x)';
        const inputLaTeX = '\\int {3 \\cdot {x}^{2}}\\, dx';
        expect(convertToLaTeXString(inputString, null, IS_INPUT)).toEqual(inputLaTeX);
    });

    it(`should match desired LaTeX with input of 'diff(x^2,x,1)'`, () => {
        const inputString = 'diff(x^2,x,1)';
        const inputLaTeX = '\\frac{d}{d x}\\left({{x}^{2}}\\right)';
        expect(convertToLaTeXString(inputString, null, IS_INPUT)).toEqual(inputLaTeX);
    });

    it(`should match desired LaTeX with input or output of '[1,3,-2]'`, () => {
        const inputString = '[1,3,-2]';
        const inputLaTeX = '[1,3,-2]';
        const outputString = inputString;
        const outputLaTeX = inputLaTeX;
        expect(convertToLaTeXString(inputString, null, IS_INPUT)).toEqual(inputLaTeX);
        expect(convertToLaTeXString(outputString, null, IS_FALSE)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX with input of 'cross(vector(3,-2,0), vector(2,2,0))'`, () => {
        const inputString = 'cross(vector(3,-2,0), vector(2,2,0))';
        const inputLaTeX = '\\mathrm{cross}\\left(\\mathrm{vector}\\left(3,-2,0\\right),\\mathrm{vector}\\left(2,2,0\\right)\\right)';
        expect(convertToLaTeXString(inputString, null, IS_INPUT)).toEqual(inputLaTeX);
    });

    it(`should match desired LaTeX with input or output of 'sqrt(3)^(-1)'`, () => {
        const inputString = 'sqrt(3)^(-1)';
        const inputLaTeX = '{\\sqrt{3}}^{\\left(- 1\\right)}';
        const outputString = inputString;
        const outputLaTeX = '\\frac{1}{\\sqrt{3}}';
        expect(convertToLaTeXString(inputString, null, IS_INPUT)).toEqual(inputLaTeX);
        expect(convertToLaTeXString(outputString, null, IS_FALSE)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX with input or output of '(1/2)*sqrt(3)'`, () => {
        const inputString = '(1/2)*sqrt(3)';
        const inputLaTeX = '\\left(\\frac{1}{2}\\right) \\cdot \\sqrt{3}';
        const outputString = inputString;
        const outputLaTeX = '\\frac{\\sqrt{3}}{2}';
        expect(convertToLaTeXString(inputString, null, IS_INPUT)).toEqual(inputLaTeX);
        expect(convertToLaTeXString(outputString, null, IS_FALSE)).toEqual(outputLaTeX);
    });
});

describe('convertInputToLaTeX', () => {
    it(`should render desired LaTeX given input string of '2+2'`, () => {
        const inputString = '2+2';
        const inputLaTeX = '2 + 2';
        expect(convertInputToLaTeX(inputString)).toEqual(inputLaTeX);
    });

    it(`should render desired LaTeX given input string of 'x^4'`, () => {
        const inputString = 'x^4';
        const inputLaTeX = '{x}^{4}';
        expect(convertInputToLaTeX(inputString)).toEqual(inputLaTeX);
    });

    it(`should render desired LaTeX given input string of '500/10'`, () => {
        const inputString = '500/10';
        const inputLaTeX = '\\frac{500}{10}';
        expect(convertInputToLaTeX(inputString)).toEqual(inputLaTeX);
    });

    it(`should render desired LaTeX given input string of '49.5'`, () => {
        const inputString = '49.5';
        const inputLaTeX = '49.5';
        expect(convertInputToLaTeX(inputString)).toEqual(inputLaTeX);
    });

    it(`should render desired LaTeX given input string of '49.5*3.1^3'`, () => {
        const inputString = '49.5*3.1^3';
        const inputLaTeX = '49.5 \\cdot 3.1^3';
        expect(convertInputToLaTeX(inputString)).toEqual(inputLaTeX);
    });

    it(`should render desired LaTeX given input string of 'cos(33.3)'`, () => {
        const inputString = 'cos(33.3)';
        const inputLaTeX = '\\mathrm{cos}(33.3)';
        expect(convertInputToLaTeX(inputString)).toEqual(inputLaTeX);
    });

    it(`should render desired LaTeX given input string of 'sin(43.1) + tan(-23.7)'`, () => {
        const inputString = 'sin(43.1) + tan(-23.7)';
        const inputLaTeX = '\\mathrm{sin}(43.1) + \\mathrm{tan}(-23.7)';
        expect(convertInputToLaTeX(inputString)).toEqual(inputLaTeX);
    });

    it(`should render desired LaTeX given input string of 'cos(π)'`, () => {
        const inputString = 'cos(π)';
        const inputLaTeX = '\\mathrm{cos}\\left(π\\right)';
        expect(convertInputToLaTeX(inputString)).toEqual(inputLaTeX);
    });

    it(`should render desired LaTeX given input string of 'matrix([1,0],[2,2])'`, () => {
        const inputString = 'matrix([1,0],[2,2])';
        const inputLaTeX = 'matrix([1,0],[2,2])';
        expect(convertInputToLaTeX(inputString)).toEqual(inputLaTeX);
    });

    it(`should render desired LaTeX given input string of 'determinant(matrix([1,0],[2,2]))'`, () => {
        const inputString = 'determinant(matrix([1,0],[2,2]))';
        const inputLaTeX = 'determinant(\\begin{vmatrix}1 & 0 \\cr 2 & 2\\end{vmatrix})';
        expect(convertInputToLaTeX(inputString)).toEqual(inputLaTeX);
    });

    it(`should render desired LaTeX given input string of 'integrate(3*x^2,x)'`, () => {
        const inputString = 'integrate(3*x^2,x)';
        const inputLaTeX = '\\int {3 \\cdot {x}^{2}}\\, dx';
        expect(convertInputToLaTeX(inputString)).toEqual(inputLaTeX);
    });

    it(`should render desired LaTeX given input string of 'diff(x^2,x,1)'`, () => {
        const inputString = 'diff(x^2,x,1)';
        const inputLaTeX = '\\frac{d}{d x}\\left({{x}^{2}}\\right)';
        expect(convertInputToLaTeX(inputString)).toEqual(inputLaTeX);
    });

    it(`should render desired LaTeX given input string of '[1,3,-2]'`, () => {
        const inputString = '[1,3,-2]';
        const inputLaTeX = '[1,3,-2]';
        expect(convertInputToLaTeX(inputString)).toEqual(inputLaTeX);
    });

    it(`should render desired LaTeX given input string of 'cross(vector(3,-2,0), vector(2,2,0))'`, () => {
        const inputString = 'cross(vector(3,-2,0), vector(2,2,0))';
        const inputLaTeX = '\\mathrm{cross}\\left(\\mathrm{vector}\\left(3,-2,0\\right),\\mathrm{vector}\\left(2,2,0\\right)\\right)';
        expect(convertToLaTeXString(inputString)).toEqual(inputLaTeX);
    });
});

describe('convertOutputToLaTeX', () => {
    it(`should render desired LaTeX given output string of 'x^4'`, () => {
        const outputString = 'x^4';
        const outputLaTeX = '{x}^{4}';
        const useDecimals = false;
        expect(convertOutputToLaTeX(outputString, useDecimals)).toEqual(outputLaTeX);
    });

    it(`should render desired LaTeX given output string of '500/499' (no decimals)`, () => {
        const outputString = '500/499';
        const outputLaTeX = '\\frac{500}{499}';
        const useDecimals = false;
        expect(convertOutputToLaTeX(outputString, useDecimals)).toEqual(outputLaTeX);
    });

    it(`should render desired LaTeX given output string of '2.7027027027027026' (decimals)`, () => {
        const outputString = '2.7027027027027026';
        const outputLaTeX = '2.7027027027027026';
        const useDecimals = true;
        expect(convertOutputToLaTeX(outputString, useDecimals)).toEqual(outputLaTeX);
    });

    it(`should render desired LaTeX given input string of '[1,3,-2]'`, () => {
        const outputString = '[1,3,-2]';
        const outputLaTeX = '[1,3,-2]';
        const useDecimals = false;
        expect(convertOutputToLaTeX(outputString, useDecimals)).toEqual(outputLaTeX);
    });

    it(`should render desired LaTeX given output string of 'matrix([1,0],[2,2])' (no decimals)`, () => {
        const outputString = 'matrix([1,0],[2,2])';
        const outputLaTeX = '\\begin{vmatrix}1 & 0 \\cr 2 & 2\\end{vmatrix}';
        const useDecimals = false;
        expect(convertOutputToLaTeX(outputString, useDecimals)).toEqual(outputLaTeX);
    });

    it(`should render desired LaTeX given output string of 'matrix([1,0],[2,2])' (decimals)`, () => {
        const outputString = 'matrix([1,0],[2,2])';
        const outputLaTeX = '\\begin{vmatrix}1 & 0 \\cr 2 & 2\\end{vmatrix}';
        const useDecimals = true;
        expect(convertOutputToLaTeX(outputString, useDecimals)).toEqual(outputLaTeX);
    });

    it(`should render desired LaTeX given output string of 'sqrt(3)^(-1)'`, () => {
        const outputString = 'sqrt(3)^(-1)';
        const outputLaTeX = '\\frac{1}{\\sqrt{3}}';
        const useDecimals = false;
        expect(convertOutputToLaTeX(outputString, useDecimals)).toEqual(outputLaTeX);
    });

    it(`should render desired LaTeX given output string of '(1/2)*sqrt(3)'`, () => {
        const outputString = '(1/2)*sqrt(3)';
        const outputLaTeX = '\\frac{\\sqrt{3}}{2}';
        const useDecimals = false;
        expect(convertOutputToLaTeX(outputString, useDecimals)).toEqual(outputLaTeX);
    });
});

describe('evalExpression', () => {
    it(`should match desired output string given input of '2 + 2'`, () => {
        const inputString = '2 + 2';
        const outputString = '4';
        expect(evalExpression(inputString)).toEqual(outputString);
    });

    it(`should match desired output string given input of 'cos(pi)'`, () => {
        const inputString = 'cos(pi)';
        const outputString = '-1';
        expect(evalExpression(inputString)).toEqual(outputString);
    });

    it(`should match desired output string given input of 'matrix([1,0],[2,2])'`, () => {
        const inputString = 'matrix([1,0],[2,2])';
        const outputString = 'matrix([1,0],[2,2])';
        expect(evalExpression(inputString)).toEqual(outputString);
    });

    it(`should match desired output string given input of 'cross([1,2,3], [4,5,6])'`, () => {
        const inputString = 'cross([1,2,3], [4,5,6])';
        const outputString = '[-3,6,-3]';
        expect(evalExpression(inputString)).toEqual(outputString);
    });

    it(`should match desired output string given input of 'vector(1,3,-2)'`, () => {
        const inputString = 'vector(1,3,-2)';
        const outputString = '[1,3,-2]';
        expect(evalExpression(inputString)).toEqual(outputString);
    });

    it(`should match desired output string given input of 'invert(matrix([1,0],[2,2]))'`, () => {
        const inputString = 'invert(matrix([1,0],[2,2]))';
        const outputString = 'matrix([1,0],[-1,1/2])';
        expect(evalExpression(inputString)).toEqual(outputString);
    });
});

describe('convertDegToRad', () => {
    it(`should convert 0 degrees to 0 radians`, () => {
        const inputString = '0';
        const outputString = '0';
        expect(convertDegToRad(inputString)).toEqual(outputString);
    });

    it(`should convert 360 degrees to 2pi radians`, () => {
        const inputString = '360';
        const outputString = '2 * pi';
        expect(convertDegToRad(inputString)).toEqual(outputString);
    });

    it(`should convert 90 degrees to pi/2 radians`, () => {
        const inputString = '90';
        const outputString = '1/2 * pi';
        expect(convertDegToRad(inputString)).toEqual(outputString);
    });

    it(`should convert 30 degrees to pi/6 radians`, () => {
        const inputString = '30';
        const outputString = '1/6 * pi';
        expect(convertDegToRad(inputString)).toEqual(outputString);
    });

    it(`should convert -45 degrees to -pi/4 radians`, () => {
        const inputString = '-45';
        const outputString = '-1/4 * pi';
        expect(convertDegToRad(inputString)).toEqual(outputString);
    });

    it(`should convert (non-standard) 155 degrees`, () => {
        const inputString = '155.21';
        const outputString = '2.7089255320203987';
        expect(convertDegToRad(inputString)).toEqual(outputString);
    });

    it(`should convert (non-standard) -39 degrees`, () => {
        const inputString = '-39.81';
        const outputString = '-0.6948155752189425';
        expect(convertDegToRad(inputString)).toEqual(outputString);
    });

});

describe('convertRadToDeg', () => {
    it(`should convert 0 radians to 0 degrees`, () => {
        const inputString = '0';
        const outputString = '0';
        expect(convertRadToDeg(inputString)).toEqual(outputString);
    });

    it(`should convert 2pi radians to 360 degrees`, () => {
        const inputString = '2 * pi';
        const outputString = '360';
        expect(convertRadToDeg(inputString)).toEqual(outputString);
    });

    it(`should convert pi/2 radians to 90 degrees`, () => {
        const inputString = '1/2 * pi';
        const outputString = '90';
        expect(convertRadToDeg(inputString)).toEqual(outputString);
    });

    it(`should convert pi/6 radians to 30 degrees `, () => {
        const inputString = '1/6 * pi';
        const outputString = '30';
        expect(convertRadToDeg(inputString)).toEqual(outputString);
    });

    it(`should convert -pi/4 radians to 45 degrees `, () => {
        const inputString = '-1/4 * pi';
        const outputString = '-45';
        expect(convertRadToDeg(inputString)).toEqual(outputString);
    });

    it(`should convert (non-standard) 4 radians`, () => {
        const inputString = '4';
        const outputString = '229.18311805232932';
        expect(convertRadToDeg(inputString)).toEqual(outputString);
    });

    it(`should convert (non-standard) -2 radians`, () => {
        const inputString = '-2';
        const outputString = '-114.59155902616466';
        expect(convertRadToDeg(inputString)).toEqual(outputString);
    });
});

describe('convertAnglesToRad', () => {
    it(`should let expression without trig functions pass through`, () => {
        const inputString = '6*log(150) + 3/5 - diff(3*x, x)';
        expect(convertAnglesToRad(inputString)).toEqual(inputString);
    });

    it(`should let expression with inverse trig functions pass through`, () => {
        const inputString = 'atan(3) - 4 + acos(-0.)';
        expect(convertAnglesToRad(inputString)).toEqual(inputString);
    });

    it(`should convert '6*sin(45) + 0.5' (degrees) to '6 * sin(1/4 * pi) + 0.5' (radians)`, () => {
        const inputString = '6*sin(45) + 0.5';
        const outputString = '6*sin(1/4 * pi) + 0.5';
        expect(convertAnglesToRad(inputString)).toEqual(outputString);
    });

    it(`should convert 'sin(30) / cos(60)' (degrees) to 'sin(1/6 * pi) / cos(1/3 * pi)' (radians)`, () => {
        const inputString = 'sin(30) / cos(60)';
        const outputString = 'sin(1/6 * pi) / cos(1/3 * pi)';
        expect(convertAnglesToRad(inputString)).toEqual(outputString);
    });

    it(`should convert 'tan(135) - 8*cos(315)' (degrees) to 'tan(3/4 * pi) - 8*cos(5/3 * pi)' (radians)`, () => {
        const inputString = 'tan(135) - 8*cos(300)';
        const outputString = 'tan(3/4 * pi) - 8*cos(5/3 * pi)';
        expect(convertAnglesToRad(inputString)).toEqual(outputString);
    });

    it(`should convert pi to 3.14159... before converting argument to radians`, () => {
        const inputString = 'cos(pi/3)';
        const outputString = 'cos(0.018277045187202502)';
        expect(convertAnglesToRad(inputString)).toEqual(outputString);
    });
});

describe('processDecimalLaTeX', () => {
    it(`should leave '0.234' as decimals`, () => {
        const inputString = '0.234';
        const outputString = '0.234';
        expect(processDecimalLaTeX(inputString)).toEqual(outputString);
    });

    it(`should leave '0.4*x^2' as decimals but convert '*'`, () => {
        const inputString = '0.4*x^2';
        const outputString = '0.4 \\cdot x^2';
        expect(processDecimalLaTeX(inputString)).toEqual(outputString);
    });
});

describe('processSciNotation', () => {
    it(`should convert '2.938355780498216e+22' to a power of 10`, () => {
        const inputString = '2.938355780498216e+22';
        const outputString = '2.938355780498216*{10}^{22}';
        expect(processSciNotation(inputString)).toEqual(outputString);
    });
    it(`should convert '\\frac{1}{8.204789149834405e+50}' to negative power of 10`, () => {
        const inputString = '\\frac{1}{8.204789149834405e+50}';
        const outputString = '8.204789149834405*{10}^{-50}';
        expect(processSciNotation(inputString)).toEqual(outputString);
    });
});
