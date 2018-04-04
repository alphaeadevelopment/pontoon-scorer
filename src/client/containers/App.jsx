import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import theme from '../styles/theme';
import Errors from './Errors';
import Footer from './Footer';
import Body from './Body';

class RawApp extends React.Component {
  state = {
    footerHeight: 0,
  }
  setFooterHeight = (h) => {
    this.setState({ footerHeight: h });
  }
  render() {
    const { footerHeight } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Body {...this.props} footerHeight={footerHeight} />
          <Footer onSetFooterHeight={this.setFooterHeight} />
          <Errors />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default RawApp;
