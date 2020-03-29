import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import DefaultLayout from "./layouts/Default"


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" render={props => <DefaultLayout/>} />
      </Switch>
    </BrowserRouter>


  );
}

export default App;
