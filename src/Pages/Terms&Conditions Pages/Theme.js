import { createTheme } from '@mui/material/styles';

/**
 * Shahi Dry Fruits — brand theme
 * ---------------------------------------------------------------
 * Palette is built around the roasted-shell brown (#7A4531) the
 * brand is known for, paired with a warm almond-cream background
 * (rather than stark white) and a dried-apricot gold used sparingly
 * for dividers, chips and hover states.
 */

export const brand = {
  brown: '#7A4531',      // primary — roasted cashew shell
  brownDark: '#4A2A1D',  // espresso — headings, high-contrast text
  brownLight: '#A9714F', // toasted almond — tints, hovers
  gold: '#C08A4E',       // dried apricot — accents, dividers
  cream: '#FBF6EF',      // almond flesh — page background
  white: '#FFFFFF',
  ink: '#3A2A20',         // body copy
  inkMuted: '#7A6A5E',    // secondary copy
  line: 'rgba(122, 69, 49, 0.14)',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: brand.brown,
      dark: brand.brownDark,
      light: brand.brownLight,
      contrastText: brand.white,
    },
    secondary: {
      main: brand.gold,
      contrastText: brand.brownDark,
    },
    background: {
      default: brand.cream,
      paper: brand.white,
    },
    text: {
      primary: brand.ink,
      secondary: brand.inkMuted,
    },
    divider: brand.line,
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    h1: { fontFamily: '"Fraunces", "Georgia", serif', fontWeight: 600 },
    h2: { fontFamily: '"Fraunces", "Georgia", serif', fontWeight: 600 },
    h3: { fontFamily: '"Fraunces", "Georgia", serif', fontWeight: 600 },
    h4: { fontFamily: '"Fraunces", "Georgia", serif', fontWeight: 600 },
    h5: { fontFamily: '"Fraunces", "Georgia", serif', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;