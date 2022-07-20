import { lightBlue, purple, teal } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { FunctionLikeDeclaration } from 'typescript';

function getType(value: unknown) {
  if (Array.isArray(value)) {
    return 'array';
  }

  if (value === null) {
    return 'null';
  }

  return typeof value;
}

function getValueWithToken(
  value: unknown,
  type: ReturnType<typeof getType>
): { value: string; token: string } {
  switch (type) {
    case 'array': {
      const val = value as Array<unknown>;
      return { value: 'array', token: `[${val.length}]` };
    }
    case 'bigint': {
      const val = value as bigint;
      return { value: String(val), token: 'bigint' };
    }
    case 'boolean': {
      const val = value as boolean;
      return { value: String(val), token: 'boolean' };
    }
    case 'function': {
      const val = value as FunctionLikeDeclaration;
      return { value: 'function', token: `${val.name || 'fn'}()` };
    }
    case 'null':
      return { value: 'null', token: '' };
    case 'number': {
      const val = value as number;
      return { value: String(val), token: 'number' };
    }
    case 'object': {
      const val = value as Record<string, string>;
      return { value: 'object', token: `{${Object.keys(val).length}}` };
    }
    case 'string': {
      const val = value as string;
      return { value: `"${val}"`, token: 'string' };
    }
    case 'symbol': {
      const val = value as symbol;
      return { value: String(val), token: 'symbol' };
    }
    case 'undefined':
      return { value: 'undefined', token: '' };
    default: {
      const exhaustiveTypeValues: never = type;
      throw new Error(`Unhandled type case: ${exhaustiveTypeValues}`);
    }
  }
}

const useStyles = makeStyles((theme) => ({
  key: {
    color: lightBlue[500],
    marginRight: theme.spacing(1),
    fontFamily: 'Roboto Mono',
  },
  value: {
    color: teal.A400,
    marginRight: theme.spacing(1),
    fontFamily: 'Roboto Mono',
  },
  token: {
    color: purple.A100,
    marginRight: theme.spacing(1),
    fontFamily: 'Roboto Mono',
  },
}));

interface Props {
  objectKey: string;
  objectValue: unknown;
}
export function ObjectEntryLabel(props: Props): JSX.Element {
  const { objectKey, objectValue } = props;
  const classes = useStyles();
  const type = getType(objectValue);
  const { value, token } = getValueWithToken(objectValue, type);

  return (
    <>
      <span className={classes.key}>{objectKey}:</span>
      <span className={classes.value}>{value}</span>
      <span className={classes.token}>{token}</span>
    </>
  );
}
