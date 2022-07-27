import Button from '@material-ui/core/Button';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { logger } from './logger/logger';
import { nuclear } from './testObjects';

export function Demo(): JSX.Element {
  const codeString = "logger.debug('all systems nominal.', {status: 'nominal', ...})";
  return (
    <div>
      <div>
        <SyntaxHighlighter language="typescript" style={a11yDark}>
          {codeString}
        </SyntaxHighlighter>
        <Button variant="outlined" onClick={() => logger.debug('all systems nominal.', nuclear)}>
          Debug
        </Button>
      </div>
      <br />
      <div>
        <SyntaxHighlighter language="typescript" style={a11yDark}>
          {"logger.info('neutron levels elevated.', {status: 'anomaly detected', ...})"}
        </SyntaxHighlighter>
        <Button
          variant="outlined"
          onClick={() =>
            logger.info('neutron levels elevated.', { ...nuclear, status: 'anomaly detected' })
          }
        >
          Info
        </Button>
      </div>
      <br />
      <div>
        <SyntaxHighlighter language="typescript" style={a11yDark}>
          {
            "logger.warn('exceeded criticality. fire control rods.', {status: 'exceeded criticality', ...})"
          }
        </SyntaxHighlighter>
        <Button
          variant="outlined"
          onClick={() =>
            logger.warn('meltdown imminent, evacuate.', {
              ...nuclear,
              status: 'exceeded criticality',
            })
          }
        >
          Warn
        </Button>
      </div>
      <br />
      <div>
        <SyntaxHighlighter language="typescript" style={a11yDark}>
          {"logger.error('meltdown imminent, evacuate.', {status: 'evacuate', ...})"}
        </SyntaxHighlighter>
        <Button
          variant="outlined"
          onClick={() =>
            logger.error('meltdown imminent, evacuate.', {
              ...nuclear,
              status: 'yer probs ded pal',
            })
          }
        >
          Error
        </Button>
      </div>
    </div>
  );
}
