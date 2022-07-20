import { Button, Typography } from '@material-ui/core';
import { logger } from './logger/logger';
import { getLoggerState } from './logger/loggerStore';
import { nuclear } from './testObjects';
import { worker } from './mocks/browser';

export function App(): JSX.Element {
  return (
    <div style={{ margin: 10 }}>
      <Typography>Splunk HEC mock</Typography>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          variant="outlined"
          onClick={() => {
            worker.start({
              onUnhandledRequest: 'bypass',
              serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
            });
          }}
        >
          enable
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            worker.stop();
          }}
        >
          disable
        </Button>
      </div>
      <br />
      <Typography>Invoke logger</Typography>

      <div style={{ display: 'flex', gap: 10 }}>
        <Button variant="outlined" onClick={() => logger.debug('all systems nominal.', nuclear)}>
          debug
        </Button>
        <Button variant="outlined" onClick={() => logger.info('neutron levels elevated.', nuclear)}>
          info
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            logger.warn('approaching critical limit, fire control rods immediately.', nuclear)
          }
        >
          warn
        </Button>
        <Button
          variant="outlined"
          onClick={() => logger.error('meltdown imminent, evacuate.', nuclear)}
        >
          error
        </Button>
        <Button variant="outlined" onClick={() => console.log(getLoggerState())}>
          output loggerStore
        </Button>
        <Button variant="outlined" onClick={() => getLoggerState().forwardEventsToSplunk()}>
          fwd to splunk
        </Button>
      </div>
    </div>
  );
}
