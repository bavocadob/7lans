import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux"
import {useNavigate} from 'react-router-dom';
import GameNav from '../../components/navs/GameNav';
import UseOpenViduSession from "../../helpers/useOpenViduSession.jsx";
import VideoChattingLobby from "./VideoChattingLobby.jsx";
import VolunteerGamePage from "./VolunteerGamePage.jsx";
import VideoChattingExit from "./VideoChattingExit.jsx";
import {getMeetingDetail} from "../../api/axioses"


const VideoChattingPage = () => {
  const {
    session, mainStreamManager, subscribers,
    joinSession, renderUserVideoComponent,
    toggleCamera, toggleMic
  } = UseOpenViduSession();

  const [isGameStarted, setGameStarted] = useState(false);
  const [meetingValid, setMeetingValid] = useState(false)
  const userInfo = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  const [isMyCameraOn, setIsMyCameraOn] = useState(true)
  const [isMyMicOn, setIsMyMicOn] = useState(true)
  const [isChildCameraOn, setIsChildCameraOn] = useState(true)
  const [isChildMicOn, setIsChildMicOn] = useState(true)

  const [isSessionEnd, setIsSessionEnd] = useState(false);
  const [capturedImages, setCapturedImages] = useState([
    'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F3?alt=media&token=110eab31-174b-4b3b-8b3e-7e30d7d7a359',
    'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F4?alt=media&token=3057f0bd-e410-4a91-946e-27d53e1d9686',
    'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F5?alt=media&token=148a9c70-56bd-42f6-8771-3d3b2ab93c84'
  ]);

  const MEETING_ID = 39;


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


  /**
   * 로그인된 사용자가 해당 미팅에 참여할 수 있는지 확인합니다.
   * - 로그인된 사용자 정보가 있으면 미팅의 세부 정보를 가져옵니다.
   * - 미팅의 참여자 ID가 사용자 ID와 일치하지 않으면, 메인 페이지로 이동합니다.
   * - 일치하면, 미팅 참여 상태를 true로 설정합니다.
   */
  useEffect(() => {
    const fetchData = async () => {
      if (userInfo !== null) {
        const meetingData = await getMeetingDetail(MEETING_ID);
        console.log(meetingData)
        if (meetingData.childId !== userInfo.memberId &&
          meetingData.volunteerId !== userInfo.memberId) {
          navigate('/'); // 메인페이지로 이동
        } else {
          setMeetingValid(true);
        }
      }
    }
    fetchData();
  }, [userInfo, navigate]);


  const toggleMyCamera = () => {
    const prevState = isMyCameraOn;
    setIsMyCameraOn(!prevState);
    toggleCamera(!prevState);
    session.signal({
      type: 'toggleCamera',
      data: JSON.stringify({
        userId: userInfo.memberId,
        status: !prevState,
      })
    })
      .then(() => console.log(`카메라 토글 신호 보냄`))
      .catch(err => console.log(err))
  }


  const toggleMyMic = () => {
    const prevState = isMyMicOn;
    setIsMyMicOn(!prevState);
    toggleMic(!prevState);
    session.signal({
      type: 'toggleMic',
      data: JSON.stringify({
        userId: userInfo.memberId,
        status: !prevState,
      })
    })
      .then(() => console.log(`마이크 토글 신호 보냄`))
      .catch(err => console.log(err))
  }


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


  const receiveToggleCamera = (event) => {
    const signalData = JSON.parse(event.data);
    const cameraStatus = signalData.status;
    const signalUser = signalData.userId;
    if (signalUser !== userInfo.memberId && isMyMicOn) {
      setIsChildCameraOn(cameraStatus);
    }


  }

  const receiveToggleMic = (event) => {
    const signalData = JSON.parse(event.data);
    const micStatus = signalData.status;
    const signalUser = signalData.userId;

    if (signalUser !== userInfo.memberId && isMyMicOn) {
      setIsChildMicOn(micStatus);
    }
  }

  const exitSessionSignal = () => {
    session.signal({
      type: 'exitSession'
    })
      .then(() => console.log(`세션 종료 신호 보냄`))
      .catch(err => console.log(err))
  }

  const receiveExitSessionSignal = ((event) => {
    setIsSessionEnd(true);
  })

  useEffect(() => {
    if (session) {
      session.on('signal:toggleGame', receiveToggleGameStarted);
      session.on('signal:toggleCamera', receiveToggleCamera);
      session.on('signal:toggleMic', receiveToggleMic);
      session.on('signal:exitSession', receiveExitSessionSignal);
    }

    return () => {
      if (session) {
        session.off('signal:toggleGame', receiveToggleGameStarted);
        session.off('signal:toggleCamera', receiveToggleCamera);
        session.off('signal:toggleMic', receiveToggleMic);
        session.off('signal:exitSession', receiveExitSessionSignal);
      }
    }
  }, [session]);

  return (
    <>
      <GameNav
        exitSessionSignal={exitSessionSignal}
      />
      <div style={{marginTop: "5.7%"}}>
        {!isSessionEnd ? ( // Change here
          isGameStarted
            ? <VolunteerGamePage
              renderUserVideoComponent={renderUserVideoComponent}
              mainStreamManager={mainStreamManager}
              subscribers={subscribers}
              session={session}
              toggleMyCamera={toggleMyCamera}
              toggleMyMic={toggleMyMic}
              isMyCameraOn={isMyCameraOn}
              isMyMicOn={isMyMicOn}
              isChildCameraOn={isChildCameraOn}
              isChildMicOn={isChildMicOn}/>
            : <VideoChattingLobby
              renderUserVideoComponent={renderUserVideoComponent}
              mainStreamManager={mainStreamManager}
              subscribers={subscribers}
              toggleMyCamera={toggleMyCamera}
              toggleMyMic={toggleMyMic}
              isMyCameraOn={isMyCameraOn}
              isMyMicOn={isMyMicOn}
              isChildCameraOn={isChildCameraOn}
              isChildMicOn={isChildMicOn}
              />
        ) : (
            <VideoChattingExit
              capturedImages={capturedImages}
              session={session}/>
          )

        }

        {/* 게임 상태를 토글하는 버튼 */}
        {!isSessionEnd && (
          <button onClick={signalToggleGameStarted}>
            {isGameStarted ? 'Stop Game' : 'Start Game'}
          </button>
        )}
      </div>
    </>

  );
};

export default VideoChattingPage;
