import buildValidator from '@/jsonSchemaValidator';
import schemas from './config.schema.json';

import { AppConfig } from './types';
import {
	getEnvironmentValue,
	getRootDir,
	getServerPort,
	isHttpSslEnabled,
	isProductionEnvironment,
} from './dataHandlers';

const validate = buildValidator(schemas);

const { env } = process;
const validation = validate('ENV', env);

if (validation.errors) {
	/* eslint-disable */
	console.error(validation.errors);
	process.exit(1);
	/* eslint-enable */
}

const environmentValue = getEnvironmentValue(env.NODE_ENV);

const config: AppConfig = {
	env: environmentValue,
	isProduction: isProductionEnvironment(environmentValue),
	rootDir: getRootDir(),
	serverOptions: {
		port: getServerPort(env.PORT),
		isHttpSslEnabled: isHttpSslEnabled(env.IS_HTTP_SSL_ENABLED),
		certFilename: env.CERT_FILENAME,
		keyFilename: env.KEY_FILENAME,
		pemPassphrase: env.PEM_PASSPHRASE,
	},
	slackHooks: {
		logs: env.SLACK_HOOK_LOGS as string,
	},
	cookieSecret: env.COOKIE_SECRET as string,
};

export default Object.freeze(config);
