import blueGrey from '@material-ui/core/colors/blueGrey';
import teal from '@material-ui/core/colors/teal';
import { lighten, makeStyles } from '@material-ui/core/styles';
import TreeItem from '@material-ui/lab/TreeItem';
import { ObjectEntryLabel } from './ObjectEntryLabel';

function isObject(subject: unknown): subject is object {
  return typeof subject === 'object' && subject !== null;
}

const useStyles = makeStyles((theme) => ({
  treeItemLabel: {
    fontFamily: 'Roboto Mono',
    fontSize: '0.8rem',
  },
  treeItem: {
    '&:focus > $treeItemContent': {
      backgroundColor: lighten(teal[900], 0.08),
    },
  },
  treeItemContent: {
    paddingLeft: theme.spacing(0.5),
    borderRadius: theme.spacing(3),
    '&:hover': {
      backgroundColor: lighten(blueGrey[800], 0.04),
    },
  },
}));

interface ObjectEntryProps {
  nodeId: string;
  objectKey: string;
  objectValue: unknown;
}
export function ObjectEntry(props: ObjectEntryProps): JSX.Element {
  const { nodeId, objectKey, objectValue } = props;
  const classes = useStyles();
  const keyPrefix = nodeId;
  let children = null;

  if (isObject(objectValue) || typeof objectValue === 'function') {
    children =
      Object.keys(objectValue).length === 0
        ? undefined
        : Object.keys(objectValue).map((key) => {
            const ObjectValue = objectValue as Record<string, unknown>;
            return (
              <ObjectEntry
                key={key}
                nodeId={`${keyPrefix}.${key}`}
                objectKey={key}
                objectValue={ObjectValue[key]}
              />
            );
          });
  }

  return (
    <TreeItem
      classes={{
        label: classes.treeItemLabel,
        content: classes.treeItemContent,
        root: classes.treeItem,
      }}
      nodeId={nodeId}
      label={<ObjectEntryLabel objectKey={objectKey} objectValue={objectValue} />}
    >
      {children}
    </TreeItem>
  );
}
