import { Button, Grid, Stack, Typography } from "@mui/material";
import FormContainer from "components/FormContainer";
import MuiTextField from "components/input/MuiTextField";
import { useSnackbar } from "components/Snackbar";
import useUser from "hooks/user/useUser";
import React from "react";
import { useSelector } from "react-redux";
import SubCard from "ui-component/cards/SubCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import * as Yup from "yup";

const Security = () => {
  const userId = useSelector((state) => state?.userReducer?.user?._id);

  const { changePassword, isChangingPassword } = useUser();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const response = await changePassword({ id: userId, payload: values });
      showSnackbar(response.message, "success");
    } catch (error) {
      showSnackbar(error.response.data || error.message, "error");
    }
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current Password is required"),
    newPassword: Yup.string()
      .required("New Password is required")
      .min(8, "Password must be 8 or more characters")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  return (
    <Grid container>
      <Grid item xs={12} md={7}>
        <SubCard title={<Typography variant="h5">Change Password</Typography>}>
          <FormContainer onSuccess={handleSubmit} validation={validationSchema}>
            <Stack spacing={2}>
              <MuiTextField
                name={"currentPassword"}
                label={"Current Password"}
                fullWidth
                type="password"
              />
              <MuiTextField
                name={"newPassword"}
                label={"New Password"}
                fullWidth
                type="password"
              />
              <AnimateButton>
                <Button
                  sx={{ float: "right" }}
                  variant="contained"
                  color="secondary"
                  disabled={isChangingPassword}
                  type="submit"
                >
                  Save
                </Button>
              </AnimateButton>
            </Stack>
          </FormContainer>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default Security;
