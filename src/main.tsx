import React from 'react';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import '@fontsource/roboto';
import '@fontsource/roboto-mono';
import { worker } from './mocks/browser';
import { UniversalSnackbar } from './logger/UniversalSnackbar';

worker.start({
  onUnhandledRequest: 'bypass',
  serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
});

export const appTheme = unstable_createMuiStrictModeTheme();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider maxSnack={8}>
        <UniversalSnackbar />
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
