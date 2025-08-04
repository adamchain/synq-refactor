import moment from "moment-timezone";

const utcToLocal = (input, format) => {
  return input && format
    ? moment.utc(input, format).tz("America/New_York")
    : null;
};

const localToUtc = (input) => {
  return input ? input.utc() : null;
};

const momentLocal = moment;

export { utcToLocal, localToUtc, momentLocal };
