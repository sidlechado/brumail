import test, { Test } from 'tape';
import { ErrorType } from './types';
import { InvalidDataError } from './InvalidDataError';

const desc = 'Infra InvalidDataError';

test(`${desc}: should create an error of type 'INVALID_DATA'`, (assert: Test) => {
	const error = InvalidDataError();

	assert.equal(error.type, ErrorType.INVALID_DATA);
	assert.end();
});

test(`${desc}: should have any parameter passed to be added at 'invalidData'`, (assert: Test) => {
	const fakeInvalidContent = 'fake invalid error';
	const error = InvalidDataError(fakeInvalidContent);

	assert.deepEqual(error.invalidData, [fakeInvalidContent]);
	assert.end();
});

test(`${desc}: should have Error in the prototype chain of the created object`, (assert: Test) => {
	const error = InvalidDataError();

	assert.true(error instanceof Error);
	assert.end();
});
