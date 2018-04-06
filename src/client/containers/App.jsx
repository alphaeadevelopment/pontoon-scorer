import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { PageContainer } from 'page-container';
import theme from '../styles/theme';
import Footer from './Footer';
import Header from './Header';
import Body from './Body';

class RawApp extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <PageContainer footer={<Footer />} header={<Header />}>
          <Body />
        </PageContainer>
      </MuiThemeProvider>
    );
  }
}

export default RawApp;
