import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';

import {
    containsMatrix,
    containsVector,
    containsVectorFunction,
    isVector,
    trigExactResult,
} from './patternMatch';

configure({adapter: new Adapter()}); // adapt enzyme to react v16

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

    it(`should return false if 'sin(3.2*pi)'`, () => {
        const expression = 'sin(3.2*pi)';
        expect(trigExactResult(expression)).toEqual(false);
    });

    it(`should return false if 'cos(pi/4.1)'`, () => {
        const expression = 'cos(pi/4.1)';
        expect(trigExactResult(expression)).toEqual(false);
    });

});
