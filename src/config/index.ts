/**
 * Return all the config from this file only
 */

const nconf = require('nconf'),
  env = process.env.NODE_ENV || 'local';
// env = "prod";

console.log(`NODE_ENV was ===> ${env}`);

nconf
  .argv()
  .env()
  .file({ file: `config/config.${env}.json` });
  

const config: any = {};

//********APP-CONFIG********
config.isProd = (() => {
  if (
    process &&
    process.env &&
    process.env.NODE_ENV &&
    process.env.NODE_ENV === 'prod'
  ) {
    return true;
  } else {
    return false;
  }
})();

config.isDev = (() => {
  if (
    process &&
    process.env &&
    process.env.NODE_ENV &&
    process.env.NODE_ENV === 'dev'
  ) {
    return true;
  } else {
    return false;
  }
})();

config.isLocal = (() => {
  if (
    process &&
    process.env &&
    process.env.NODE_ENV &&
    process.env.NODE_ENV === 'local'
  ) {
    return true;
  } else {
    return false;
  }
})();

config.appName = (() => {
return "bookstore-server";
  //return nconf.get('application').name;
})();

config.port = (() => {
  return 8000;
})();

config.backendBaseUrl = (() => {
  return "http://localhost:8000";
})();

config.databaseUrl = (() => {
  return "mongodb+srv://thePoeticCoder:root@cluster0.5auypbf.mongodb.net/everything"
})();

config.JWT_SECRET_KEY = (() => {
  return "90448648645675489674987654689546894689746"
})();

config.REFRESH_JWT_SECRET_KEY = (() => {
  return "90448648645675489674987654689546894689746"
})();


export const AppConfig = config;
