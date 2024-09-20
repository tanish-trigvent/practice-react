import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import router from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'components/Snackbar';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const queryClient = new QueryClient();

  return (
    <StyledEngineProvider injectFirst>
      <SnackbarProvider> <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </NavigationScroll>
      </ThemeProvider></SnackbarProvider>

    </StyledEngineProvider>
  );
};

export default App;
