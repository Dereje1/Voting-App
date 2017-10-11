"use strict"
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
//modules for/realted with react
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute,browserHistory} from 'react-router';
import thunk from 'redux-thunk';

//Import Created react components below
import Main from './main'
import Home from './components/home'
import PollForm from './components/newpoll'
import Display from './components/display'

//import all actions and reducers here
import reducers from './reducers/index'
import {addPoll} from './actions/pollactions'


//store declaration
const middleware = applyMiddleware(thunk,logger)
const store = createStore(reducers,middleware)


//allows you to provide/link the store , ie. redux states to the react component
//route declaration
const Routes = (
<Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home}/>
      <Route path="/newpoll" component={PollForm}/>
      <Route path="/display" component={Display}/>
    </Route>
  </Router>
</Provider>
)

render (Routes,document.getElementById('app'))
