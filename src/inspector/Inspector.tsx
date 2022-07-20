import CollapseIcon from '@material-ui/icons/ChevronRight';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import TreeView from '@material-ui/lab/TreeView';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import { ObjectEntry } from './ObjectEntry';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 'calc(100vh / 4)',
    overflowY: 'auto',
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.breakpoints.values.md,
    },
    marginTop: theme.spacing(1),
    background: blueGrey[900],
    borderRadius: theme.spacing(0.5),
    borderWidth: 1,
    borderColor: theme.palette.divider,
    borderStyle: 'solid',
    padding: theme.spacing(1),
  },
}));

interface InspectorProps {
  data: unknown;
  expandPaths: string[];
}
export function ObjectInspector(props: InspectorProps): JSX.Element {
  const { data, expandPaths } = props;
  const classes = useStyles();
  const keyPrefix = '$ROOT';
  const defaultExpanded = React.useMemo(
    () =>
      Array.isArray(expandPaths)
        ? expandPaths.map((expandPath) => `${keyPrefix}.${expandPath}`)
        : [],
    [keyPrefix, expandPaths]
  );
  // for default*  to take effect we need to remount
  const key = React.useMemo(() => defaultExpanded.join(''), [defaultExpanded]);

  if (data === null || typeof data !== 'object') {
    return <div>data not object</div>;
  }

  return (
    <div className={classes.root}>
      <TreeView
        key={key}
        defaultCollapseIcon={<ExpandIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        defaultExpanded={defaultExpanded}
        defaultExpandIcon={<CollapseIcon />}
      >
        {Object.keys(data).map((objectKey) => {
          const dataObj = data as Record<string, unknown>;
          return (
            <ObjectEntry
              key={objectKey}
              nodeId={`${keyPrefix}.${objectKey}`}
              objectKey={objectKey}
              objectValue={dataObj[objectKey]}
            />
          );
        })}
      </TreeView>
    </div>
  );
}
