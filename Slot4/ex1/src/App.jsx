import "./App.css";
import Footer from "./components/Footer";
import ListofOrchid from "./components/ListofOrchid";
import TestCount from "./components/TestCount";
function App() {
  return (
    <>
      <ListofOrchid />
      <TestCount />
      <Footer images="/pic.jpg" name="NCP" email="chontem123@gmail.com" />
    </>
  );
}

export default App;
