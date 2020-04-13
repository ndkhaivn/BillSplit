import moment from "moment";
import config from "./config";

export const isDateFormat = (string) => {
  return moment(string, config.date_format, true).isValid();
}

export const fromDateFormat = (dateString) => {
  if (!dateString) {
    return null;
  }
  return moment.utc(dateString, config.date_format).toDate();
}

export const toDateFormat = (date) => {
  return moment(date).format(config.date_format);
}

export const shortDateFormat = (date) => {
  return moment(date).format(config.short_date_format);
}

export const localToUTC = (date) => {
  if (!date) {
    return null;
  }
  // Get date string
  var dateString = moment(date, config.date_format).format(config.date_format);
  return fromDateFormat(dateString);
}

export const minDate = (date1, date2) => {
  return date1 < date2 ? date1 : date2;
}

export const maxDate = (date1, date2) => {
  return date1 < date2 ? date2 : date1;
}

export const findTenant = (tenants, tenantId) => {
  const tenant = tenants.find(tenant => tenant.tenantId === tenantId);
  return tenant;
}

export const daysDiff = (date1, date2) => {
  date1 = moment(date1);
  date2 = moment(date2);
  return date2.diff(date1, 'days') + 1;
}