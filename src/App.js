
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from './pages/Home'
import Details from './pages/Details'

function App() {
  
  return (
    <div style={{backgroundColor: '#56A58D'}}>
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/details" component={Details} exact />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
