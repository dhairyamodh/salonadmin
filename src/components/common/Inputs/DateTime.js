import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import InputContainer from "./InputContainer";
import { Controller, useController, useForm } from "react-hook-form";
import {
    DATEFORMAT,
    dateRanges,
    DATETIMEFORMAT,
    TIMEONLY,
} from "../../../contants";
import DatetimePciker from "react-datetime";
import "react-datetime/css/react-datetime.css";

const DateTime = (props) => {
    const {
        label,
        name,
        placeholder,
        multiline,
        rows,
        error,
        size,
        options,
        onCustomChange,
        value,
        noPadding,
        defaultValue,
        control,
    } = props;
    return (
        <InputContainer
            {...props}
            noPadding={noPadding}
            size={size}
            label={label}
            error={error}
        >
            <Controller
                control={control}
                name={name}
                rules={props.rules}
                render={(props) => {
                    console.log("dateTime", props);
                    return (
                        <DatetimePciker
                            // initialValue={defaultValue}
                            onChange={(date) => props.onChange(date.toDate())}
                            value={props.value}
                            dateFormat={DATEFORMAT}
                            timeFormat={TIMEONLY}
                        />
                    );
                }}
                defaultValue={defaultValue}
            />
        </InputContainer>
    );
};

export default DateTime;