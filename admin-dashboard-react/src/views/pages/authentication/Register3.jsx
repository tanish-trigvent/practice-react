import { Link, useNavigate } from "react-router-dom";

// material-ui
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

// project imports
import AuthWrapper1 from "../AuthWrapper1";
import AuthCardWrapper from "../AuthCardWrapper";
import Logo from "ui-component/Logo";
import FormContainer from "components/FormContainer";
import AnimateButton from "ui-component/extended/AnimateButton";
import { Button } from "@mui/material";
import useUser from "hooks/user/useUser";
import { useSnackbar } from "components/Snackbar";
import UserRegisterForm from "components/authentication/UserRegisterForm";
import * as Yup from "yup";

// assets

// ===============================|| AUTH3 - REGISTER ||=============================== //

const Register = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { userRegister } = useUser();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const registerUser = async (values) => {
    let response;
    try {
      response = await userRegister(values);
      showSnackbar(response.message, "success");
      navigate("/login");
    } catch (error) {
      const message = error?.response?.data?.message;
      message &&
        showSnackbar(message, error?.status === 401 ? "error" : "info");
    }
  };

  // schema for validation
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("first name is required")
      .min(3, "name must have minimun 3 characters")
      .matches(
        /^[a-zA-Z]+(?: [a-zA-Z]+)?$/,

        "numbers are not allowed"
      ),
    lastName: Yup.string()
      .required("last name is required")
      .min(3, "name must have minimun 3 characters")
      .matches(
        /^[a-zA-Z]+(?: [a-zA-Z]+)?$/,

        "numbers are not allowed"
      ),
    email: Yup.string().email("invalid email !").required("email is required"),
    password: Yup.string()
      .required("password is required")
      .min(
        8,

        "pasword must be 8 or more characters"
      )
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])\w+/,

        "password should contain at least one uppercase and lowercase character"
      )
      .matches(
        /\d/,

        "password should contain at least one number"
      )
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        "password should contain at least one special character"
      ),
  });

  return (
    <AuthWrapper1>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh - 68px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#" aria-label="theme logo">
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={{ xs: "column-reverse", md: "row" }}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={1}
                        >
                          <Typography
                            color="secondary.main"
                            gutterBottom
                            variant={downMD ? "h3" : "h2"}
                          >
                            Sign up
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="16px"
                            textAlign={{ xs: "center", md: "inherit" }}
                          >
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <FormContainer
                      onSuccess={registerUser}
                      validation={validationSchema}
                    >
                      <UserRegisterForm isEditEmail="true" />
                      <AnimateButton>
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{ mt: 2, textTransform: "none" }}
                          color="secondary"
                          fullWidth
                        >
                          Sign Up
                        </Button>
                      </AnimateButton>
                    </FormContainer>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      item
                      container
                      direction="column"
                      alignItems="center"
                      xs={12}
                    >
                      <Typography
                        component={Link}
                        to="/login/"
                        variant="subtitle1"
                        sx={{ textDecoration: "none" }}
                      >
                        Already have an account?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid> */}
      </Grid>
    </AuthWrapper1>
  );
};

export default Register;
