import React from "react";
import InputContainer from "./InputContainer";

const MyTextField = React.forwardRef((props, ref) => {
  const {
    label,
    name,
    placeholder,
    multiline,
    rows,
    error,
    size,
    required,
    onChange,
    defaultValue,
  } = props;

  return (
    <InputContainer label={label} error={error} size={size}>
      {required && <span className="text-danger"> *</span>}
      <input
        type="text"
        class="form-control"
        name={name}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e);
        }}
        defaultValue={defaultValue}
      />
    </InputContainer>
  );
});
export default MyTextField;
