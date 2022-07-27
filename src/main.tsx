import '@fontsource/roboto';
import '@fontsource/roboto-mono';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { UniversalSnackbar } from './logger/UniversalSnackbar';
import { worker } from './mocks/browser';

worker.start({
  onUnhandledRequest: 'bypass',
  serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
});

export const appTheme = unstable_createMuiStrictModeTheme();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider maxSnack={8}>
        <UniversalSnackbar />
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
