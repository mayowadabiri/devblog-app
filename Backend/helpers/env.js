const { PORT, HOST, ENV } = process.env;

const configurations = {
  production: {
    ssl: true,
    port: PORT,
    hostname: HOST,
  },
  development: {
    ssl: false,
    port: 8000,
    hostname: "localhost",
  },
};
const environment = ENV || "production";

const SERVER_CONFIG = configurations[environment];
const SERVER_ENDPOINT = `http://${SERVER_CONFIG.hostname}:${SERVER_CONFIG.port}`;


const ENV_CONFIG = {
  SERVER_CONFIG,
  SERVER_ENDPOINT,
};

module.exports = ENV_CONFIG;
