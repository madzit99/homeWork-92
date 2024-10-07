import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },
  },
  typography: {
    fontFamily: ["Poppins", "PoppinsBold"].join(","),
  },
});

export default theme;
