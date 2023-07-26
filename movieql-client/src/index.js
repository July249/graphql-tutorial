import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import client from './client';
// Step 4. Connect your client to React
import { ApolloProvider } from '@apollo/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
