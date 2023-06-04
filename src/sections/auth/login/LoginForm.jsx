import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
//firebase
import { auth } from "../../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  const [showPassword, setShowPassword] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [emptyData, setEmptyData] = useState(false);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleOnchange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(auth, login.email, login.password);
      console.log(result);
    } catch (error) {
      console.log(error);
    }

    if (login.email === adminEmail && login.password === adminPassword)
      navigate("/dashboard", { replace: true });

    if (login.email.length < 1 || login.password.length < 1) return setEmptyData(true);

    if (login.email !== adminEmail && login.password !== adminPassword) return setOpenError(true);
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email" onChange={handleOnchange} />

        <TextField
          name="password"
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          onChange={handleOnchange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <VisibilityOffIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Box>
        <Stack direction="column" alignItems="center" sx={{ my: 3 }}>
          <Typography variant="subtitle2" underline="hover">
            Parar resetear contraseña, por favor conectate con sistemas.
          </Typography>
          <Snackbar
            open={openError}
            autoHideDuration={3000}
            onClose={() => setOpenError(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            variant="contained"
          >
            <Alert severity="error">Usuario o Contraseña erronea</Alert>
          </Snackbar>
          <Snackbar
            open={emptyData}
            autoHideDuration={3000}
            onClose={() => setEmptyData(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            variant="contained"
          >
            <Alert severity="error">Faltan datos a completar</Alert>
          </Snackbar>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleClick}
        >
          Inicair Sesion
        </LoadingButton>
      </Box>
    </>
  );
}
