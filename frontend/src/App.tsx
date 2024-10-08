import { Container, Grid, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import AppToolbar from "./UI/AppToolbar/AppToolbar";
import Messages from "./features/users/messages/Messages";

const App = () => {

  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item lg={2}></Grid>
            <Grid item lg={10}>
              <Routes>
                <Route path="/" element={<Messages />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route
                  path="*"
                  element={<Typography variant="h1">Not found</Typography>}
                />
              </Routes>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
}

export default App
