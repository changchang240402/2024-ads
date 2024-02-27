import * as React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';

const DatePicker = React.forwardRef(function DatePicker(props, ref) {

    const { error, format, name, control, defaultValue } = props;
    const { field } = useController({ name, control });
    const formatted = defaultValue ? dayjs(defaultValue) : null;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MuiDatePicker
                {...field}
                inputFormat={format}
                value={formatted}
                textField={({ error: inputError, ...params }) => {
                    return <TextField
                        error={error}
                        helperText={error}
                        {...params}
                    />
                }}
            />
        </LocalizationProvider>
    );
});

const Input = React.forwardRef(function Input(props, ref) {
    const { className, name, placeholder, register } = props;
    return (
        <input
            className={`px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none focus:border-[#387DE4] bg-white ${className}`}
            type={name}
            placeholder={placeholder}
            id={name}
            name={name}
            {...register}
        />
    );
});

const LabelError = React.forwardRef(function LabelError(props, ref) {
    const { name, error } = props;
    return (
        <label className="ml-2 mt-1 px-2 text-sm text-red-600" htmlFor={name}>{error}</label>
    );
});

const Label = React.forwardRef(function Label(props, ref) {
    const { className, name, title } = props;
    return (
        <label
            className={`font-medium text-lg mb-2 ${className}`}
            htmlFor={name}>
            {title}
        </label>
    );
});
const Component = React.forwardRef(function Component(props, ref) {
    const { className, name, title, placeholder, register, error } = props;
    return (
        <div className={`flex flex-col ${className}`}>
            <Label name={name} title={title} />
            <Input name={name} placeholder={placeholder}
                register={register} />
            {error && (
                <LabelError name={name} error={error.message} />
            )}
        </div>
    );
});

export { DatePicker, Label, Input, LabelError, Component };

