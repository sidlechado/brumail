import { Application } from 'express';
import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
import Logger from '@/infra/logger';

import { AppConfig, NodeEnvironment } from '@/config/types';

import { createHttpServer, createHttpsServer } from './serverBuilders';

const logger = Logger('default');

/**
 * Create HTTP(s) server factory
 * @param config Application's config
 * @returns HTTP(s) server factory
 */
export default (config: AppConfig) =>
	/**
	 * Create and starts a HTTP(s)
	 * @param app Sever Application instance
	 * @returns HTTP(s) server
 	 */
	(app: Application): (HttpServer | HttpsServer) => {
		let server;

		const {
			env,
			serverOptions,
			rootDir,
		} = config;

		if (serverOptions.isHttpSslEnabled) {
			server = createHttpsServer(serverOptions, rootDir)(app);
		} else {
			server = createHttpServer(app);
		}

		return server
			.listen(
				serverOptions.port,
				() => logger.info(`Server running on ${NodeEnvironment[env]} mode at ${serverOptions.port}`),
			);
	};
