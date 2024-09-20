import { Link, useNavigate } from 'react-router-dom';

// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';
// import AuthFooter from 'ui-component/cards/AuthFooter';
import FormContainer from 'components/FormContainer';
import { Button } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useDispatch, useSelector } from 'react-redux';
import useUser from 'hooks/user/useUser';
import { useSnackbar } from 'components/Snackbar';
import OTPInput from 'react-otp-input';
import { useState } from 'react';
import { Box } from '@mui/system';
import { resetPasswordToken } from '../../../redux/user/userSlice';

// ================================|| AUTH3 - LOGIN ||================================ //

const OtpVerification = () => {
    const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const { verifyOtp, isOtpVerifying } = useUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar()
    const [otp, setOtp] = useState('');
    const email = useSelector((state) => state?.userReducer?.emailId)
    const submit = async () => {
        try {
            const payload = { otp: otp, email: email }
            const data = await verifyOtp(payload);
            if (data) {
                // localStorage.setItem('token', data.token);
                dispatch(resetPasswordToken(data?.token));
                navigate('/resetPassword')
                showSnackbar(data?.message, 'success');
            }
        } catch (error) {
            showSnackbar(error?.response?.data || error, 'error')
        }

    };

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 20px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#" aria-label="logo">
                                            <Logo />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container direction={{ xs: 'column-reverse', md: 'row' }} alignItems="center" justifyContent="center">
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                                                        Forgot password?
                                                    </Typography>
                                                    <Typography variant="caption" fontSize="16px" textAlign={'center'}>
                                                        Enter your email address below and we'll send you password reset OTP.
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormContainer onSuccess={submit} >
                                            {/* <Stack spacing={2}>
                                                <MuiTextField
                                                    name="email"
                                                    label="Email Address"
                                                    sx={{
                                                        fontWeight: '500',
                                                        marginTop: -2,
                                                        [`& fieldset`]: {
                                                            borderRadius: '12px'
                                                        }
                                                    }}
                                                />
                                            </Stack> */}
                                            <Stack direction={'row'} justifyContent={'center'} >
                                                <OTPInput
                                                    value={otp}
                                                    onChange={setOtp}
                                                    numInputs={6}
                                                    renderSeparator={<Box ml={1}> </Box>}
                                                    renderInput={(props) => <input name='otp' required {...props} style={{ width: '3vw', height: '6vh', textAlign: 'center' }} />}
                                                />
                                            </Stack>
                                            <AnimateButton>
                                                <Button type="submit" disabled={isOtpVerifying} variant="contained" sx={{ mt: '4%' }} color="secondary" fullWidth>
                                                    verify otp
                                                </Button>
                                            </AnimateButton>
                                        </FormContainer>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography component={Link} to="/login/" variant="subtitle1" sx={{ textDecoration: 'none' }}>
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

export default OtpVerification;
