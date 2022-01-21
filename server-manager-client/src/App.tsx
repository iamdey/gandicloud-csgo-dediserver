import preset from '@rebass/preset-material';
import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Box } from 'rebass';
import Header from './layout/Header';
import Home from './scenes/Home';
import './styles.css';

const theme = {
  ...preset,
  buttons: {
    ...preset.buttons,
    primary: {
      ...preset.buttons.primary,
      ':disabled': {
        bg: 'muted',
        color: 'text',
      },
    },
  },
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

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Box variant="styles.root">
          <Header />
          <Home />
        </Box>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
