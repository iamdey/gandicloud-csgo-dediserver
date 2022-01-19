import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import preset from '@rebass/preset-material';
import Header from './layout/Header';
import Home from './scenes/Home';
import { Box } from 'rebass';

const theme = {
  ...preset,
  styles: {
    ...preset.styles,
    root: {
      ...preset.styles.root,
      maxWidth: '600px',
      marginX: 'auto',
      padding: 4,
      backgroundColor: '#eee',
    },
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box variant="styles.root">
        <Header />
        <Home />
      </Box>
    </ThemeProvider>
  );
}

export default App;
