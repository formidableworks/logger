import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getLoggerState } from './logger/loggerStore';
import { worker } from './mocks/browser';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    gap: theme.spacing(2),
  },
}));

export function DebugControls(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.buttonContainer}>
      <Button
        variant="outlined"
        onClick={() => {
          worker.start({
            onUnhandledRequest: 'bypass',
            serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
          });
        }}
      >
        enable msw (default)
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          worker.stop();
        }}
      >
        disable msw
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          // eslint-disable-next-line no-console
          console.log(getLoggerState());
        }}
      >
        output loggerStore
      </Button>
      <Button variant="outlined" onClick={() => getLoggerState().forwardEventsToSplunk()}>
        push events to splunk
      </Button>
    </div>
  );
}
