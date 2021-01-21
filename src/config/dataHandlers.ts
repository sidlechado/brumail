import path from 'path';
import { NodeEnvironment } from './types';

const DEFAULT_SERVER_PORT = 3000;

/**
 * Parse the given environment's name string to the respective enum
 * @param env Environment's name
 * @returns Environment's name Enum
 */
export const getEnvironmentValue = (env?: string): NodeEnvironment => {
	switch (env) {
		case 'development':
			return NodeEnvironment.DEVELOPMENT;
		case 'qa':
			return NodeEnvironment.QA;
		case 'production':
			return NodeEnvironment.PRODUCTION;
		default:
			throw new Error(`Invalid environment detected: ${env}`);
	}
};

/**
 * Get the Project's root directory
 */
export const getRootDir = (): string =>
	path.resolve(__dirname, '..', '..');

/**
 * Parses the given port to number, or return a default port
 * @param port Port number as string
 * @returns Port number
 */
export const getServerPort = (port?: string): number =>
	Number(port) || DEFAULT_SERVER_PORT;

/**
 * Parses the 'httpSslFlag' to boolean
 * @param httpSslFlag Flag whether the SSL for HTTP is enabled
 * @returns 'isHttpSslEnabled' flag
 */
export const isHttpSslEnabled = (httpSslFlag?: string): boolean =>
	httpSslFlag === 'true';

/**
 * Checks whether the application is in production environment
 * @param environmentValue Environment's name
 * @returns 'isProductionEnvironment' flag
 */
export const isProductionEnvironment = (environmentValue: NodeEnvironment): boolean =>
	environmentValue === NodeEnvironment.PRODUCTION;
