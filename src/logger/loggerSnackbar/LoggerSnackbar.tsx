import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { SnackbarContent, SnackbarKey } from 'notistack';
import { forwardRef } from 'react';
import { LoggerOptions, LogItem } from '../logger.types';
import { LoggerSnackbarContent } from './LoggerSnackbarContent';
import { loggerToMuiSeverity } from '../utilities';

const useStyles = makeStyles(() => ({
  alertIcon: { display: 'none' },
  debugAlert: { backgroundColor: 'grey' },
}));

interface Props {
  notistackKey: SnackbarKey;
  logItem: LogItem;
  logOptions: LoggerOptions;
}

export const LoggerSnackbar = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    notistackKey,
    logItem,
    logOptions: { snackbarSelectorPrefix },
  } = props;
  const classes = useStyles();
  const cypressSelectorPrefix = snackbarSelectorPrefix || notistackKey.toString();
  return (
    <SnackbarContent ref={ref}>
      <Alert
        data-cy={`${cypressSelectorPrefix}-logger-alert`}
        data-notistack-key={notistackKey}
        severity={loggerToMuiSeverity(logItem.severity)}
        variant="filled"
        classes={{ icon: classes.alertIcon, filledSuccess: classes.debugAlert }}
      >
        <LoggerSnackbarContent
          logItem={logItem}
          selectorPrefix={cypressSelectorPrefix}
          notistackKey={notistackKey}
        />
      </Alert>
    </SnackbarContent>
  );
});
