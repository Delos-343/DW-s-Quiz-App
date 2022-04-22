import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import '../node_modules/@mdi/font/css/materialdesignicons.min.css';
// import '../node_modules/materialize-css/dist/css/materialize.min.css';
// import '../node_modules/materialize-css/dist/js/materialize.min.js';

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";




// const client = new ApolloClient({
//   uri: 'https://light-bonefish-89.hasura.app/v1/graphql',
//   cache: new InMemoryCache()
// });

// const client = new ApolloClient({
//     link: new HttpLink({
//     uri: "https://light-bonefish-89.hasura.app/v1/graphql",
//     headers: {
//         'content-type': 'application/json',
//         'x-hasura-admin-secret': ``
//     }
// }),

// });

const client = new ApolloClient({
  uri: "https://light-bonefish-89.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'no-cors',
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
