/**
 * This module hold the configuration for the generic logger.
 */
import { format, transports } from 'winston';

export const defaultLogger = {
	level: 'info',
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.errors({ stack: true }),
		format.json(),
	),
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize(),
				format.simple(),
			),
		}),
	],
};
