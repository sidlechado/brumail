import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';

import { Application } from 'express';
import { AppServerOptions } from '@/config/types';

export const CERTS_DIRECTORY_NAME = 'certs';

/**
 * Create HTTP server
 * @param app Sever Application instance
 * @returns HTTP server
 */
export const createHttpServer = (app: Application): http.Server => http.createServer(app);

/**
 * Create HTTPS server factory
 * @param httpsConfig HTTPS Options
 * @param httpsConfig.certFilename Certificate's filename
 * @param httpsConfig.certFilename Certificate Key's filename
 * @param httpsConfig.certFilename PEM's (Privacy-Enhanced Mail) password
 * @param rootDir Root directory path
 * @returns HTTPS server factory
 */
export const createHttpsServer = (httpsConfig: AppServerOptions, rootDir: string) =>
	/**
	 * Create HTTPS server
	 * @param app Sever Application instance
	 * @returns HTTPS server
 	 */
	(app: Application): https.Server => {
		const {
			certFilename,
			keyFilename,
		} = httpsConfig;

		const certPath = path.resolve(rootDir, CERTS_DIRECTORY_NAME, (certFilename as string));
		const keyPath = path.resolve(rootDir, CERTS_DIRECTORY_NAME, (keyFilename as string));

		const key = fs.readFileSync(keyPath);
		const cert = fs.readFileSync(certPath);

		const serverOptions = {
			key,
			cert,
			passphrase: httpsConfig.pemPassphrase,
		};

		const httpsServer = https
			.createServer(serverOptions, app);

		return httpsServer;
	};
