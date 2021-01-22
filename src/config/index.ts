const parsedEnv = process.env;

// Define log levels type (silent + Winston default npm)
type LogLevel =
  | 'silent'
  | 'error'
  | 'warn'
  | 'info'
  | 'http'
  | 'verbose'
  | 'debug'
  | 'silly';

interface Config {
  morganLogger: boolean;
  morganBodyLogger: boolean;
  expressDevLogger: boolean;
  loggerLevel: LogLevel;
  port: number;
}

const config: Config = {
  morganLogger: (parsedEnv.MORGAN_LOGGER || false) as boolean,
  morganBodyLogger: (parsedEnv.MORGAN_BODY_LOGGER || true) as boolean,
  expressDevLogger: (parsedEnv.EXPRESS_DEV_LOGGER || true) as boolean,
  loggerLevel: (parsedEnv.LOGGER_LEVEL || 'debug') as LogLevel,

  port: (parsedEnv.PORT || 3000) as number,
};

export default config;
