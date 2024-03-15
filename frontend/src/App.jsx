import { ColorModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import '../globals'
import Login from "./scenes/login/Login";
import MainPage from "./scenes/pages/MainPage";
import { useLocation, useNavigate } from "react-router-dom";

function App() {
  const [theme, colorMode] = useMode()
  const loc = useLocation()
  const navigate = useNavigate()
  return (<>

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loc.pathname === "/" ? (
          <Login />
        ) : (
          <MainPage />
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>

  </>);
}

export default App;
