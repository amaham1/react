import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from'react-redux'
import { combineReducers, createStore } from 'redux';

let alertNoraml = true;

function reducer2(state = alertNoraml, action) {
  if (action.type === '닫기') {
    state = false
    return state;
  } else {
    return state
  }
}

const normal = [
  { id: 0, name: '멋진신발', quan : 2},
  { id: 1, name: '안 멋진신발', quan : 3},
  { id: 2, name: '좀 멋진신발', quan : 4}
];

function reducer(state = normal, action) {
  if ( action.type === '수량증가') {
    let arr = [...state];
    arr[0].quan += 1;
    return arr;
  } else if ( action.type === '수량감소') {
    let arr = [...state];
    arr[0].quan -= 1;
    if (arr[0].quan < 0) {
      arr[0].quan = 0;
    }
    return arr;
  } else {
    return state;
  }  
}
const store = createStore( combineReducers({ reducer, reducer2}) );

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
