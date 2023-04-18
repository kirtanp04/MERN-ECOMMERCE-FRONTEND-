import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import axios from "axios"
import Button from '@mui/material/Button';
import { adminLink } from '../mainLink';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom"

const pages = [
  {
    product: "Add Product",
    link: "/admin/addproduct",
  },
  {
    product: "Add Categories",
    link: "/admin/addcategories",
  }, {
    product: "Users",
    link: "/admin/dashboard"
  }
]
const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate()


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const Check = async () => {
    try {
      await axios.get(`${adminLink}/adminauth`)

    } catch {
      navigate("/admin/login")
    }
  }

  React.useEffect(() => {
    Check()
  })


  return (
    <>
      <AppBar component="nav">
        <Container maxWidth="xl" position="fixed">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} onClick={()=>navigate("/admin")}/>
            <Typography
              variant="h6"
              noWrap
              component="a"

              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'Black',
                textDecoration: 'none',
              }}
            >
              ADMIN
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page, id) => (
                  <MenuItem key={id} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" onClick={() => navigate(page.link)}>{page.product}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} onClick={()=>navigate("/admin")} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              ADMIN
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page, id) => (
                <Button
                  key={id}
                  onClick={() => navigate(page.link)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.product}
                </Button>
              ))}
            </Box>


          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default Header