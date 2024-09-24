import React from "react";
import { Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

const DateTimePickerHelper = ({
  control,
  name,
  label,
  rules = {},
  defaultValue = null,
  format = "YYYY-MM-DD HH:mm",
  sx = {},
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ? dayjs(defaultValue) : null}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DateTimePicker
            {...props}
            sx={{
              ...sx,
              [`& fieldset`]: {
                borderRadius: "12px",
              },
            }}
            disablePast
            value={value ? dayjs(value) : null}
            onChange={(newValue) => {
              onChange(newValue ? newValue?.format(format) : null);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error
                helperText={error ? error.message : null}
                required
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateTimePickerHelper;
