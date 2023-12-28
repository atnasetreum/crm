"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import { authenticate } from "@actions";
import { DEVELOPMENT } from "@constants";

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      disabled={pending}
    >
      Iniciar
    </Button>
  );
}

const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === "Success") {
      window.location.replace("/crm/dashboard");
    }
  }, [state]);

  return (
    <Box component="form" action={dispatch} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        defaultValue={
          process.env.NODE_ENV === DEVELOPMENT ? "eduardo-266@hotmail.com" : ""
        }
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        inputProps={{ minLength: 6 }}
        defaultValue={process.env.NODE_ENV === DEVELOPMENT ? "123456" : ""}
      />

      {state === "CredentialsSignin" && (
        <Alert severity="error">Las credenciales no son correctas</Alert>
      )}

      <LoginButton />
    </Box>
  );
};

export default LoginForm;
