import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';

import { evalExpression,
        convertToLaTeXString,
        convertDegToRad,
        convertRadToDeg,
        convertAnglesToRad,
} from './interpreter.js';

configure({adapter: new Adapter()}); // adapt enzyme to react v16

xdescribe('convertToLaTeXString', () => {
    it(`should match desired LaTeX output with input of '2+2'`, () => {
        const inputString = '2+2';
        const outputLaTeX = '2 + 2';
        const evalBeforeLaTeX = true; // automatically handled in method
        expect(convertToLaTeXString(inputString)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX output with input of 'x^4'`, () => {
        const inputString = 'x^4';
        const outputLaTeX = '{x}^{4}';
        const evalBeforeLaTeX = true;  // automatically handled in method
        expect(convertToLaTeXString(inputString)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX output with input of '500/9'`, () => {
        const inputString = '500/10';
        const outputLaTeX = '\\frac{500}{10}';
        const evalBeforeLaTeX = true;  // automatically handled in method
        expect(convertToLaTeXString(inputString)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX output with input of 'cos(pi)'`, () => {
        const inputString = 'cos(π)';
        const outputLaTeX = '\\mathrm{cos}\\left(π\\right)';
        const evalBeforeLaTeX = true;  // automatically handled in method
        expect(convertToLaTeXString(inputString)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX output with input of 'matrix([1,0],[2,2])'`, () => {
        const inputString = 'matrix([1,0],[2,2])';
        const outputLaTeX = '\\begin{vmatrix}1 & 0 \\cr 2 & 2\\end{vmatrix}';
        const evalBeforeLaTeX = false;
        expect(convertToLaTeXString(inputString)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX output with input of 'determinant(matrix([1,0],[2,2]))'`, () => {
        const inputString = 'determinant(matrix([1,0],[2,2]))';
        const outputLaTeX = 'determinant(\\begin{vmatrix}1 & 0 \\cr 2 & 2\\end{vmatrix})';
        const evalBeforeLaTeX = false;
        expect(convertToLaTeXString(inputString)).toEqual(outputLaTeX);
    });
    //vector functions (dot, cross) with '[...]' as arguments crash the laTeX conversion
    //MUST CONVERT CROSS(A, B) -> AxB manually
    xit(`should match desired LaTeX string given input of 'cross([1,2,3], [4,5,6])'`, () => {
        const inputString = 'cross([1,2,3], [4,5,6])';
        const outputLaTeX = '[1, 2, 3]\\times[4, 5, 6]';
        const evalBeforeLaTeX = true;  // automatically handled in method
        expect(convertToLaTeXString(inputString)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX output with input of 'integrate(3*x^2,x)'`, () => {
        const inputString = 'integrate(3*x^2,x)';
        const outputLaTeX = '\\int {3 \\cdot {x}^{2}}\\, dx';
        const evalBeforeLaTeX = true;  // automatically handled in method
        expect(convertToLaTeXString(inputString)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX output with input of 'diff(x^2,x,1)'`, () => {
        const inputString = 'diff(x^2,x,1)';
        const outputLaTeX = '\\frac{d}{d x}\\left({{x}^{2}}\\right)';
        const evalBeforeLaTeX = true;  // automatically handled in method
        expect(convertToLaTeXString(inputString)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX output with input of '[1,3,-2]'`, () => {
        const inputString = '[1,3,-2]';
        const outputLaTeX = '[1,3,-2]';
        const evalBeforeLaTeX = true;  // automatically handled in method
        expect(convertToLaTeXString(inputString)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX output with input of 'cross(vector(3,-2,0), vector(2,2,0))'`, () => {
        const inputString = 'cross(vector(3,-2,0), vector(2,2,0))';
        const outputLaTeX = '\\mathrm{cross}\\left(\\mathrm{vector}\\left(3,-2,0\\right),\\mathrm{vector}\\left(2,2,0\\right)\\right)';
        // const outputLaTeX = 'cross([3,-2,0], [2,2,0])';
        const evalBeforeLaTeX = true;  // automatically handled in method
        expect(convertToLaTeXString(inputString)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX output with input of 'sqrt(3)^(-1)'`, () => {
        const inputString = 'sqrt(3)^(-1)';
        const outputLaTeX = '\\frac{1}{\\sqrt{3}}';
        const evalBeforeLaTeX = false;  // automatically handled in method
        expect(convertToLaTeXString(inputString, evalBeforeLaTeX)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX output with input of '(1/2)*sqrt(3)'`, () => {
        const inputString = '(1/2)*sqrt(3)';
        const outputLaTeX = '\\frac{\\sqrt{3}}{2}';
        const evalBeforeLaTeX = false;
        expect(convertToLaTeXString(inputString, evalBeforeLaTeX)).toEqual(outputLaTeX);
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
