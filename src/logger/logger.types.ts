export type Severity = 'error' | 'warn' | 'info' | 'debug';
export type Message = string;
export interface Metadata {
  [key: string]: unknown;
}

export interface LogItem {
  severity: Severity;
  message: Message;
  metadata: Metadata;
}
export interface LoggerOptions {
  /**
   * Output log entry to browser console (subject to log level).
   * - production default: `true`.
   * - development default: `true`.
   *
   * ```js
   * // Log entry will appear in console.
   * logger.warn('Your password must be exactly 147 characters.', {pwLength: val.length}, { *console: true* });
   *
   * // Log entry will not appear in console.
   * logger.warn('Unknown error. Please sacrifice small-hoofed animal.', {status}, { *console: false* });
   * ```
   */
  console: boolean;

  /**
   * Use [console.trace](https://developer.mozilla.org/en-US/docs/Web/API/console/trace) when outputting to console.
   * can be useful to trace function invocation.
   * - production default: `false`.
   * - development default: `false`.
   * ```js
   * // log entry will print to console via `console.trace`.
   * logger.warn('Snackbars do not pass uk food safety laws.', {}, { consoleTrace: true });
   * ```
   */
  consoleTrace: boolean;

  /**
   * Forward log entry to splunk instance (subject to log level).
   * - production default: `true`.
   * - development default: `true`.
   * ```js
   * // log entry will be forwarded to splunk.
   * logger.warn('Unacceptable response bruh.', {response}, { splunk: true });
   *
   * // log entry will not be forwarded to splunk.
   * logger.warn('Blue screen imminent.', metadataObj, { splunk: false });
   * ```
   */
  splunk: boolean;

  /**
   * Display log entry via a snackbar (subject to log level).
   * - production default: `true`.
   * - development default: `true`.
   * ```js
   * // log entry will produce a snackbar.
   * logger.warn('Snackbars do not pass uk food safety laws.', {}, { snackbar: true });
   *
   * // log entry will not produce a snackbar.
   * logger.warn('Blue screen imminent.', metadataObj, { splunk: false });
   * ```
   */
  snackbar: boolean;

  /**
   * Test aid: Set a selector prefix to various parts of the emitted snackbar.
   * - defaults to notistack's key (internally generated).
   * ```js
   * // emitted snackbar will various selectors available.
   * logger.warn('Snackbars are rumoured to be delicious', {tasty: 'very'}, { snackbarSelectorPrefix: 'delicious' });
   * // available selectors
   * cy.get('[data-cy="delicious-logger-message"]') // element containing logger message string.
   * cy.get('[data-cy="delicious-logger-metadata-button"]') // toggle metadata button.
   * cy.get('[data-cy="delicious-logger-dismiss-button"]') // dismiss snackbar button.
   * cy.get('[data-cy="delicious-logger-metadata"]') // hidden span with data-stringified-metadata attribute.
   * // example: assert on logger metadata via a data-attr.
   * cy.get('[data-cy="delicious-logger-metadata"]')
   *   .invoke('attr', 'data-stringified-metadata')
   *   .should('eq', '{"tasty":"very"}')
   * ```
   */
  snackbarSelectorPrefix: string | undefined;

  /**
   * set the inclusive log level. Not adjustable when using logger methods.
   *
   * logger severities in priority order: `error`, `warn`, `info`, `debug`.
   * - production default: `error` - only error messages will be actioned.
   * - development default: `debug` - everything including debug and above debug will be actioned.
   */
  loglevel: Severity;
}

export type AdjustableOpts = Partial<
  Pick<LoggerOptions, 'console' | 'consoleTrace' | 'snackbar' | 'snackbarSelectorPrefix' | 'splunk'>
>;

export interface SplunkLogEvent {
  local_id: string;
  time: number;
  host: string;
  source: string;
  event: LogItem;
}
