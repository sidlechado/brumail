import test, { Test } from 'tape';
import { ErrorType } from './types';
import { NotAuthorizedError } from './NotAuthorizedError';

const desc = 'Infra NotAuthorizedError';

test(`${desc}: should create an error of type 'NOT_AUTHORIZED'`, (assert: Test) => {
	const error = NotAuthorizedError();

	assert.equal(error.type, ErrorType.NOT_AUTHORIZED, 'error is not authorized');
	assert.end();
});

test(`${desc}: should have message matching the one sent by parameter`, (assert: Test) => {
	const fakeMessage = 'fake error';
	const error = NotAuthorizedError(fakeMessage);

	assert.equal(error.message, fakeMessage, 'message is right');
	assert.end();
});

test(`${desc}: should set the default message when none is passed`, (assert: Test) => {
	const error = NotAuthorizedError();

	assert.equal(error.message, 'Not Authorized', 'message is right');
	assert.end();
});
