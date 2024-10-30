import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { routeConfig } from "../Routing/routeConfig";

const pages = ["Products", "Pricing", "Blog"];

export default function PrimarySearchAppBar({ addSubNavigation }) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="search" color="inherit">
          <Badge color="error">
            <SearchIcon />
          </Badge>
        </IconButton>
        <p>Search</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="help" color="inherit">
          <Badge color="error">
            <HelpOutlineIcon />
          </Badge>
        </IconButton>
        <p>Help</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="settings" color="inherit">
          <Badge color="error">
            <SettingsIcon />
          </Badge>
        </IconButton>
        <p>Settings</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
            {routeConfig[3]?.children?.map((page) =>
              page?.path ? (
                <Typography
                  key={page.path} // Use unique key
                  sx={{ color: "inherit", marginRight: 4, cursor: "pointer" }}
                  onClick={handleCloseNavMenu}
                >
                  <Link
                    style={{
                      textTransform: "capitalize",
                      textDecoration: "none",
                      color: "#fff",
                    }}
                    to={page.path}
                    onClick={() => addSubNavigation(page)}
                  >
                    {page.path}
                  </Link>
                </Typography>
              ) : null
            )}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {routeConfig[3]?.children?.map((page) =>
                page?.path ? (
                  <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      <Link
                        style={{
                          textTransform: "capitalize",
                          textDecoration: "none",
                          color: "#000",
                        }}
                        to={page.path}
                        onClick={() => addSubNavigation(page)}
                      >
                        {page.path}
                      </Link>
                    </Typography>
                  </MenuItem>
                ) : null
              )}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" aria-label="search" color="inherit">
              <Badge color="error">
                <SearchIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="help" color="inherit">
              <Badge color="error">
                <HelpOutlineIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show notifications" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="settings" color="inherit">
              <Badge color="error">
                <SettingsIcon />
              </Badge>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
