import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EntryPage from "./pages/EntryPage";
// import MainPage from "./pages/MainPage";
import DinosaurDictPage from "./pages/DinosaurDictPage";


import VolunteerCalendar from "./components/volunteer/calendar/VolunteerCalendar";
import VolunteerMainPage from "./pages/volunteer_pages/VolunteerMainPage";
import StartPage from "./pages/volunteer_pages/StartPage";
import ActiveDoc from "./pages/volunteer_pages/ActiveDoc";
import WhisperPage from "./pages/volunteer_pages/WhisperPage";
import RaiseEggPage from "./pages/volunteer_pages/RaiseEggPage";
import VideoChattingStartPage from "./pages/volunteer_pages/VideoChattingStartPage";
import ChoosePicturePage from "./pages/volunteer_pages/ChoosePicturePage";

import ChildMainPage from "./pages/child_pages/ChildMainPage";
import ChildStartPage from "./pages/child_pages/ChildStartPage";
import ChildVideoChattingStartPage from "./pages/child_pages/ChildVideoChattingStartPage";
import ChildWhisperPage from "./pages/child_pages/ChildWhisperPage";
import ChildRaiseEggPage from "./pages/child_pages/ChildRaiseEggPage";
import ChildDinosaurDictPage from "./pages/ChildDinosaurDictPage";


import NormalNav from "./components/navs/NormalNav";

import '../scss/main.scss'


import VideoChattingPage from "./pages/volunteer_pages/VideoChattingPage";
import VolunteerGamePage from "./pages/volunteer_pages/VolunteerGamePage";
import ChildVideoChattingPage from "./pages/child_pages/ChildVideoChattingPage";
import ChildGamePage from "./pages/child_pages/ChildGamePage";

const NormalLayout = () => {
  return (
    <>
    <NormalNav />
    <CommonSidePanel />
    <main>
      <Outlet />
    </main>
    </>
  )
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        {/* <Route path="/" element={<NormalLayout />} /> */}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/main" element={<MainPage />} /> */}


        <Route path="/whisper_page" element={<WhisperPage />} />
        <Route path="/dinosaur_dict" element={<DinosaurDictPage />} />



        <Route path="/volunteer_main" element={<VolunteerMainPage />} />
        <Route path="/volunteer_start" element={<StartPage />} />
        <Route
          path="/volunteer_video_chatting_start"
          element={<VideoChattingStartPage />}
        />
        <Route path="/volunteer_active_doc" element={<ActiveDoc />} />
        <Route path="/volunteer_whispher" element={<WhisperPage />} />
        <Route path="/volunteer_raise_egg" element={<RaiseEggPage />} />
        <Route path="/volunteer_video_chatting" element={<VideoChattingPage />} />
        <Route path="/volunteer_game" element={<VolunteerGamePage />} />
        <Route path="/volunteer_calendar" element={<VolunteerCalendar />} />
        <Route path="/volunteer_ChoosePicturePage" element={<ChoosePicturePage />} />



        <Route path="/child_main" element={<ChildMainPage />} />
        <Route
          path="/child_dinosaur_dict"
          element={<ChildDinosaurDictPage />}
        />
        <Route path="/child_start" element={<ChildStartPage />} />
        <Route
          path="/child_video_chatting_start"
          element={<ChildVideoChattingStartPage />}
        />
        <Route path="/child_whispher" element={<ChildWhisperPage />} />
        <Route path="/child_raise_egg" element={<ChildRaiseEggPage />} />
        <Route path="/child_video_chatting" element={<ChildVideoChattingPage />} />
        <Route path="/child_game" element={<ChildGamePage />} />


      </Routes>
    </>
  );
}

export default App;
