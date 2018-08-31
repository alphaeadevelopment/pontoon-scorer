import React from 'react';

// import { MuiThemeProvider } from 'material-ui/styles';
import { PageContainer } from 'page-container';
import Footer from './Footer';
import Header from './Header';
import Body from './Body';

class RawApp extends React.Component {
  render() {
    return (
      <PageContainer footer={<Footer />} header={<Header />}>
        <Body />
      </PageContainer>
    );
  }
}

export default RawApp;
