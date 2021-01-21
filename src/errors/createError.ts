import { ErrorType, TypedError } from './types';

/**
 * Create an error object appending a type to it
 * @param type Error type, listed at ErrorType enum
 * @returns error typed error
 */
export default (type: ErrorType): TypedError => {
	const error = Object.create(Error.prototype);

	error.type = type;

	return error;
};
