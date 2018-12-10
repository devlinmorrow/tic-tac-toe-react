//@format

import React, {Component} from 'react';
import './App.css';
import {Switch, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {PlayGameView} from './Views/PlayGameView';
import {WelcomeView} from './Views/WelcomeView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={WelcomeView} />
            <Route exact path="/hvh" component={PlayGameView} />
            <Route exact path="/hvuc" component={PlayGameView} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
