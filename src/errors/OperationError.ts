import { Logger } from 'winston';
import { TypedError, ErrorType } from './types';
import createError from './createError';

/**
 * OperationError Factory
 * @param logger infra's logger
 * @return OperationError
 */
export default (logger: Logger) =>
	/**
	 * Creates an operation error object
	 * @param originalError thrown error
	 * @param message error message
	 * @returns error object
	 */
	(originalError: Error, message?: string): TypedError => {
		const error = createError(ErrorType.OPERATION_ERROR);

		if (message) {
			error.message = message;
		}

		logger.error(originalError);

		return error;
	};
