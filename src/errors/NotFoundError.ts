import { TypedError, ErrorType } from './types';
import createError from './createError';

/**
 * Creates an not found error object
 * @param resourceIdentifier ID of the requested resource
 * @returns error object
 */
export const NotFoundError = (resourceIdentifier: string | number): TypedError => {
	const error = createError(ErrorType.NOT_FOUND);

	error.message = `Nothing was found to resource: ${resourceIdentifier}`;

	return error;
};

export default NotFoundError;
