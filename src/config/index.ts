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
  blingKey: string;
  blingUrl: string;
  pipedriveUrl: string;
  pipedriveToken: string;
  port: number;
}

const config: Config = {
  morganLogger: (parsedEnv.MORGAN_LOGGER || false) as boolean,
  morganBodyLogger: (parsedEnv.MORGAN_BODY_LOGGER || true) as boolean,
  expressDevLogger: (parsedEnv.EXPRESS_DEV_LOGGER || true) as boolean,
  loggerLevel: (parsedEnv.LOGGER_LEVEL || 'debug') as LogLevel,
  blingKey: (parsedEnv.BLING_KEY ||
    'b3fa0e8853db33ba978d7cd53e7df0ebef2d2e4fda9cefbed1df108acf0d543450f5237b') as string,
  blingUrl: (parsedEnv.BLING_URL || 'https://bling.com.br/Api/v2') as string,
  pipedriveToken: (parsedEnv.PIPEDRIVE_TOKEN ||
    '2e724a0f6210dfef0dabf4be37b8f450d2b3fe36') as string,
  pipedriveUrl: (parsedEnv.PIPEDRIVE_URL ||
    'https://teste64.pipedrive.com/api/v1') as string,

  port: (parsedEnv.PORT || 3000) as number,
};

export default config;
