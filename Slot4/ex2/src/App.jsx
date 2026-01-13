import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesConfig from "./Routes";
import Footer from "./components/Footer";
import Headers from "./components/Header";
function App() {
  return (
    <BrowserRouter>
      <Headers />
      <RoutesConfig />
      <Footer images="/pic.jpg" name="NCP" email="chontem123@gmail.com" />
    </BrowserRouter>
  );
}

export default App;
