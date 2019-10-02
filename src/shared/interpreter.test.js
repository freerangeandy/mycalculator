import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';

import { evalExpression, convertToLaTeXString } from './interpreter.js';

configure({adapter: new Adapter()}); // adapt enzyme to react v16

describe('convertToLaTeXString', () => {
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
