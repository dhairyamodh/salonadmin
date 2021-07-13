import React, { useState } from "react";
import InputContainer from "./InputContainer";
import TextareaCompatible from "react-textarea-compatible";

const MyTextField = React.forwardRef((props, ref) => {
  const {
    label,
    name,
    placeholder,
    value,
    multiline,
    onChange,
    rows,
    error,
    size,
    maxLength,
    defaultValue,
  } = props;
  const [count, setCount] = useState(0);
  const handleChange = (value) => {
    let target = {
      name,
      value: value,
    };
    let newEvent = { target: target };
    // setValue(value)
    onChange(newEvent);
    setCount(value.length);
  };
  return (
    <InputContainer label={label} error={error} size={size}>
      <TextareaCompatible
        type="text"
        class="form-control"
        name={name}
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={props.rows || 2}
        defaultValue={defaultValue}
      />
      {maxLength !== undefined && (
        <span
          className="bg-primary-gradient"
          style={{
            fontSize: 12,
            color: "#fff",
            padding: "0px 5px",
            borderRadius: 2,
            float: "right",
          }}
        >
          {count}/{maxLength}
        </span>
      )}
    </InputContainer>
  );
});
export default MyTextField;
