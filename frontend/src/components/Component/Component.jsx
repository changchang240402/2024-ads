import * as React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import ReactPaginate from 'react-paginate';
import '../../../src/pagination.css'

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

const Button = React.forwardRef(function Button(props, ref) {
    const { name, title, value, onChange, title1, data, className1, className2 } = props;
    return (
        <button className={`flex items-center flex-row px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none border-[#9FC4FC] h-auto ${className1}`}>
            <p className="justify-center font-bold">{title} </p>
            <select
                className={`selectpicker focus:outline-none focus:border-none bg-white ${className2}`}
                data-width="2px"
                aria-label="None"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            >
                <option value=''>{title1}</option>
                {data}
            </select>
        </button>
    );
});

const Detail = React.forwardRef(function Detail(props, ref) {
    const { title, value, className1, className2 } = props;
    return (
        <div className={`flex ${className1}`}>
            <p className={`font-bold text-[17px] text-[#6E9CE0] mb-2 ${className2}`}>{title}</p>
            <p className="text-[17px] mb-2 text-[#696A75]">{value}</p>
        </div>
    );
});

const Paginate = React.forwardRef(function Paginate(props, ref) {
    const { className, handlePageClick, pageCount } = props;
    return (
        <div className={`flex items-center justify-end ${className}`}>
            <ReactPaginate
                breakLabel="..."
                nextLabel=" > "
                onPageChange={handlePageClick}
                Displayed Page Range={5}
                pageCount={pageCount}
                previousLabel=" < "
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageClassName="page-item"
                activeClassName="active"
                previousClassName="page-item"
                nextClassName="page-item"
                breakClassName="page-item"
                className='flex items-center flex-row h-[50px]'
            />
        </div>
    );
});
export { DatePicker, Label, Input, LabelError, Component, Button, Detail, Paginate };
