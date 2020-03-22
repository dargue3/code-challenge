const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require('dotenv');

if (!process.env.PLATFORM_ENVIRONMENT_ID) {
  if (fs.existsSync('.env')) {
    const envConfig = dotenv.parse(fs.readFileSync('.env'));
    Object.entries(envConfig).forEach(([key, val]) => {
      process.env[key] = val;
    });
  }
}
