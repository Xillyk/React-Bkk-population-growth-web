import { createTheme } from "@mui/material/styles";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import Homepage from "@/scenes/homepage";

function App() {
  const theme = useMemo(
    () =>
      createTheme(themeSettings, {
        components: {
          MuiLink: {
            styleOverrides: {
              root: {
                color: "white",
                textDecorationColor: "white",
                "&:hover": {
                  color: themeSettings.palette.primary.main,
                },
                "&:active": {
                  color: themeSettings.palette.primary.light,
                },
                "&:focus": {
                  color: themeSettings.palette.primary.light,
                },
              },
            },
          },
        },
      }),
    []
  );

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box width="100%" height="100%">
          <Homepage />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
