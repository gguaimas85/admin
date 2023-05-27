import { useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  // Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
// mocks_
import accountAdmin from "../../../_mock/account";
//React
import { Link } from "react-router-dom";
//firebase
import { auth } from "../../../firebase/firebase";
import { signOut } from "firebase/auth";

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("Salimos bien");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={accountAdmin.photoIcon} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {accountAdmin.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {accountAdmin.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleClose} sx={{ m: 1 }}>
          <Link
            to="/"
            style={{ textDecoration: "none", display: "flex", direction: "row", color: "black" }}
            onClick={logOut}
          >
            <LogoutIcon />
            <Typography>Cerrar Sesion</Typography>
          </Link>
        </MenuItem>
      </Popover>
    </>
  );
}
