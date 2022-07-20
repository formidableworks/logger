import { Color } from '@material-ui/lab';
import { Severity } from './logger.types';

type MuiSeverity = Color | undefined;

export function loggerToMuiSeverity(loggerSeverity: Severity): MuiSeverity {
  switch (loggerSeverity) {
    case 'debug':
      return 'success';
    case 'info':
      return 'info';
    case 'warn':
      return 'warning';
    case 'error':
      return 'error';
    default: {
      const exhaustiveSeverityValues: never = loggerSeverity;
      throw new Error(`Unhandled severity case: ${exhaustiveSeverityValues}`);
    }
  }
}
