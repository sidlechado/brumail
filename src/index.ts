/* eslint-disable import/first */
import { config as startDotenv } from 'dotenv';

// config() must run before importing the remaining libraries, or .env vars will not be available for them.
startDotenv();

import config from '@/config';
import server from '@/infra/http';

server(config);
