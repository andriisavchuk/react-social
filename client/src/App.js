import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from './components/layout/Navbar';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={ Main } />
          <div className="container">
            <Route exact path="/signup" component={ Signup } />
            <Route exact path="/login" component={ Login } />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;