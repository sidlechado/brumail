import test, { Test } from 'tape';
import { ErrorType } from './types';
import createError from './createError';

const desc = 'Infra createError';

test(`${desc}: should always return an instance of error`, (assert: Test) => {
	const error = createError(ErrorType.INVALID_DATA);

	assert.true(error instanceof Error, 'returned value is an instance of Error');
	assert.end();
});

test(`${desc}: should create a 'typed' error`, (assert: Test) => {
	const error = createError(ErrorType.INVALID_DATA);

	assert.equal(error.type, ErrorType.INVALID_DATA, 'returned error match passed type');
	assert.end();
});
