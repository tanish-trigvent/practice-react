import { Stack } from "@mui/material";
import MuiTextField from "components/input/MuiTextField";
import React from "react";

const UserRegisterForm = ({ isEditing, isEditEmail = "false" }) => {
  return (
    <Stack gap={2}>
      <MuiTextField
        label="First Name"
        name="firstName"
        sx={{
          [`& fieldset`]: {
            borderRadius: "12px",
          },
        }}
      />
      <MuiTextField
        label="Last Name"
        name="lastName"
        sx={{
          [`& fieldset`]: {
            borderRadius: "12px",
          },
        }}
      />

      <MuiTextField
        label="Email"
        name={"email"}
        sx={{
          border: "none",
          [`& fieldset`]: {
            borderRadius: "12px",
          },
        }}
        disabled={isEditEmail === "false"}
      />
      {!isEditing && (
        <MuiTextField
          label="Password"
          name="password"
          sx={{
            border: "none",
            [`& fieldset`]: {
              borderRadius: "12px",
            },
          }}
          type="password"
        />
      )}
    </Stack>
  );
};

export default UserRegisterForm;
