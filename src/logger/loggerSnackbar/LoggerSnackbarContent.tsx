import { Collapse, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { SnackbarKey } from 'notistack';
import { useState } from 'react';
import { ObjectInspector } from '../../inspector/Inspector';
import { LogItem } from '../logger.types';
import { LoggerSnackbarIcon } from './LoggerSnackbarIcon';
import { closeUniSnackbar } from '../UniversalSnackbar';

const useStyles = makeStyles((theme) => ({
  headerContainer: { display: 'flex', alignItems: 'center' },
  flexGrow: { flexGrow: 1 },
  smallIcon: { height: 18, width: 18 },
  severity: { fontWeight: 'bold', textTransform: 'uppercase', marginRight: theme.spacing(0.5) },
}));

interface Props {
  notistackKey: SnackbarKey;
  selectorPrefix: string;
  logItem: LogItem;
}
export function LoggerSnackbarContent(props: Props): JSX.Element {
  const { logItem, selectorPrefix, notistackKey } = props;
  const { severity, message, metadata } = logItem;
  const classes = useStyles();
  const [metadataCollapsed, setMetadataCollapsed] = useState(false);
  return (
    <>
      <div className={classes.headerContainer}>
        <LoggerSnackbarIcon severity={severity} />
        <span className={classes.severity} data-cy={`${selectorPrefix}-logger-severity`}>
          [{severity}]
        </span>
        <span data-cy={`${selectorPrefix}-logger-message`}>{message}</span>
        <span
          data-cy={`${selectorPrefix}-logger-metadata`}
          data-stringified-metadata={JSON.stringify(metadata)}
        />
        <div className={classes.flexGrow} />
        <div>
          <Tooltip title={metadataCollapsed ? 'Hide metadata' : 'Show metadata'}>
            <IconButton
              data-cy={`${selectorPrefix}-logger-metadata-button`}
              onClick={() => setMetadataCollapsed(!metadataCollapsed)}
              color="inherit"
              size="small"
              className={classes.smallIcon}
            >
              {metadataCollapsed ? (
                <ExpandMoreIcon className={classes.smallIcon} />
              ) : (
                <ExpandLessIcon className={classes.smallIcon} />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Dismiss">
            <IconButton
              data-cy={`${selectorPrefix}-logger-dismiss-button`}
              onClick={() => closeUniSnackbar(notistackKey)}
              color="inherit"
              size="small"
              className={classes.smallIcon}
            >
              <CloseIcon className={classes.smallIcon} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Collapse in={metadataCollapsed}>
        <ObjectInspector data={{ metadata }} expandPaths={['metadata']} />
      </Collapse>
    </>
  );
}
