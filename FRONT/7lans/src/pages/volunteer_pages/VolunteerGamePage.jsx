import React from "react";
import { useSelector } from "react-redux";
import { GrGamepad } from "react-icons/gr";
import { motion } from "framer-motion";
import GameNav from "../../components/navs/GameNav";
import Chat from "../../components/volunteer/games/Chatting";
import Gugudan from "../../components/volunteer/games/Gugudan";
import Quiz from "../../components/volunteer/games/Quiz";
import Words from "../../components/volunteer/games/Words";
import CardFind from "../../components/volunteer/games/CardFind";

const VolunteerGamePage = ({
    session,
    renderUserVideoComponent,
    mainStreamManager,
    subscribers,
    toggleMyCamera,
    toggleMyMic,
    isMyCameraOn,
    isMyMicOn,
    isChildCameraOn,
    isChildMicOn
  }) => {
  const gameSelector = useSelector((state) => state.chooseGame.value);

  const renderGame = () => {
    if (gameSelector === 1) {
      return <Quiz session={session} />;
    }
    if (gameSelector === 2) {
      return <CardFind session={session} />;
    }
    if (gameSelector === 3) {
      return <Gugudan session={session} />;
    }
    if (gameSelector === 4) {
      return <Words session={session} />;
    }
    return (
      <div
        className="center"
        style={{
          fontSize: "45px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        게임을 골라주세요.
        <motion.div
          animate={{
            scale: [1, 1.5, 1.5, 1, 1],
            rotate: [0, 0, 180, 360, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          <GrGamepad />
        </motion.div>
      </div>
    );
  };

  return (
    <>
      <div>
      <Chat
          renderUserVideoComponent={renderUserVideoComponent}
          mainStreamManager={mainStreamManager}
          subscribers={subscribers}
          session={session}
          toggleMyCamera={toggleMyCamera}
          toggleMyMic={toggleMyMic}
          isMyCameraOn={isMyCameraOn}
          isMyMicOn={isMyMicOn}
          isChildCameraOn={isChildCameraOn}
          isChildMicOn={isChildMicOn}
        />
      </div>
      <div>
        {renderGame()}
      </div>
    </>
  );
};

export default VolunteerGamePage;
