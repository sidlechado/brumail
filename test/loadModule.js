// This file load env var for test purpose
const { config } = require('dotenv');

config({ path: `${__dirname}/.test-env` });
