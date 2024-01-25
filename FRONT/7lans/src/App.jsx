import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EntryPage from "./pages/EntryPage";
// import MainPage from "./pages/MainPage";
import DinosaurDictPage from "./pages/DinosaurDictPage";
import ReactCalendar from "./components/volunteer/ReactCalendar";
import VolunteerMainPage from "./pages/volunteer_pages/VolunteerMainPage";
import StartPage from "./pages/volunteer_pages/StartPage";
import ActiveDoc from "./pages/volunteer_pages/ActiveDoc";
import WhisperPage from "./pages/volunteer_pages/WhisperPage";
import RaiseEggPage from "./pages/volunteer_pages/RaiseEggPage";
import VideoChattingStartPage from "./pages/volunteer_pages/VideoChattingStartPage";
import ChildMainPage from "./pages/child_pages/ChildMainPage";
import ChildStartPage from "./pages/child_pages/ChildStartPage";
import ChildVideoChattingStartPage from "./pages/child_pages/ChildVideoChattingStartPage";
import ChildWhisperPage from "./pages/child_pages/ChildWhisperPage";
import ChildRaiseEggPage from "./pages/child_pages/ChildRaiseEggPage";
import ChildDinosaurDictPage from "./pages/ChildDinosaurDictPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<EntryPage />} />
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

        <Route path="/calendar" element={<ReactCalendar />} />
      </Routes>
    </>
  );
}

export default App;
