import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { JssProvider, ThemeProvider } from 'react-jss';
import CssBaseline from '@material-ui/core/CssBaseline';

import { jss } from '../styles';
import WindowEventProvider from './WindowEventProvider';
import theme from '../styles/theme';
import App from './App';

@withRouter
class AppContainer extends Component {
  render() {
    const { jssRegistry, ...rest } = this.props;
    return (
      <JssProvider jss={jss} registry={jssRegistry}>
        <ThemeProvider theme={theme}>
          <WindowEventProvider>
            <Fragment>
              <CssBaseline />
              <App {...rest} />
            </Fragment>
          </WindowEventProvider>
        </ThemeProvider>
      </JssProvider>
    );
  }
}

export default AppContainer;
