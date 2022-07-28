import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DebugControls } from './DebugControls';
import { Demo } from './Demo';
import { KitchenSink } from './KitchenSink';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    maxWidth: theme.breakpoints.values.md,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  buttonContainer: {
    display: 'flex',
    gap: theme.spacing(2),
  },
}));

export function App(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h2">Logger Demo</Typography>
      <Typography variant="h5">Simple frontend logger.</Typography>
      <ul>
        <li>API has sensible defaults but can also be overidden on a per-call basis.</li>
        <li>Can be invoked from React or JavaScript.</li>
        <li>Current outputs are browser console, material-ui snackbar, Splunk HEC.</li>
        <li>Custom snackbar with metadata inspector for technical end-users.</li>
        <li>Plays nice with material-ui@4.0.0^ and notistack@latest-mui-v4.</li>
        <li>Log events will be stored and push to splunk periodically.</li>
        <li>All logger commands have type-ahead for improved DX. &#10084; TypeScript.</li>
      </ul>
      <Typography variant="h5">Demo</Typography>
      <Typography>
        Open the browsers console to see logger output and intercepted network requests.
      </Typography>
      <Demo />
      <br />
      <Typography variant="h5">Debug controls</Typography>
      <DebugControls />
      <br />
      <Typography variant="h5">Kitchen sink</Typography>
      <KitchenSink />
      <br />
      <Typography variant="h5">To Do</Typography>
      <ul>
        <li>
          Add a serialisable check/transform to metadata. -- unserialisable data will cause issues
          when calling JSON.stringify before pushing to splunk.
        </li>
      </ul>
    </div>
  );
}
