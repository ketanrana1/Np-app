import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

export default function AccountsMenu() {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateTo = (url) => {
    setAnchorEl(null);
    navigate(url);
  }

  return (
    <div style={{position:"absolute",right: "20px"}}>
      <IconButton
        id="my-accounts-button"
        aria-controls={open ? "my-accounts-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountCircleIcon sx={{ width: 32, height: 32 }} />
      </IconButton>
      <Menu
        id="my-accounts-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "my-accounts-button",
        }}
      >
        <MenuItem onClick={() => navigateTo('/dashboard')}>Dashboard</MenuItem>
        <MenuItem onClick={() => navigateTo('/changepassword')}>Change Password</MenuItem>
      </Menu>
    </div>
  );
}