import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import Home from './home';

const App = () => {
  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={RouteAdapter}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

const RouteAdapter = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = React.useMemo(
    () => ({
      replace(location) {
        navigate(location, { replace: true, state: location.state });
      },
      push(location) {
        navigate(location, { replace: false, state: location.state });
      },
    }),
    [navigate]
  );
  return children({ history: adaptedHistory, location });
};

const configAppProviders = (App: React.FC) => () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <App />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default configAppProviders(App);
