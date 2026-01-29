import { Routes, Route } from 'react-router-dom'
import EditOrchid from './components/EditOrchids.jsx'
import ListOfOrchids from './components/ListOfOrchids.jsx'
import './App.css'
import NavBar from './components/Navbar.jsx'

function App() {
  return (
    <>
     <NavBar /> 
     <Routes>
        <Route path='/' element={<ListOfOrchids />} />
        <Route path='/edit/:id' element={<EditOrchid />} />
      </Routes>
    </>
  )
}

export default App
