import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';

import { evalExpression,
    convertToLaTeXString,
    containsMatrix,
    containsVector,
    containsVectorFunction,
    isVector,
    trigExactResult,
} from './interpreter.js';

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
// determinant([[1,0],[2,2]])
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

describe('containsMatrix()', () => {
    it('should return false if no matrix', () => {
        const expression = 'vector(1,2)';
        expect(containsMatrix(expression)).toEqual(false);
    });

    it('should return match if empty matrix', () => {
        const expression = 'matrix()';
        expect(containsMatrix(expression).match).toEqual(expression);
    });

    it('should return match if 1x1 matrix', () => {
        const expression = 'matrix([1])';
        expect(containsMatrix(expression).match).toEqual(expression);
    });

    it('should return match if 2x1 matrix', () => {
        const expression = 'matrix([1],[1])';
        expect(containsMatrix(expression).match).toEqual(expression);
    });

    it('should return match if 2x2 matrix', () => {
        const expression = 'matrix([1,0],[2,2])';
        expect(containsMatrix(expression).match).toEqual(expression);
    });

    it('should return match if matrix is argument of invert', () => {
        const expression = 'invert(matrix([1, 0],[2,2]))';
        const expectedMatch = 'matrix([1, 0],[2,2])'
        expect(containsMatrix(expression).match).toEqual(expectedMatch);
    });

    it('should return match if matrix is argument of determinant', () => {
        const expression = 'determinant(matrix([1, 0],[2,2]))';
        const expectedMatch = 'matrix([1, 0],[2,2])'
        expect(containsMatrix(expression).match).toEqual(expectedMatch);
    });

    it('should return match if matrix is argument of transpose', () => {
        const expression = 'transpose(matrix([1, 0],[2,2]))';
        const expectedBefore = 'transpose(';
        const expectedMatch = 'matrix([1, 0],[2,2])';
        const expectedAfter = ')';
        expect(containsMatrix(expression).before).toEqual(expectedBefore);
        expect(containsMatrix(expression).match).toEqual(expectedMatch);
        expect(containsMatrix(expression).after).toEqual(expectedAfter);
    });

    it('should return false if imatrix i.e. matrix not standalone word', () => {
        const expression = 'imatrix(3)';
        expect(containsMatrix(expression)).toEqual(false);
    });

});

describe('isVector()', () => {
    it('should return true if empty vector', () => {
        const expression = '[]';
        expect(isVector(expression)).toEqual(true);
    });

    it('should return true if length 1 vector', () => {
        const expression = '[1.2]';
        expect(isVector(expression)).toEqual(true);
    });

    it('should return true if length 2 vector', () => {
        const expression = '[1,-1]';
        expect(isVector(expression)).toEqual(true);
    });

    it('should return false if vector is argument', () => {
        const expression = 'dot([1,2,3], [4,5,6])';
        expect(isVector(expression)).toEqual(false);
    });

    it('should return false if matrix', () => {
        const expression = '[[3,2],[2,2]]';
        expect(isVector(expression)).toEqual(false);
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

    xit('should return false if vector is argument of cross', () => {
        const expression = 'cross(vector(1,1))';
        expect(containsVector(expression)).toEqual(false);
    });

    xit('should return false if vector is argument of dot', () => {
        const expression = 'dot(vector(1,2), vector(3,5))';
        expect(containsVector(expression)).toEqual(false);
    });
});

describe('containsVectorFunction()', () => {
    it('should return match if cross product of vectors (bracketed)', () => {
        const expression = 'cross([1,2,3], [4,5,6])';
        const expectedFunction = 'cross';
        const expectedArgs = '[1,2,3], [4,5,6]';
        expect(containsVectorFunction(expression).func).toEqual(expectedFunction);
        expect(containsVectorFunction(expression).args).toEqual(expectedArgs);
    });

    it('should return match if cross product of vectors (constructor)', () => {
        const expression = 'cross(vector(1,2),vector(3,5))';
        const expectedFunction = 'cross';
        const expectedArgs = 'vector(1,2),vector(3,5)';
        expect(containsVectorFunction(expression).func).toEqual(expectedFunction);
        expect(containsVectorFunction(expression).args).toEqual(expectedArgs);
    });

    it('should return match if dot product of vectors', () => {
        const expression = 'dot([1,2,3], [4,5,6])';
        const expectedFunction = 'dot';
        const expectedArgs = '[1,2,3], [4,5,6]';
        expect(containsVectorFunction(expression).func).toEqual(expectedFunction);
        expect(containsVectorFunction(expression).args).toEqual(expectedArgs);
    });
});

describe('trigExactResult()', () => {
    it(`should return match if 'sin(pi/3)'`, () => {
        const expression = 'sin(pi/3)';
        const expectedTrig = 'sin';
        const expectedArg = 'pi/3';
        expect(trigExactResult(expression).trig).toEqual(expectedTrig);
        expect(trigExactResult(expression).arg).toEqual(expectedArg);
    });

    it(`should return match if 'tan(3*pi)'`, () => {
        const expression = 'tan(3*pi)';
        const expectedTrig = 'tan';
        const expectedArg = '3*pi';
        expect(trigExactResult(expression).trig).toEqual(expectedTrig);
        expect(trigExactResult(expression).arg).toEqual(expectedArg);
    });

    it(`should return match if 'sin(π/3)'`, () => {
        const expression = 'sin(π/3)';
        const expectedTrig = 'sin';
        const expectedArg = 'π/3';
        expect(trigExactResult(expression).trig).toEqual(expectedTrig);
        expect(trigExactResult(expression).arg).toEqual(expectedArg);
    });

    it(`should return false if 'sin(3)'`, () => {
        const expression = 'sin(3)';
        expect(trigExactResult(expression)).toEqual(false);
    });

});
