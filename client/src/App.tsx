import { ThemeProvider } from "styled-components";
import { light } from "./presentation/themes/light";
import "./global.css";
import { Route, Routes } from "react-router";
import { routes } from "./utils/routes";
import { Topbar } from "./components/template/topbar/component";

function App() {
  return (
    <ThemeProvider theme={light}>
      <Topbar title="SWStarter" />
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
