import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import EntryPage from './pages/EntryPage'
import DinosaurDictPage from './pages/DinosaurDictPage'
import VolunteerMainPage from './pages/volunteer_pages/VolunteerMainPage'
import StartPage from './pages/volunteer_pages/StartPage'
import ActiveDoc from './pages/volunteer_pages/ActiveDoc'
import WhisperPage from './pages/volunteer_pages/WhisperPage'
import RaiseEggPage from './pages/volunteer_pages/RaiseEggPage'
import VideoChattingStartPage from './pages/volunteer_pages/VideoChattingStartPage'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<EntryPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/volunteer_main' element={<VolunteerMainPage/>} />
        <Route path='/dinosaur_dict' element={<DinosaurDictPage/>} />
        <Route path='/volunteer_start' element={<StartPage/>} />
        <Route path='/volunteer_video_chatting_start' element={<VideoChattingStartPage/>} />
        <Route path='/volunteer_active_doc' element={<ActiveDoc/>} />
        <Route path='/volunteer_whispher' element={<WhisperPage/>} />
        <Route path='/volunteer_raise_egg' element={<RaiseEggPage/>} />
      </Routes>
    </>
  )
}

export default App
