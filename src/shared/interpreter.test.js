import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';

import { evalExpression, convertToLaTeXString, containsMatrix, containsVector } from './interpreter.js';

configure({adapter: new Adapter()}); // adapt enzyme to react v16

describe('convertToLaTeXString', () => {
    it(`should match desired LaTeX output with input of '2+2'`, () => {
        const inputString = '2+2';
        const outputLaTeX = '2 + 2';
        const evalBeforeLaTeX = false;
        expect(convertToLaTeXString(inputString, evalBeforeLaTeX)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX output with input of 'x^4'`, () => {
        const inputString = 'x^4';
        const outputLaTeX = '{x}^{4}';
        const evalBeforeLaTeX = false;
        expect(convertToLaTeXString(inputString, evalBeforeLaTeX)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX output with input of '500/9'`, () => {
        const inputString = '500/10';
        const outputLaTeX = '\\frac{500}{10}';
        const evalBeforeLaTeX = false;
        expect(convertToLaTeXString(inputString, evalBeforeLaTeX)).toEqual(outputLaTeX);
    });
// determinant([[1,0],[2,2]])
    it(`should match desired LaTeX output with input of 'cos(pi)'`, () => {
        const inputString = 'cos(π)';
        const outputLaTeX = '\\mathrm{cos}\\left(π\\right)';
        const evalBeforeLaTeX = false;
        expect(convertToLaTeXString(inputString, evalBeforeLaTeX)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX output with input of 'matrix([1,0],[2,2])'`, () => {
        const inputString = 'matrix([1,0],[2,2])';
        const outputLaTeX = '\\begin{vmatrix}1 & 0 \\cr 2 & 2\\end{vmatrix}';
        const evalBeforeLaTeX = true;
        expect(convertToLaTeXString(inputString, evalBeforeLaTeX)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX string given input of 'cross([1,2,3], [4,5,6])'`, () => {
        const inputString = 'cross([1,2,3], [4,5,6])';
        const outputLaTeX = '[1, 2, 3]\\times[4, 5, 6]';
        const evalBeforeLaTeX = false;
        expect(convertToLaTeXString(inputString, evalBeforeLaTeX)).toEqual(outputLaTeX);
    });

    it(`should match desired LaTeX output with input of 'integrate(3*x^2,x)'`, () => {
        const inputString = 'integrate(3*x^2,x)';
        const outputLaTeX = '\\int {3 \\cdot {x}^{2}}\\, dx';
        const evalBeforeLaTeX = false;
        expect(convertToLaTeXString(inputString, evalBeforeLaTeX)).toEqual(outputLaTeX);
    });

});

describe('evalExpression', () => {
    it(`should match desired output string given input of '2 + 2'`, () => {
        const inputString = '2 + 2';
        const outputString = '4';
        const evalInput = false;
        expect(evalExpression(inputString, evalInput)).toEqual(outputString);
    });

    it(`should match desired output string given input of 'cos(pi)'`, () => {
        const inputString = 'cos(pi)';
        const outputString = '-1';
        const evalInput = false;
        expect(evalExpression(inputString, evalInput)).toEqual(outputString);
    });

    it(`should match desired output string given input of 'matrix([1,0],[2,2])'`, () => {
        const inputString = 'matrix([1,0],[2,2])';
        const outputString = 'matrix([1,0],[2,2])';
        const evalInput = false;
        expect(evalExpression(inputString, evalInput)).toEqual(outputString);
    });

    it(`should match desired output string given input of 'cross([1,2,3], [4,5,6])'`, () => {
        const inputString = 'cross([1,2,3], [4,5,6])';
        const outputString = '[-3,6,-3]';
        const evalInput = false;
        expect(evalExpression(inputString, evalInput)).toEqual(outputString);
    });

    //cross([1,2,3], [4,5,6])
    it(`should match desired output string given input of 'invert(matrix([1,0],[2,2]))'`, () => {
        const inputString = 'invert(matrix([1,0],[2,2]))';
        const outputString = 'matrix([1,0],[-1,1/2])';
        const evalInput = false;
        expect(evalExpression(inputString, evalInput)).toEqual(outputString);
    });
});

describe('containsMatrix()', () => {
    it('should return true if empty matrix', () => {
        const expression = 'matrix()';
        expect(containsMatrix(expression)).toEqual(true);
    });

    it('should return true if 1x1 matrix', () => {
        const expression = 'matrix([1])';
        expect(containsMatrix(expression)).toEqual(true);
    });

    it('should return true if 2x1 matrix', () => {
        const expression = 'matrix([1],[1])';
        expect(containsMatrix(expression)).toEqual(true);
    });

    it('should return true if 2x2 matrix', () => {
        const expression = 'matrix([1,0],[2,2])';
        expect(containsMatrix(expression)).toEqual(true);
    });

    it('should return false if matrix is argument of invert', () => {
        const expression = 'invert(matrix([1,0],[2,2]))';
        expect(containsMatrix(expression)).toEqual(false);
    });

    it('should return false if matrix is argument of determinant', () => {
        const expression = 'determinant(matrix([1,0],[2,2]))';
        expect(containsMatrix(expression)).toEqual(false);
    });

    it('should return false if matrix is argument of transpose', () => {
        const expression = 'transpose(matrix([1, 0],[2,2]))';
        expect(containsMatrix(expression)).toEqual(false);
    });
});

describe('containsVector()', () => {
    it('should return true if empty vector', () => {
        const expression = 'vector()';
        expect(containsVector(expression)).toEqual(true);
    });

    it('should return true if length 1 vector', () => {
        const expression = 'vector(1)';
        expect(containsVector(expression)).toEqual(true);
    });

    it('should return true if length 2 vector', () => {
        const expression = 'vector(1,1)';
        expect(containsVector(expression)).toEqual(true);
    });

    it('should return false if vector is argument of cross', () => {
        const expression = 'cross(vector(1,1))';
        expect(containsVector(expression)).toEqual(false);
    });

    it('should return false if vector is argument of dot', () => {
        const expression = 'dot(vector(1,1))';
        expect(containsVector(expression)).toEqual(false);
    });
});
