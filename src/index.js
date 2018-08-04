import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import {
  Provider
} from "react-redux";
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import reducers from './reducers/index'
import './config';
import Login from './containers/login/login';
import Register from './containers/register/register';
import BossInfo from './containers/bossinfo/bossinfo';
import CondidateInfo from "./containers/condidateinfo/condidateinfo";
import AuthRouter from './components/authroute/authroute'
import Dashboard from './components/dashboard/dashboard'
import Chat from './components/chat/chat'
import './index.css'

const store = createStore(
  reducers,
  compose(
    // 开启redux-thunk
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        {/* 对所有页面都进行权限认证 */}
        <AuthRouter />
        {/* 只要用switch包起来的 只会命中第一个,可以用来实现404 */}
        <Switch>
          <Route path="/condidateinfo" component={CondidateInfo} />
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/chat/:user" component={Chat} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);