import * as React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";

const DatePicker = React.forwardRef(function DatePicker(props, ref) {
    const { error, format, name, control } = props;
    const { field } = useController({ name, control });

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MuiDatePicker
                inputFormat={format}
                {...field}
                renderInput={({ error: inputError, ...params }) => {
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

export default DatePicker;