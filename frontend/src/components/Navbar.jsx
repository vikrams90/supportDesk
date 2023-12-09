import { AppBar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenNavMenu = (e) => {
    setAnchorEl(e.currentTarget)
  };

  const handleCloseNavMenu = (e) => {
    setAnchorEl(null)
  }
  return (
    <AppBar color='primary'>
      <Box>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={handleOpenNavMenu}
          color='inherit'
          sx={{  display: { sm: 'flex',md:"none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={Boolean(anchorEl)}
          onClick={handleCloseNavMenu}
        
        >
          <MenuItem>
          </MenuItem>
          <MenuItem>
          </MenuItem>
          <MenuItem>
          </MenuItem>

        </Menu>
      </Box>
    </AppBar>
  );
};

export default Navbar;
