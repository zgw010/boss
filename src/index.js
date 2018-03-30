import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose }from 'redux';
import thunk from 'react-thunk';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import App from './App';
import reducer from './reducers'
import './config';
import Login from './containers/login/login';
import Register from './containers/register/register';
import AuthRouter from './components/authroute/authroute'
/* const store = createStore(reducer,compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
)) */

ReactDOM.render(
  <Provider /* store={store} */>
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
if (module.hot) {
  module.hot.accept();
}

