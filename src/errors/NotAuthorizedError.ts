import { TypedError, ErrorType } from './types';
import createError from './createError';

/**
 * Creates an not authorized error object
 * @param message a specific message or default's 'Not Authorized'
 * @returns error object
 */
export const NotAuthorizedError = (message: string = 'Not Authorized'): TypedError => {
	const error = createError(ErrorType.NOT_AUTHORIZED);

	error.message = message;

	return error;
};

export default NotAuthorizedError;
