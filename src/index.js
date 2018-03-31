import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose }from 'redux';
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import App from './App';
import reducers from './reducers/index'
import './config';
import Login from './containers/login/login';
import Register from './containers/register/register';
import AuthRouter from './components/authroute/authroute'
import './index.css'
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRouter></AuthRouter>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
