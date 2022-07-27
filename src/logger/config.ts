import { LoggerOptions } from './logger.types';

const developmentOptions: LoggerOptions = {
  console: true,
  splunk: true,
  snackbar: true,
  consoleTrace: false,
  snackbarSelectorPrefix: undefined,
  loglevel: 'debug',
};

const productionOptions: LoggerOptions = {
  console: true,
  splunk: true,
  snackbar: true,
  consoleTrace: false,
  snackbarSelectorPrefix: undefined,
  loglevel: 'debug', // set to debug for demo purposes.
};

export function getBaseOptions(): LoggerOptions {
  if (import.meta.env.PROD) return productionOptions;
  return developmentOptions;
}
