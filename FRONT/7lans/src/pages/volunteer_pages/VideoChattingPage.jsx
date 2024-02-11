import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import GameNav from '../../components/navs/GameNav';
import UseOpenViduSession from "../../helpers/useOpenViduSession.jsx";
import VideoChattingLobby from "./VideoChattingLobby.jsx";
import VolunteerGamePage from "./VolunteerGamePage.jsx";
import {useSelector} from "react-redux";

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
  const userInfo = useSelector((state) => state.user.value);


  // 페이지 로드시 세션 생성
  useEffect(() => {
    joinSession();
  }, []);

  // 페이지 이탈시 세션 디스커넥트하게 설정
  useEffect(() => {
    return () => {
      if (session) {
        session.disconnect();
      }
    }
  }, [session]);

  useEffect(() => {

  //   TODO 미팅 ID를 바탕으로 이쪽에 접속, 접속시 미팅 데이터를 조회하고 본인과 관계없는 미팅이면 돌려보낸다.
    console.log(userInfo)
  }, [userInfo]);


  // FIXME 테스트용 토글 method 이후 지울 것
  const toggleGameStarted = () => {
    setGameStarted(prevState => !prevState);
  };

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
      <button onClick={toggleGameStarted}>
        {isGameStarted ? 'Stop Game' : 'Start Game'}
      </button>

    </AppContainer>
  );
};

export default VideoChattingPage;
