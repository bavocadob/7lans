import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import EntryPage from './pages/EntryPage'
import MainPage from './pages/MainPage'
import DinosaurDictPage from './pages/DinosaurDictPage'
import VolunteerMainPage from './pages/volunteer_pages/VolunteerMainPage'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<EntryPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/volunteer_main' element={<VolunteerMainPage/>} />
        <Route path='/dinosaur_dict' element={<DinosaurDictPage/>} />
      </Routes>
    </>
  )
}

export default App
