import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import EntryPage from './pages/EntryPage'
import MainPage from './pages/MainPage'
import DinosaurDictPage from './pages/DinosaurDictPage'
import ReactCalendar from './components/volunteer/ReactCalendar'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<EntryPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/main' element={<MainPage/>} />
        <Route path='/dinosaur_dict' element={<DinosaurDictPage/>} />
        <Route path='/calendar' element={<ReactCalendar/>} />
      </Routes>
    </>
  )
}

export default App
