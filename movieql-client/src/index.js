import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import client from './client';
// Step 4. Connect your client to React
import { ApolloProvider } from '@apollo/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* ApolloProvider로 App을 감쌌기 때문에 어느 컴포넌트에서나 client에 접근이 가능하다. */}
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
