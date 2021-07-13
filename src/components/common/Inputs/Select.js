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
    defaultValue,
    onChange,
  } = props;
  const handleChange = (e) => {
    let target = {
      name,
      value: e.target.value,
    };
    let newEvent = { target: target };

    onChange(newEvent);
  };
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
        onChange={onChange}
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
