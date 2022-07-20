import merge from 'lodash/merge';
import { LogItem, LoggerOptions, Metadata, Message, AdjustableOpts } from './logger.types';
import { getBaseOptions } from './config';
import { handleConsole, handleSnackbar, handleSplunk } from './outputPipes';

function log(logItem: LogItem, options?: AdjustableOpts): void {
  const baseLoggerOptions: LoggerOptions = getBaseOptions();
  const mergedOptions = merge(baseLoggerOptions, options);

  handleConsole(logItem, mergedOptions);
  handleSnackbar(logItem, mergedOptions);
  handleSplunk(logItem, mergedOptions);
}

// log severity aliases.
function debug(message: Message, metadata: Metadata, options?: AdjustableOpts): void {
  log({ severity: 'debug', message, metadata }, options);
}
function info(message: Message, metadata: Metadata, options?: AdjustableOpts): void {
  log({ severity: 'info', message, metadata }, options);
}
function warn(message: Message, metadata: Metadata, options?: AdjustableOpts): void {
  log({ severity: 'warn', message, metadata }, options);
}
function error(message: Message, metadata: Metadata, options?: AdjustableOpts): void {
  log({ severity: 'error', message, metadata }, options);
}

export const logger = { log, debug, info, warn, error };
