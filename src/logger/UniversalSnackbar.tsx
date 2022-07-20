import { ProviderContext, useSnackbar } from 'notistack';

let snackbarContext: null | ProviderContext = null;

export function UniversalSnackbar(): JSX.Element {
  snackbarContext = useSnackbar();
  return <div className="UniversalSnackbar" />;
}

type EnqueueSnackbar = ProviderContext['enqueueSnackbar'];
export const enqueueUniSnackbar: EnqueueSnackbar = (message, options) => {
  if (snackbarContext === null) {
    throw new Error('snackbarContext is not initialised.');
  }
  return snackbarContext.enqueueSnackbar(message, options);
};

type CloseSnackbar = ProviderContext['closeSnackbar'];
export const closeUniSnackbar: CloseSnackbar = (key) => {
  if (snackbarContext === null) {
    throw new Error('snackbarContext is not initialised.');
  }
  return snackbarContext.closeSnackbar(key);
};
