import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import './exercise';
import rootReducer from './modules/root';
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
// import myLogger from './middleware/myLogger';
import {logger} from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';

// RTK (Redux Toolkit) -> @reduxjs/toolkit로 redux, redux-devtools-extension기타 등등 한번에 설치 가능
// createStore -> configureStore 
// rootReducer 말고 바로 {reducer1, reducer2, ...} 로 넣어줄 수 있다
// middleware도 바로 넣어줄 수 있다
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, ReduxThunk),
});
// console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
