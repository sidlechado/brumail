export enum NodeEnvironment {
	DEVELOPMENT,
	QA,
	PRODUCTION,
}

export interface AppConfig {
	env: NodeEnvironment;
	isProduction: boolean;
	rootDir: string;
	serverOptions: AppServerOptions;
	cookieSecret: string;
	slackHooks: SlackHooksConfig;
}

export interface AppServerOptions {
	port: number;
	isHttpSslEnabled: boolean;
	certFilename?: string;
	keyFilename?: string;
	pemPassphrase?: string;
}

export interface SlackHooksConfig {
	logs: string;
}
