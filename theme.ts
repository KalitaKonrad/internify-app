import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createTheme';

export const themeOptions: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#3183c8',
      light: '#aad4f5',
      dark: '#1a4971',
    },
    secondary: {
      main: '#fe4332',
      light: '#fe5647',
      dark: '#e53c2d',
    },
    error: {
      main: '#dc3030',
      light: '#e36363',
      dark: '#b82020',
    },
    success: {
      main: '#38c172',
      light: '#74d99f',
      dark: '#249d57',
    },
    warning: {
      main: '#f4ca64',
      dark: '#caa53d',
      light: '#fae29f',
    },
  },
};

export const theme = responsiveFontSizes(createTheme(themeOptions));
