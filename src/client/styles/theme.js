import createMuiTheme from 'material-ui/styles/createMuiTheme';
import teal from 'material-ui/colors/teal';
import red from 'material-ui/colors/red';
import blueGrey from 'material-ui/colors/blueGrey';

const theme = {
  palette: {
    black: 'rgba(0, 0, 0, 0.87)',
    primary: {
      main: blueGrey[600],
    },
    secondary: teal,
    error: red,
  },
  overrides: {
    MuiInput: {
      root: {
        fontSize: 'inherit',
        fontFamily: 'inherit',
      },
    },
    MuiButton: {
      root: {
        fontFamily: 'inherit',
      },
    },
    MuiTypography: {
      headline: {
        fontFamily: 'inherit',
      },
      title: {
        fontFamily: 'inherit',
      },
      subheading: {
        fontFamily: 'inherit',
        fontWeight: '500',
      },
      display1: {
        fontSize: '1.2rem',
        fontFamily: 'inherit',
      },
      display2: {
        fontSize: '1.5rem',
        fontFamily: 'inherit',
      },
      display3: {
        fontSize: '2rem',
        fontFamily: 'inherit',
      },
      display4: {
        fontSize: '2.5rem',
        fontFamily: 'inherit',
      },
      body1: {
        fontFamily: 'inherit',
      },
      body2: {
        fontFamily: 'inherit',
      },
      caption: {
        fontFamily: 'inherit',
      },
      button: {
        fontFamily: 'inherit',
      },
    },
  },
};

export default createMuiTheme(theme);
