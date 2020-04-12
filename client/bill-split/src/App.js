import React from "react";
import "./App.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import DefaultLayout from "./layouts/Default"
import axios from "axios";
import store from "./redux/store";
import { Provider } from "react-redux";
import { toDateFormat, fromDateFormat, isDateFormat } from "./utilitiy";
import _ from "lodash";

axios.defaults.baseURL =
  'http://localhost:5000/billsplit-3de9c/asia-east2/api';

const DATE_TO_STRING = "DATE_TO_STRING";
const STRING_TO_DATE = "STRING_TO_DATE";

// Recursively iterate through all properties
// and convert to/from date format
function recursiveFormatDate(object, mode) {
  for (let key in object) {
    if (typeof object[key] === "string" && isDateFormat(object[key]) && mode === STRING_TO_DATE) {
      object[key] = fromDateFormat(object[key]);
    } else if (typeof object[key] === "object" && object[key] instanceof Date && mode === DATE_TO_STRING) {
      object[key] = toDateFormat(object[key]);
    } else if (typeof object[key] === "object" && object[key] !== null) {
      recursiveFormatDate(object[key], mode);
    }
  }
}

axios.interceptors.request.use(function (config) {

  if (!config.data) {
    return config;
  }

  const formattedData = _.cloneDeep(config.data);
  recursiveFormatDate(formattedData, DATE_TO_STRING);

  config.data = formattedData;
  
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  recursiveFormatDate(response.data, STRING_TO_DATE);
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  return Promise.reject(error);
});

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
