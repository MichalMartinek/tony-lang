import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Plan from './Plan'
import Cookbook from './Cookbook'
import '../style.css'

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>TonyLang</h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about-us">About</Link></li>
            <li><Link to="/board">Board</Link></li>
            <li><Link to="/cookbook">Cookbook</Link></li>
          </ul>
        </header>
    
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
          <Route exact path="/board" component={Plan} />
          <Route exact path="/cookbook" component={Cookbook} />
        </main>
      </div>
    );
  }
}

export default App


