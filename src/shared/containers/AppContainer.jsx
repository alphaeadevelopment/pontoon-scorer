import React, { Fragment } from 'react';
import { JssProvider, ThemeProvider } from 'react-jss';
import CssBaseline from '@material-ui/core/CssBaseline';

import { jss } from '../styles';
import WindowEventProvider from './WindowEventProvider';
import theme from '../styles/theme';
import App from './App';

export default ({ jssRegistry }) => (
  <JssProvider jss={jss} registry={jssRegistry}>
    <ThemeProvider theme={theme}>
      <WindowEventProvider>
        <Fragment>
          <CssBaseline />
          <App />
        </Fragment>
      </WindowEventProvider>
    </ThemeProvider>
  </JssProvider>
);
