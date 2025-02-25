import { AppBar, Grid, styled, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/users/usersSlice";

const StyledLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <StyledLink to="/">ЧАТ</StyledLink>
            </Typography>
          </Grid>
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
