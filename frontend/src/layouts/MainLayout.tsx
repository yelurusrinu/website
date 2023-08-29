import { Box, ThemeProvider } from "@mui/material";
import { theme } from "../theme";
import { purple } from "@mui/material/colors";

const bgImage = require("../assets/bg.png");

const MainLayout: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
        backgroundImage: "linear-gradient(blue, white)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;