import {
	Container,
	Logger,
} from 'winston';

import { defaultLogger, infraLogger } from './options';

const container = new Container();

container.add('default', defaultLogger);
container.add('infra', infraLogger);

export default (loggerId: string): Logger => container.get(loggerId);
