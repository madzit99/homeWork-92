import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectRegisterError } from "./usersSlice";
import { RegisterMutation } from "../../types";
import { register } from "./usersThunks";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectRegisterError);

  const [state, setState] = useState<RegisterMutation>({
    username: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      navigate("/");
    } catch (e) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Зарегистрироваться
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={submitFormHandler}
        sx={{ mt: 3 }}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              required
              label="Имя пользователя"
              name="username"
              autoComplete="new-username"
              value={state.username}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError("username"))}
              helperText={getFieldError("username")}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              type="password"
              label="Пароль"
              name="password"
              autoComplete="new-password"
              value={state.password}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError("password"))}
              helperText={getFieldError("password")}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              type="password"
              label="Подтвердите пароль"
              name="confirmPassword"
              autoComplete="new-password"
              value={state.confirmPassword}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError("confirmPassword"))}
              helperText={getFieldError("confirmPassword")}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              label="Отображаемое имя"
              name="displayName"
              autoComplete="new-display-name"
              value={state.displayName}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError("displayName"))}
              helperText={getFieldError("displayName")}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Зарегистрироваться
        </Button>
        <Link component={RouterLink} to="/login" variant="body2">
          У вас уже есть аккаунт? Войти
        </Link>
      </Box>
    </Box>
  );
};
export default Register;
