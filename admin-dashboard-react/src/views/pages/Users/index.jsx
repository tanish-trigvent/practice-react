import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import UserRegisterForm from "components/authentication/UserRegisterForm";
import DataGridTable from "components/DataGrid";
import { useModal } from "components/Modal";
import { useSnackbar } from "components/Snackbar";
import useUser from "hooks/user/useUser";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import SubCard from "ui-component/cards/SubCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import * as Yup from "yup";

const Users = () => {
  const userId = useSelector((state) => state?.userReducer?.user?._id);
  const { users, userRegister, updateUser, isUpdatingUser, deleteUser } =
    useUser(userId);
  const [rows, setRows] = useState([]);
  const { showModal, closeModal } = useModal();
  const { showSnackbar } = useSnackbar();

  // schema for validation
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .min(3, "Name must have minimun 3 characters")
      .matches(
        /^[a-zA-Z]+(?: [a-zA-Z]+)?$/,

        "First Letter of name should be capital and name should be string"
      ),
    lastName: Yup.string()
      .required("First Name is required")
      .min(3, "Name must have minimun 3 characters")
      .matches(
        /^[a-zA-Z]+(?: [a-zA-Z]+)?$/,

        "First Letter of name should be capital and name should be string"
      ),
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

  // submit the response after Adding new User
  const handleUserRegister = async (values) => {
    let response;
    try {
      response = await userRegister(values);
      console.log(response);
      showSnackbar(response.message, "success");
      closeModal();
    } catch (error) {
      const message = error?.response?.data;
      message && showSnackbar(message, "error");
    }
  };

  // Update the response after editing User
  const handleSubmit = async (values) => {
    try {
      updateUser(values);
      showSnackbar("User updated successfully", "success");
      closeModal();
    } catch (error) {
      const message = error?.response?.data;
      message && showSnackbar(message, "error");
    }
  };

  // open modal for adding new user
  const handleAddUser = () => {
    showModal({
      title: "Add User",
      confirmText: "Save",
      onSubmit: handleUserRegister,
      content: <UserRegisterForm />,
      validation: validationSchema,
    });
  };

  // open modal for editing user
  const handleEdit = (selectedUser) => {
    showModal({
      title: "Edit User",
      confirmText: "Save",
      onSubmit: handleSubmit,
      content: <UserRegisterForm isEditing={true} />,
      defaultValue: selectedUser,
      isLoading: isUpdatingUser,
      validation: validationSchema,
    });
  };

  // open confirmation modal

  const handleOpenDeleteModal = (defaultValue) => {
    showModal({
      title: "Delete User",
      confirmText: "Delete",
      onSubmit: handleDeleteUser,
      defaultValue,
      content: (
        <Typography>Are you sure you want to delete this user?</Typography>
      ),
    });
  };

  // Delete a user

  const handleDeleteUser = async (values) => {
    try {
      const response = await deleteUser(values?._id);
      showSnackbar(response || response.message, "success");
      closeModal();
    } catch (error) {
      const message = error?.response?.data;
      message && showSnackbar(message, "error");
    }
  };

  const columns = [
    {
      field: "firstName",
      headerName: "First name",
      width: 200,
      editable: false,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 200,
      editable: false,
    },
    {
      field: "fullName",
      headerName: "Full name",
      sortable: false,
      width: 200,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: false,
      width: 200,
    },
    {
      field: "actions",
      type: "actions",
      width: 200,
      getActions: (value) => {
        return [
          <GridActionsCellItem
            icon={
              <AnimateButton>
                {
                  <Tooltip title="edit">
                    <IconButton>
                      <EditOutlinedIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                }
              </AnimateButton>
            }
            label="view"
            sx={{
              color: "lightgray",
            }}
            onClick={() => {
              handleEdit(value?.row);
            }}
          />,
          <GridActionsCellItem
            icon={
              <AnimateButton>
                {
                  <Tooltip title="delete">
                    <IconButton>
                      <DeleteOutlineOutlinedIcon color="error" />
                    </IconButton>
                  </Tooltip>
                }
              </AnimateButton>
            }
            label="view"
            sx={{
              color: "lightgray",
            }}
            onClick={() => {
              handleOpenDeleteModal(value?.row);
            }}
          />,
        ];
      },
      renderHeader: () => <Typography>Action</Typography>,
    },
  ];

  useMemo(() => {
    setRows(users);
  }, [users]);

  return (
    <SubCard
      title={
        <Stack
          justifyContent={"space-between"}
          direction={"row"}
          alignItems={"center"}
        >
          <Typography variant="h3">Users</Typography>
          <AnimateButton>
            <Button
              variant="contained"
              color="secondary"
              sx={{ float: "right" }}
              onClick={handleAddUser}
            >
              Add User +
            </Button>
          </AnimateButton>
        </Stack>
      }
    >
      <Stack spacing={2}>
        <DataGridTable columns={columns} rows={rows} />
      </Stack>
    </SubCard>
  );
};

export default Users;
