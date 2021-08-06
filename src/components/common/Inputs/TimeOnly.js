import React from "react";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "moment";
import { TIMEONLY } from "../../../contants";
const TimeOnly = ({ onChange, value }) => {
  function handleChange(value) {
    value && onChange(value.format(TIMEONLY));
  }

  const pickerValue = value
    ? moment(value, TIMEONLY)
    : moment("00:00", TIMEONLY);
  return (
    <div>
      <TimePicker
        showSecond={false}
        defaultValue={pickerValue}
        format={TIMEONLY}
        onChange={handleChange}
      />
    </div>
  );
};

export default TimeOnly;
