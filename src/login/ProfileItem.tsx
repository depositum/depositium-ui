import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useCallback } from "react";
import walletAPI from "../api/WalletAPI";
import BottomArrowIcon from "../icons/BottomArrowIcon";
import NotificationIcon from "../icons/NotificationIcon";

const ProfileItem: React.FunctionComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const onOpenProfile = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, []);

  const onCloseProfile = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onSignOut = useCallback(() => {
    walletAPI.signOut();
    window.location.reload();
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ alignItems: "center", display: "flex", textAlign: "center" }}>
        <NotificationIcon />
        <div
          style={{
            border: "1px solid #CADEEF",
            height: 32,
            marginLeft: 24,
            marginRight: 20,
          }}
        />
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 14,
            fontStyle: "normal",
            fontWeight: 600,
            letterSpacing: "0.2px",
            lineHeight: "20px",
            marginLeft: 5,
          }}
        >
          {walletAPI.account().accountId}
        </div>
        <Tooltip title="Account settings">
          <IconButton onClick={onOpenProfile} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ height: 44, marginRight: "11px", width: 44 }}>
              {walletAPI.account().accountId[0]}
            </Avatar>
            <BottomArrowIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onCloseProfile}
        onClick={onCloseProfile}
        PaperProps={{
          elevation: 0,
          sx: {
            "& .MuiAvatar-root": {
              height: 32,
              ml: -0.5,
              mr: 1,
              width: 32,
            },
            "&:before": {
              bgcolor: "background.paper",
              content: '""',
              display: "block",
              height: 10,
              position: "absolute",
              right: 14,
              top: 0,
              transform: "translateY(-50%) rotate(45deg)",
              width: 10,
              zIndex: 0,
            },
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            overflow: "visible",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={onSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default React.memo(ProfileItem);
