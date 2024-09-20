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
// import AuthFooter from 'ui-component/cards/AuthFooter';
import FormContainer from "components/FormContainer";
import { Button } from "@mui/material";
import MuiTextField from "components/input/MuiTextField";
import AnimateButton from "ui-component/extended/AnimateButton";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../../../redux/user/userSlice";
import useUser from "hooks/user/useUser";
import { useSnackbar } from "components/Snackbar";
import * as Yup from "yup";

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const { userLogin } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const submit = async (values) => {
    try {
      const data = await userLogin(values);
      if (data) {
        localStorage.setItem("token", data.token);
        dispatch(loggedInUser(data?.data));
        navigate("/");
      }
    } catch (error) {
      showSnackbar(error?.response?.data?.message, "error");
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email !").required("Email is Required"),
    password: Yup.string()
      .required("This field is required")
      .min(
        8,

        "Pasword must be 8 or more characters"
      )
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])\w+/,

        "Password ahould contain at least one uppercase and lowercase character"
      )
      .matches(
        /\d/,

        "Password should contain at least one number"
      )
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        "Password should contain at least one special character"
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
                    <Link to="#" aria-label="logo">
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
                            Hi, Welcome Back
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
                      onSuccess={submit}
                      validation={validationSchema}
                    >
                      <Stack spacing={2}>
                        <MuiTextField
                          name="email"
                          label="Email"
                          sx={{
                            fontWeight: "500",
                            marginTop: -2,
                            [`& fieldset`]: {
                              borderRadius: "12px",
                            },
                          }}
                        />

                        <MuiTextField
                          name="password"
                          label="Password"
                          type="password"
                          sx={{
                            fontWeight: "500",
                            marginTop: -2,
                            [`& fieldset`]: {
                              borderRadius: "12px",
                            },
                          }}
                        />
                      </Stack>
                      <Stack gap={2} mt={2}>
                        <Typography
                          alignSelf={"flex-end"}
                          component={Link}
                          to={"/forgot-password"}
                          color={"secondary"}
                          sx={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            textDecoration: "none",
                          }}
                        >
                          forgot Password?
                        </Typography>
                      </Stack>
                      <AnimateButton>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ mt: "4%" }}
                          color="secondary"
                          fullWidth
                        >
                          Log In
                        </Button>
                      </AnimateButton>
                    </FormContainer>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: { sm: "14px" },
                      }}
                      direction="row"
                    >
                      <Typography>Don&apos;t have an account?</Typography>
                      <Button onClick={() => navigate("/register")}>
                        Register here
                      </Button>
                    </Stack>
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

export default Login;
