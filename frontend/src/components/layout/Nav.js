import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./Nav.module.scss";
import { userLogOut } from "../../helpers/userHelper";
import CurUserContext from "../../store/curUser-context";

const Nav = () => {
  const curUserCtx = useContext(CurUserContext);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#262626",
      },
    },
  });

  const handleLogout = () => {
    curUserCtx.logout();
    userLogOut();
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className={classes["link"]} to="/">
              R&R.Ltd
            </Link>
          </Typography>
          <Typography variant="p" component="div" sx={{ margin: "0 1rem" }}>
            {`Hi ${
              curUserCtx.user
                ? `${curUserCtx.user.name} | Balance: ${curUserCtx.user.balance}$`
                : "Guest"
            }`}
          </Typography>
          {!curUserCtx.user && (
            <>
              <Button color="inherit">
                <Link className={classes["link"]} to="/login">
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link className={classes["link"]} to="/signup">
                  Sign Up
                </Link>
              </Button>
            </>
          )}
          {curUserCtx.user && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Nav;
