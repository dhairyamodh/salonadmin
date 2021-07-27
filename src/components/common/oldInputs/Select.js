import { useField } from "formik";
import React from "react";
import InputContainer from "./InputContainer";

const MyTextField = (props) => {
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

  const [field, meta, helpers] = useField(name);

  const handleChange = (e) => {
    let target = {
      name,
      value: e.target.value,
    };
    let newEvent = { target: target };

    onChange(newEvent);
  };

  React.useEffect(() => {
    if (options.length === 1) {
      console.log("option length ===1");
      // let target = {
      //   name,
      //   value: options[0].optionValueProp,
      // };
      // let newEvent = { target: target };
      helpers.setValue(options[0][optionValueProp]);
      // onChange(newEvent);
    } else if (!defaultOption) {
      helpers.setValue(options[0][optionValueProp]);
    }
  }, []);
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
};
export default MyTextField;
