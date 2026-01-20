import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesConfig from "./Routes";
import { LoginProvider } from "./store/LoginProvider";

function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <RoutesConfig />
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
