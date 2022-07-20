import TreeItem from '@material-ui/lab/TreeItem';
import { ObjectEntryLabel } from './ObjectEntryLabel';

function isObject(subject: unknown): subject is object {
  return typeof subject === 'object' && subject !== null;
}

interface ObjectEntryProps {
  nodeId: string;
  objectKey: string;
  objectValue: unknown;
}
export function ObjectEntry(props: ObjectEntryProps): JSX.Element {
  const { nodeId, objectKey, objectValue } = props;
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
      nodeId={nodeId}
      label={<ObjectEntryLabel objectKey={objectKey} objectValue={objectValue} />}
    >
      {children}
    </TreeItem>
  );
}
