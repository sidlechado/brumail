import test, { Test } from 'tape';
import { ErrorType } from './types';
import { NotFoundError } from './NotFoundError';

const desc = 'Infra NotFoundError';

test(`${desc}: should create an error of type 'NOT_AUTHORIZED'`, (assert: Test) => {
	const error = NotFoundError('');

	assert.equal(error.type, ErrorType.NOT_FOUND, 'error is not found');
	assert.end();
});

test(`${desc}: should have message matching the one sent by parameter`, (assert: Test) => {
	const fakeId = 'fake resource id';
	const error = NotFoundError(fakeId);

	assert.equal(error.message, `Nothing was found to resource: ${fakeId}`, 'message is right');
	assert.end();
});
