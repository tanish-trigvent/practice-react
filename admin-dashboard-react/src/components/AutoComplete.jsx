import React from "react";
import { Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const BasicAutocomplete = ({
  control,
  name,
  label,
  options = [],
  getOptionLabel = (option) => option.label || option,
  rules = {},
  defaultValue = null,
  sx = {},
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || null}
      rules={rules}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            onChange(newValue.value);
          }}
          sx={{
            ...sx,
            [`& fieldset`]: {
              borderRadius: "12px",
            },
          }}
          onBlur={onBlur}
          options={options}
          getOptionLabel={getOptionLabel}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              inputRef={ref} // Necessary for react-hook-form to track the input
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          {...props}
        />
      )}
    />
  );
};

export default BasicAutocomplete;
