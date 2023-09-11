import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import App from './components/App/App';


const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(
  <React.StrictMode>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
    </LocalizationProvider>
  </React.StrictMode>
);
