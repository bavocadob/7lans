import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import EntryPage from './pages/EntryPage'
import DinosaurDictPage from './pages/DinosaurDictPage'
import VolunteerMainPage from './pages/volunteer_pages/VolunteerMainPage'
import StartPage from './pages/volunteer_pages/StartPage'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<EntryPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/volunteer_main' element={<VolunteerMainPage/>} />
        <Route path='/dinosaur_dict' element={<DinosaurDictPage/>} />
        <Route path='/volunteer_start' element={<StartPage/>} />
      </Routes>
    </>
  )
}

export default App
