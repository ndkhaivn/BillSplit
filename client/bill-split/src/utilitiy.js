import moment from "moment";
import config from "./config";

export const fromDateFormat = (dateString) => {
  return moment.utc(dateString, config.date_format).toDate();
}

export const toDateFormat = (date) => {
  return moment(date).format(config.date_format);
}

export const minDate = (date1, date2) => {
  return date1 < date2 ? date1 : date2;
}

export const maxDate = (date1, date2) => {
  return date1 < date2 ? date2 : date1;
}