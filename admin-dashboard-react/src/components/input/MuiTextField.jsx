import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

// eslint-disable-next-line react/prop-types
function MuiTextField({
  name,
  id,
  label,
  type = "text",
  onMouseDownPassword,
  sx,
  required,
  ...rest
}) {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Controller
      name={name}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { invalid, error },
      }) => (
        <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          // eslint-disable-next-line react/jsx-props-no-spreading
          value={
            type === "datetime-local"
              ? dayjs(value).format("YYYY-MM-DDTHH:mm")
              : value
          }
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          required={required}
          id={id}
          sx={{
            ...sx,
            [`& fieldset`]: {
              borderRadius: "12px",
            },
          }}
          label={label}
          type={isPassword && showPassword ? "text" : type}
          InputProps={{
            endAdornment: isPassword && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={onMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={invalid}
          helperText={
            // eslint-disable-next-line no-nested-ternary
            error
              ? typeof parseError === "function"
                ? error
                : error?.message
              : rest?.helperText
          }
        />
      )}
    />
  );
}

export default MuiTextField;
