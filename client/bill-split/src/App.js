import React from "react";
import "./App.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import DefaultLayout from "./layouts/Default"
import axios from "axios";
import store from "./redux/store";
import { Provider } from "react-redux";

axios.defaults.baseURL =
  'https://asia-east2-billsplit-3de9c.cloudfunctions.net/api';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" render={props => <DefaultLayout/>} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
