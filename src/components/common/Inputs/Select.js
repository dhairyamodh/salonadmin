import React from "react";
import InputContainer from "./InputContainer";

const MyTextField = React.forwardRef((props, ref) => {
  const {
    label,
    name,
    options,
    optionLabelProp,
    optionValueProp,
    placeholder,
    multiline,
    rows,
    error,
    defaultOption,
    size,
    noPadding,
    required,
    defaultValue
  } = props;
  const handleChange = (e) => {
    let target = {
      name,
      value: e.target.value,
    };
    console.log("target", target);
    let newEvent = { target: target };

    props.onChange(newEvent);
  }
  return (
    <InputContainer
      noPadding={noPadding}
      size={size}
      label={label}
      error={error}
    >
      {required && <span className="text-danger"> *</span>}
      <select
        name={name}
        class="form-control"
        onChange={handleChange}
        defaultValue={defaultValue}
      >
        {defaultOption && defaultOption()}
        {options?.map((opt, index) => {
          return (
            <option
              value={optionValueProp ? opt[optionValueProp] : opt}
              key={index}
            >
              {opt[optionLabelProp]}
            </option>
          );
        })}
      </select>
    </InputContainer>
  );
});
export default MyTextField;
