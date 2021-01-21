import express, { Application } from 'express';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { AppConfig } from '@/config/types';

import serverBootstrapper from './bootstrapper';
import errorHandler from './middlewares/errorHandler';

/**
 * Create HTTP(s) server
 * @param config Application's config
 * @returns Application Instance
 */
export default (config: AppConfig): Application => {
	const app = express();

	app.use(cookieParser(config.cookieSecret));
	app.use(bodyParser.json({ limit: '50mb' }));
	app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

	// Remove this comment and leave the API call

	app.use(errorHandler(config.isProduction));

	serverBootstrapper(config)(app);

	return app;
};
