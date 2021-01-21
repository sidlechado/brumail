// @ts-nocheck
import test, { Test } from 'tape';
import sinon from 'sinon';
import { ErrorType } from './types';
import createOperationError from './OperationError';

const desc = 'Infra OperationError';

test(`${desc}: should create an error of type 'NOT_AUTHORIZED'`, (assert: Test) => {
	const fakeError = new Error('fake error');
	const fakeLogger = { error: (): void => {} };

	const OperationError = createOperationError(fakeLogger);
	const error = OperationError(fakeError);

	assert.equal(error.type, ErrorType.OPERATION_ERROR, 'error is operation error');

	assert.end();
});

test(`${desc}: should set message when one is passed`, (assert: Test) => {
	const fakeError = new Error('fake error');
	const fakeMessage = 'fake message';
	const fakeLogger = { error: (): void => {} };

	const OperationError = createOperationError(fakeLogger);
	const error = OperationError(fakeError, fakeMessage);

	assert.equal(fakeMessage, error.message, 'message is right');

	assert.end();
});

test(`${desc}: should have message blank when none is passed`, (assert: Test) => {
	const fakeError = new Error('fake error');
	const fakeLogger = { error: (): void => {} };

	const OperationError = createOperationError(fakeLogger);
	const error = OperationError(fakeError);

	assert.equal('', error.message, 'message is empty');

	assert.end();
});

test(`${desc}: should log the original error`, (assert: Test) => {
	const fakeError = new Error('fake error');
	const fakeLogger = { error: (): void => {} };

	const spiedLogger = sinon.spy(fakeLogger, 'error');

	const OperationError = createOperationError(fakeLogger);

	OperationError(fakeError);

	assert.true(spiedLogger.calledOnce);
	assert.equal(fakeError, spiedLogger.getCall(0).args[0], 'origin error was passed to logger');

	sinon.restore();
	assert.end();
});
