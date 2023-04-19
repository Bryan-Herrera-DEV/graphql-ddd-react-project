import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});


const authLink = setContext(async (_, {headers}) => {
  // auth: state.token is the token saved in local storage
  const token = JSON.parse(localStorage.getItem('auth') || 'null').state.token;
  return {
    headers: {
      ...headers,
      Authorization: token ? `${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
      <Toaster position="bottom-center" />
    </ApolloProvider>
  </React.StrictMode>
);
