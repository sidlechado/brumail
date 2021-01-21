import { Request, Response, NextFunction } from 'express';
import { TypedError } from '@/errors/types';

/**
 * Creates an Error Handler instance
 */
export default (shouldErrorBeHidden: boolean) =>
	/**
	 * Error Handler Middleware
	 * @param error
	 * @param _req
	 * @param res
	 * @param _next
	 */
	(error: TypedError, _req: Request, res: Response, _next: NextFunction): void => {
		const defaultStatus = 500;
		const defaultMessage = 'Internal server error. Please, contact support team.';

		let status;
		let message;
		let invalidData;

		switch (error.type) {
			case 'OPERATION_ERROR':
				status = defaultStatus;
				message = error.message || defaultMessage;
				break;
			case 'NOT_AUTHORIZED':
				status = 401;
				message = 'Unauthorized';
				break;
			case 'NOT_FOUND':
				status = 404;
				message = error.message;
				break;
			case 'INVALID_DATA':
				status = 400;
				message = 'Invalid data!';
				invalidData = error.invalidData;
				break;
			default:
				status = defaultStatus;
				message = defaultMessage;
		}

		const responseBody = {
			message,
			invalidData,
		};

		if (shouldErrorBeHidden) {
			res.status(status).json(responseBody);
		} else {
			const errorObj = JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)));
			res.status(status).json({ ...responseBody, error: errorObj });
		}
	};
