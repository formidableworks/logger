import { enqueueUniSnackbar } from './UniversalSnackbar';
import { LoggerSnackbar } from './loggerSnackbar/LoggerSnackbar';
import { LogItem, LoggerOptions, SplunkLogEvent, Severity } from './logger.types';
import { getLoggerState } from './loggerStore';

function logLevelInterrupt(itemSeverity: Severity, loggerSeverity: Severity): boolean {
  const severityLevelMap: Record<Severity, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };
  const itemLevel = severityLevelMap[itemSeverity];
  const loggerLevel = severityLevelMap[loggerSeverity];
  return loggerLevel > itemLevel;
}

export function handleSnackbar(logItem: LogItem, options: LoggerOptions): void {
  if (options.snackbar === false) return;
  if (logLevelInterrupt(logItem.severity, options.loglevel)) return;
  enqueueUniSnackbar(logItem.message, {
    persist: true,
    content: (key) => <LoggerSnackbar logItem={logItem} logOptions={options} notistackKey={key} />,
  });
}

export function handleConsole(logItem: LogItem, options: LoggerOptions): void {
  const { severity, message, metadata } = logItem;
  if (!options.console) return;
  if (logLevelInterrupt(severity, options.loglevel)) return;
  const outputMetadata = Object.keys(metadata).length > 0 ? metadata : { empty_metadata: true };
  switch (severity) {
    case 'debug':
      // eslint-disable-next-line no-console
      console.debug(message, outputMetadata);
      break;
    case 'info':
      // eslint-disable-next-line no-console
      console.info(message, outputMetadata);
      break;
    case 'warn':
      // eslint-disable-next-line no-console
      console.warn(message, outputMetadata);
      break;
    case 'error':
      // eslint-disable-next-line no-console
      console.error(message, outputMetadata);
      break;
    default: {
      const exhaustiveSeverityValues: never = severity;
      throw new Error(`Unhandled severity case: ${exhaustiveSeverityValues}`);
    }
  }
  if (options.consoleTrace === true) {
    // eslint-disable-next-line no-console
    console.trace(logItem.message);
  }
}

let forwardToSplunkInterval: NodeJS.Timer | undefined;
export function handleSplunk(logItem: LogItem, options: LoggerOptions): void {
  if (!options.splunk) return;
  if (logLevelInterrupt(logItem.severity, options.loglevel)) return;

  // conditionally initialise splunk submission interval.
  if (forwardToSplunkInterval === undefined) {
    const { VITE_SPLUNK_SUBMIT_INTERVAL } = import.meta.env;
    const splunkSubmitInterval = parseInt(VITE_SPLUNK_SUBMIT_INTERVAL, 10);
    forwardToSplunkInterval = setInterval(() => {
      getLoggerState().forwardEventsToSplunk();
    }, splunkSubmitInterval);
  }

  // build splunk event.
  const newSplunkEvent: SplunkLogEvent = {
    local_id: `${performance.now()}${Date.now()}`,
    time: Date.now(),
    host: window.location.hostname,
    source: 'react-splunk-prototype/ui-logging',
    event: logItem,
  };
  // add event to logger store.
  getLoggerState().addEntry(newSplunkEvent);
}
