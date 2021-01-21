import { TypedError, ErrorType } from './types';
import createError from './createError';

/**
 * Creates an invalid data error object
 * @param invalidData information about the invalid data
 * @returns error object
 */
export const InvalidDataError = (...invalidData: any): TypedError => {
	const error = createError(ErrorType.INVALID_DATA);

	error.invalidData = invalidData;

	return error;
};

export default InvalidDataError;
