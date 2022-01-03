import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MealsContextProvider } from './contex/mealscontext';
import { UserContextProvider } from './contex/usercontext';
import reportWebVitals from './reportWebVitals';
import "./styles/styles.scss"

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <MealsContextProvider>
        <App />
      </MealsContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
