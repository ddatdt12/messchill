import { createTheme } from '@mui/material/styles';

const { blue, red, grey } = require('@mui/material/colors');

//#f0f2f5
export const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'lightgray' },
          style: {
            textTransform: 'none',
            backgroundColor: grey[300],
            fontWeight: 700,
            '&:hover': {
              backgroundColor: grey[400],
            },
          },
        },
      ],
    },
  },
  typography: {
    fontFamily: 'Public Sans, sans-serif',
  },
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: '#ff5722',
    },
    textBox: {
      main: '#f0f2f5',
      dark: '#606770;',
      contrastText: '#000',
    },
    common: {
      inputBackground: '#f0f2f5',
      secondary: 'lightgray',
      placeHolderText: '#8a8d91',
    },
  },
});
