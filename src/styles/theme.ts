import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    placement: Palette['primary'];
    result: Palette['primary'];
    event: Palette['primary'];
    critical: Palette['primary'];
  }
  interface PaletteOptions {
    placement?: PaletteOptions['primary'];
    result?: PaletteOptions['primary'];
    event?: PaletteOptions['primary'];
    critical?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    placement: true;
    result: true;
    event: true;
    critical: true;
  }
}

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      primary: {
        light: '#818cf8',
        main: '#4f46e5', // Indigo
        dark: '#3730a3',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#f472b6',
        main: '#db2777', // Pink/Magenta
        dark: '#be185d',
        contrastText: '#ffffff',
      },
      placement: {
        light: '#d1fae5',
        main: '#10b981', // Emerald Green
        dark: '#047857',
        contrastText: '#ffffff',
      },
      result: {
        light: '#fef3c7',
        main: '#f59e0b', // Amber
        dark: '#b45309',
        contrastText: '#ffffff',
      },
      event: {
        light: '#ede9fe',
        main: '#8b5cf6', // Violet
        dark: '#6d28d9',
        contrastText: '#ffffff',
      },
      critical: {
        light: '#fee2e2',
        main: '#ef4444', // Red
        dark: '#b91c1c',
        contrastText: '#ffffff',
      },
      info: {
        light: '#ecfeff',
        main: '#06b6d4', // Cyan
        dark: '#0e7490',
        contrastText: '#ffffff',
      },
      background: {
        default: '#f8fafc', // Slate 50
        paper: '#ffffff',
      },
      text: {
        primary: '#0f172a', // Slate 900
        secondary: '#475569', // Slate 600
      },
    },
    typography: {
      fontFamily: ['Inter', 'system-ui', 'sans-serif'].join(','),
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: {
        fontSize: '3rem',
        fontWeight: 700,
        lineHeight: 1.1,
      },
      h2: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.15,
      },
      h3: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h4: {
        fontSize: '1.75rem',
        fontWeight: 700,
        lineHeight: 1.25,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
      },
      body1: {
        fontSize: '1rem',
      },
      body2: {
        fontSize: '0.95rem',
      },
      button: {
        textTransform: 'none',
        fontWeight: 700,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: '#f8fafc',
            margin: 0,
            fontFamily: ['Inter', 'system-ui', 'sans-serif'].join(','),
            color: '#0f172a',
          },
          '#root': {
            minHeight: '100vh',
          },
          a: {
            textDecoration: 'none',
            color: 'inherit',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: 'none',
          },
        },
        defaultProps: {
          disableElevation: true,
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 700,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  }),
);

export default theme;
