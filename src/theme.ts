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
      main: '#ff4081',
      light: '#FFA3D7',
      dark: '#DA0364',
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
    text: {
      primary: '#231F21',
    },

    // Grayscale Design palette: https://grayscale.design/app?lums=92.72,85.85,73.80,58.76,39.22,24.42,15.15,7.58&palettes=&filters=&names=&labels=
    grey: {
      '100': 'rgb(247, 247, 247)',
      '200': 'rgb(238, 238, 238)',
      '300': 'rgb(223, 223, 223)',
      '400': 'rgb(202, 202, 202)',
      '500': 'rgb(168, 168, 168)',
      '600': 'rgb(135, 135, 135)',
      '700': 'rgb(109, 109, 109)',
      '800': 'rgb(78, 78, 78)',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
  },
  typography: {
    subtitle1: {
      fontWeight: 500,
      textTransform: 'none',
    },
    subtitle2: {
      textTransform: 'none',
    },
    body1: {
      fontWeight: 500,
      fontSize: '1.125rem',
      textTransform: 'none',
    },
    body2: {
      fontWeight: 500,
      fontSize: '1rem',
      textTransform: 'none',
    },
  },
};

export const theme = responsiveFontSizes(createTheme(themeOptions));
