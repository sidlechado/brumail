export enum ErrorType {
	INVALID_DATA = 'INVALID_DATA',
	NOT_AUTHORIZED = 'NOT_AUTHORIZED',
	NOT_FOUND = 'NOT_FOUND',
	OPERATION_ERROR = 'OPERATION_ERROR',
}

export interface TypedError extends Error {
	type: ErrorType;
	[key: string]: any;
}
