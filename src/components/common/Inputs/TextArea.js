import React, { useState } from "react";
import InputContainer from "./InputContainer";
import TextareaCompatible from 'react-textarea-compatible';

const MyTextField = React.forwardRef((props, ref) => {
  const { label, name, placeholder, multiline, rows, error, size, maxLength, defaultValue } = props;
  const [value, setValue] = useState('')
  const [count, setCount] = useState(0)
  const onChange = (value) => {
    setValue(value)
    setCount(value.length)
  }
  return (
    <InputContainer label={label} error={error} size={size}>
      <TextareaCompatible
        type="text"
        class="form-control"
        name={name}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={props.rows || 2}
        defaultValue={defaultValue}
      />
      {maxLength !== undefined &&
        <span className="bg-primary-gradient" style={{ fontSize: 12, color: '#fff', padding: '0px 5px', borderRadius: 2, float: 'right' }}>{count}/{maxLength}</span>}
    </InputContainer>
  );
});
export default MyTextField;
