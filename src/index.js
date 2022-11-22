import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import flagsmith from "flagsmith";
import { FlagsmithProvider } from 'flagsmith/react';

import { v4 as uuidv4 } from 'uuid';
const root = ReactDOM.createRoot(document.getElementById('root'));

function getUser(){
  const KEY = 'user';

  let user = localStorage.getItem(KEY);

  if(user)
    return user;

  user = "ab-user-" + uuidv4();

  localStorage.setItem(KEY, user);

  return user;
}

root.render(
  <React.StrictMode>
    <CssBaseline />
    <Container maxWidth="sm">
      <FlagsmithProvider
        options={{
          environmentID: 'KujiopFpqzMpdv5bQFYA8X'
        }}
        flagsmith={flagsmith}>
        <App />
      </FlagsmithProvider>
      <small>{getUser()}</small>
    </Container>
  </React.StrictMode>
);

