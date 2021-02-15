import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import MyError from './Error/Error';
import Header from './Header/Header';
import Logs from './logs/logs';
import AgentLogs from './agent-logs/agent-logs';
import CallLogs from './call-logs/call-logs';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Header></Header>
        <div className="header">
          <h1 className="app-title">
            Call Log App
        </h1>
        </div>
        <Switch>
          <Route path="/" exact component={Logs} />
          <Route path="/agent-logs/:id" exact component={AgentLogs} />
          <Route path="/call-logs/:id" exact component={CallLogs} />
        :id
          <Route component={MyError} />
        </Switch>
      </div>
    );
   
  }
}

export default App;
