import React from "react";
import InputContainer from "./InputContainer";

const MyTextField = React.forwardRef((props, ref) => {
  const { label, name, placeholder, multiline, rows, error, size } = props;
  return (
    <InputContainer {...props} label={label} error={error} size={size}>
      <input
        ref={ref}
        type="number"
        class="form-control"
        name={name}
        placeholder={placeholder}
        step="0.01"
        {...props}
      />
    </InputContainer>
  );
});
export default MyTextField;
