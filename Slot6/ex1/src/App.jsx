import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesConfig from "./Routes";
function App() {
  return (
    <BrowserRouter>
      <RoutesConfig />
    </BrowserRouter>
  );
}

export default App;
