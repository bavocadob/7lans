import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import EntryPage from './pages/EntryPage'

import DinosaurDictPage from './pages/DinosaurDictPage'
import ReactCalendar from './components/volunteer/ReactCalendar'
import VolunteerMainPage from './pages/volunteer_pages/VolunteerMainPage'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<EntryPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/volunteer_main' element={<VolunteerMainPage/>} />
        <Route path='/dinosaur_dict' element={<DinosaurDictPage/>} />
        <Route path='/calendar' element={<ReactCalendar/>} />
        
      </Routes>
    </>
  )
}

export default App
