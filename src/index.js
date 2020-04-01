import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import India from './components/Route-India/India'
import Links from './components/Links'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

const routing=(
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route exact path="/india" component={India}/>
      <Route exact path="/Links" component={Links}/>
    </div>
  </Router>
)

ReactDOM.render( routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
