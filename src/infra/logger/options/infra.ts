/**
 * This module hold the configuration for the 'infra' logger.
 *
 * New transports should be added as needed to attend 'infra' log necessities.
 */
import config from '@/config';
import SlackHook from 'winston-slack-webhook-transport';

const { slackHooks } = config;

export const infraLogger = {
	transports: [
		new SlackHook({
			webhookUrl: slackHooks.logs,
		}),
	],
};
