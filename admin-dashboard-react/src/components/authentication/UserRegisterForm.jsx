import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MuiTextField from "components/input/MuiTextField";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { strengthColor, strengthIndicator } from "utils/password-strength";

const UserRegisterForm = ({ isEditing, isEditEmail = "false" }) => {
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const changePassword = (e) => {
    const temp = strengthIndicator(e.target.value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

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
        <>
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
          {strength !== 0 && (
            <Box sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box
                    style={{ backgroundColor: level?.color }}
                    sx={{ width: 85, height: 8, borderRadius: "7px" }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" fontSize="0.75rem">
                    {level?.label}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </>
      )}
    </Stack>
  );
};

export default UserRegisterForm;
