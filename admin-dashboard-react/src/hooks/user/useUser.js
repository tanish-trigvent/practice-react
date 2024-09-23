import { useMutation, useQuery } from "react-query";
import useAuth from "../useAuth";

export default function useUser(userId) {
  const { request } = useAuth();

  //  login user
  const {
    mutateAsync: userLogin,
    isLoading,
    isError,
  } = useMutation(async (data) => {
    const response = await request.post("/auth", data);
    return response.data;
  });

  //register user

  const { mutateAsync: userRegister } = useMutation(
    async (data) => {
      const response = await request.post("/user", data);
      return response.data;
    },
    {
      onSuccess: () => {
        refetchUsers();
      },
    }
  );

  //forgot password

  const { mutateAsync: forgotPassword, isLoading: forgotPasswordLoading } =
    useMutation(async (data) => {
      const response = await request.post("/forgot-password", data);
      return response.data;
    });

  // otp Verification
  const { mutateAsync: verifyOtp, isLoading: isOtpVerifying } = useMutation(
    async (data) => {
      const response = await request.post("/otp-verify", data);
      return response.data;
    }
  );

  // reset password
  const { mutateAsync: resetPassword, isLoading: isResetingPassword } =
    useMutation(async (data) => {
      const response = await request.put("/forgot-password", data);
      return response.data;
    });

  // get all users
  const {
    data: users,
    isLoading: isUserLoading,
    isError: isUserError,
    refetch: refetchUsers,
  } = useQuery(
    "/user",
    async () => {
      return (await request.get("/user")).data;
    },
    { enabled: !!userId }
  );

  // update user
  const { mutateAsync: updateUser, isLoading: isUpdatingUser } = useMutation(
    async (data) => {
      const response = await request.put(`/user/${data?._id}`, data);
      return response.data;
    },
    {
      onSuccess: () => {
        refetchUsers();
      },
    }
  );

  // delete user
  const { mutateAsync: deleteUser } = useMutation(
    async (id) => {
      const response = await request.delete(`/user/${id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        refetchUsers();
      },
    }
  );

  // change password

  const { mutateAsync: changePassword, isLoading: isChangingPassword } =
    useMutation(async ({ id, payload }) => {
      const response = await request.put(`/user/${id}/changePassword`, payload);
      return response.data;
    });

  // get User

  const {
    data: userDetail,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useQuery(
    `['/user/:id}]`,
    async () => {
      const response = await request.get(`/user/${userId}`);
      return response.data;
    },
    {
      enabled: !!userId,
    }
  );

  // change profile photo

  const { mutateAsync: uploadPhoto } = useMutation(async ({ id, payload }) => {
    const response = await request.put(
      `/user/${id}/changeProfilePhoto`,
      payload
    );
    return response.data;
  });

  return {
    uploadPhoto,
    refetchUser,
    changePassword,
    userDetail,
    isLoadingUser,
    isChangingPassword,
    forgotPassword,
    userLogin,
    userRegister,
    isLoading,
    isError,
    forgotPasswordLoading,
    verifyOtp,
    isOtpVerifying,
    resetPassword,
    isResetingPassword,
    users,
    isUserLoading,
    isUserError,
    refetchUsers,
    updateUser,
    isUpdatingUser,
    deleteUser,
  };
}
