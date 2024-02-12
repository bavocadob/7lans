import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom';
import GameNav from '../../components/navs/GameNav';
import UseOpenViduSession from "../../helpers/useOpenViduSession.jsx";
import VideoChattingLobby from "./VideoChattingLobby.jsx";
import VolunteerGamePage from "./VolunteerGamePage.jsx";
import ImgCaptureBtn from "../../img_upload/ImgCaptureBtn.jsx";
import { getMeetingDetail } from "../../api/axioses"


const AppContainer = styled.div`
    margin-top: 5.7%;
    height: 90vh;
    //width: 100wh;
    display: flex;
    flex-direction: column;
`;


const VideoChattingPage = () => {
  const {session, mainStreamManager, subscribers, joinSession, renderUserVideoComponent} = UseOpenViduSession();

  const [isGameStarted, setGameStarted] = useState(false);
  const [meetingValid, setMeetingValid] = useState()
  const userInfo = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  const MEETING_ID = 1;


  // 페이지 로드시 세션 생성
  useEffect(() => {
    if (meetingValid) {
      joinSession();
    }
  }, [meetingValid]);

  // 페이지 이탈시 세션 디스커넥트하게 설정
  useEffect(() => {
    return () => {
      if (session) {
        session.disconnect();
      }
    }
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      if(userInfo !== null){
        const meetingData = await getMeetingDetail(MEETING_ID);
        console.log(meetingData)
        if(meetingData.childId !== userInfo.memberId &&
          meetingData.volunteerId !== userInfo.memberId) {
          navigate('/'); // 메인페이지로 이동
        } else {
          setMeetingValid(true);
        }
      }
    }
    fetchData();
  }, [userInfo, navigate]);


  // FIXME 테스트용 토글 method 이후 지울 것
  const toggleGameStarted = () => {
    setGameStarted(prevState => !prevState);
  };


  const signalToggleGameStarted = () => {
    session.signal({
      type: 'toggleGame'
    })
      .then(() => console.log(`게임 상태 토글됨`))
      .catch(err => console.log(err))
  }


  const receiveToggleGameStarted = () => {
    toggleGameStarted();
  }


  useEffect(() => {
    if (session) {
      session.on('signal:toggleGame', receiveToggleGameStarted);
    }

    return () => {
      if (session) {
        session.off('signal:toggleGame', receiveToggleGameStarted);
      }
    }
  }, [session]);

  return (
    <AppContainer>
      <GameNav/>
      {isGameStarted ? (
        <VolunteerGamePage
          renderUserVideoComponent={renderUserVideoComponent}
          mainStreamManager={mainStreamManager}
          subscribers={subscribers}
          session={session}
        />
      ) : (
        <VideoChattingLobby
          renderUserVideoComponent={renderUserVideoComponent}
          mainStreamManager={mainStreamManager}
          subscribers={subscribers}
        />
      )}

      {/* 게임 상태를 토글하는 버튼 */}
      <button onClick={signalToggleGameStarted}>
        {isGameStarted ? 'Stop Game' : 'Start Game'}
      </button>

      <ImgCaptureBtn/>
    </AppContainer>

  );
};

export default VideoChattingPage;
