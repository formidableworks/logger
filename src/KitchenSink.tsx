import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { logger } from './logger/logger';
import { nuclear, pokedex } from './testObjects';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
  },
}));

export function KitchenSink(): JSX.Element {
  const classes = useStyles();
  return (
    <div>
      <div>
        <div>
          <SyntaxHighlighter language="typescript" style={a11yDark}>
            {"logger.info('do not output to console.', {...}, { console: false });"}
          </SyntaxHighlighter>
          <Button
            variant="outlined"
            onClick={() => logger.info('do not output to console.', nuclear, { console: false })}
          >
            disable console
          </Button>
        </div>
        <br />

        <div>
          <SyntaxHighlighter language="typescript" style={a11yDark}>
            {"logger.info('include a console trace.', {...}, { consoleTrace: true });"}
          </SyntaxHighlighter>
          <Button
            variant="outlined"
            onClick={() => logger.info('include a console trace.', nuclear, { consoleTrace: true })}
          >
            use console.trace
          </Button>
        </div>
        <br />

        <div>
          <SyntaxHighlighter language="typescript" style={a11yDark}>
            {"logger.info('do not emit a snackbar.', {...}, { snackbar: false })"}
          </SyntaxHighlighter>
          <Button
            variant="outlined"
            onClick={() => logger.info('do not emit a snackbar.', nuclear, { snackbar: false })}
          >
            disable snackbar
          </Button>
        </div>
        <br />

        <div>
          <SyntaxHighlighter language="typescript" style={a11yDark}>
            {
              "logger.info('add a custom selector to various snackbar parts to aid testing.', {...}, { snackbarSelectorPrefix: 'myCustomSelector' })"
            }
          </SyntaxHighlighter>
          <Button
            variant="outlined"
            onClick={() =>
              logger.info('add a custom selector to aid testing.', nuclear, {
                snackbarSelectorPrefix: 'myCustomSelector',
              })
            }
          >
            with selector
          </Button>
        </div>
        <br />
      </div>
      <div className={classes.buttonContainer}>
        <Button
          variant="outlined"
          onClick={() => {
            logger.info('cakey metadata object.', {
              id: '0001',
              type: 'donut',
              name: 'Cake',
              ppu: 0.55,
              batters: {
                batter: [
                  { id: '1001', type: 'Regular' },
                  { id: '1002', type: 'Chocolate' },
                  { id: '1003', type: 'Blueberry' },
                  { id: '1004', type: "Devil's Food" },
                ],
              },
              topping: [
                { id: '5001', type: 'None' },
                { id: '5002', type: 'Glazed' },
                { id: '5005', type: 'Sugar' },
                { id: '5007', type: 'Powdered Sugar' },
                { id: '5006', type: 'Chocolate with Sprinkles' },
                { id: '5003', type: 'Chocolate' },
                { id: '5004', type: 'Maple' },
              ],
            });
          }}
        >
          some different metadata
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            logger.info('huge json', pokedex);
          }}
        >
          unreasonably large metadata (14k+ lines).
        </Button>
      </div>
    </div>
  );
}
