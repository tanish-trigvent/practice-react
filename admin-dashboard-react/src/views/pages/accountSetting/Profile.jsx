import { Avatar, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import SubCard from "ui-component/cards/SubCard";
import User1 from "../../../assets/images/users/user-round.svg";
import AnimateButton from "ui-component/extended/AnimateButton";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "components/FormContainer";
import UserRegisterForm from "components/authentication/UserRegisterForm";
import useUser from "hooks/user/useUser";
import { useSnackbar } from "components/Snackbar";
import { loggedInUser } from "../../../redux/user/userSlice";
import { useDropzone } from "react-dropzone";

const Profile = () => {
  const userDetails = useSelector((state) => state?.userReducer?.user);
  const ImageUrl = `http://localhost:5000/${userDetails?.profilePhoto}`;

  const { showSnackbar } = useSnackbar();
  const { updateUser, isUpdatingUser, uploadPhoto } = useUser();
  const dispatch = useDispatch();

  const uploadProfilePhoto = async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);
      const response = await uploadPhoto({
        id: userDetails?._id,
        payload: formData,
      });
      showSnackbar(response.message, "success");
      dispatch(loggedInUser(response.userDetails));
    } catch (error) {
      showSnackbar(error.message, "error");
    }
  };
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    onDrop: uploadProfilePhoto,
  });

  const defaultValues = {
    ...userDetails,
  };

  const handleSubmit = async (values) => {
    try {
      const response = await updateUser(values);
      showSnackbar(response.message, "success");
      dispatch(loggedInUser(response.user));
    } catch (error) {
      const message = error?.response?.data;
      message && showSnackbar(message, "error");
    }
  };

  return (
    <Grid container justifyContent={"space-between"} spacing={2}>
      <Grid item sm={4} xs={12}>
        <SubCard title={<Typography variant="h5">Profile Picture</Typography>}>
          <Stack alignItems={"center"} spacing={2}>
            <Avatar
              alt="profile picture"
              src={ImageUrl || User1}
              sx={{ width: 100, height: 100 }}
            />
            <input {...getInputProps()} />
            <AnimateButton>
              <Button variant="contained" color="secondary" onClick={open}>
                upload photo
              </Button>
            </AnimateButton>
          </Stack>
        </SubCard>
      </Grid>
      <Grid item sm={8} xs={12}>
        <SubCard
          title={<Typography variant="h5">Edit Account Details</Typography>}
        >
          <FormContainer defaultValues={defaultValues} onSuccess={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <UserRegisterForm isEditing={"true"} />
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    sx={{ float: "right" }}
                    disabled={isUpdatingUser}
                  >
                    Save
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </FormContainer>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default Profile;
