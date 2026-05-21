import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // 1. Provider import karein
import { store } from './app/store';       // 2. Apna store import karein
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* for passing the store*/}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);