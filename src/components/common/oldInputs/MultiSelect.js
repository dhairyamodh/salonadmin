import React, { useState } from "react";
import InputContainer from "./InputContainer";
import Select from 'react-select';
import { useForm, FormProvider, useFormContext } from "react-hook-form";

const MyMultiSelect = React.forwardRef((props, ref) => {
  const formcontext = useFormContext();
  const { label, name, placeholder, multiline, error, size, data, onChange, defaultValue, required } = props;
  const options = data.map((service, serviceIndex) => {
    return { value: service._id, label: service.name }
  })
  const handleChange = (e, event) => {


    let target = {
      name,
      value: e,
    };

    let newEvent = { target: target };

    props.onChange(newEvent);

  };
  const colourStyles = {
    control: styles => ({
      ...styles, borderColor: '#e8ebf3', ':active': {
        ...styles[':active'],
        borderColor: '#506ee4'
      }, ':focus': {
        ...styles[':focus'],
        borderColor: '#506ee4'
      }
    }),
    placeholder: styles => ({ ...styles, color: '#98a9d9' }),
  }

  return (
    <InputContainer label={label} error={error} size={size}>
      {required && <span className="text-danger"> *</span>}
      <Select
        name={name}
        isMulti={true}
        isSearchable={true}
        closeMenuOnSelect={false}
        options={options}
        defaultValue={defaultValue}
        styles={colourStyles}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
      />
    </InputContainer>
  );
});
export default MyMultiSelect;
