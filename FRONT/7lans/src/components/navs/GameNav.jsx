import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeGame } from "../../store/chooseGameSlice";
import { motion } from "framer-motion";

import Logo from "../../images/7lans_logo.png";
import ImgCaptureBtn from "../../img_upload/ImgCaptureBtn";

const NavBar = styled.nav`
  position: fixed;
  width: 100%;
  height: 100px;
  background-color: rgb(255, 215, 3);
  display: flex;
  padding-right: 15%;
  top: 0;
`;

const LogoImage = styled.img`
  height: 70px;
  margin-left: 40px;
  margin-top: 15px;
`;

const CloseImg = styled.img`
  height: 90px;
  width: 80px;
  padding-bottom: 1.5rem;
  margin-top: 0;
`;

const GameNav = () => {
  const gameChange = useSelector((state) => state.isPlayGameNow.value);
  const dispatch = useDispatch();

  const goToOtherGame = (num) => {
    if (gameChange === true) {
      dispatch(changeGame(num));
    }
  };

  return (
    <NavBar className="shadow">
      <Link to="/volunteer_main">
        <LogoImage src={Logo} alt="logo" />
      </Link>

      <div style={{ display: "flex", width: "100%", marginLeft: "10%" }}>
        <motion.a
          whileHover={{ scale: 1.1 }}
          onHoverStart={(e) => {}}
          onHoverEnd={(e) => {}}
          style={{
            width: "130px",
            height: "55px",
            alignSelf: "center",
            fontWeight: "bolder",
            fontSize: "20px",
            border: "none",
            borderRadius: "20px",
            backgroundColor: "rgb(255, 237, 170)",
            margin: "0 2rem 0 0",
          }}
        >
          <button
            className="shadow"
            style={{
              width: "130px",
              height: "55px",
              alignSelf: "center",
              fontWeight: "bolder",
              fontSize: "20px",
              border: "none",
              borderRadius: "20px",
              backgroundColor: "rgb(255, 237, 170)",
              margin: "0 2rem 0 0",
            }}
            onClick={() => goToOtherGame(Number(1))}
          >
            {" "}
            퀴즈 출제
          </button>
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.1 }}
          onHoverStart={(e) => {}}
          onHoverEnd={(e) => {}}
          style={{
            width: "130px",
            height: "55px",
            alignSelf: "center",
            fontWeight: "bolder",
            fontSize: "20px",
            border: "none",
            borderRadius: "20px",
            backgroundColor: "rgb(255, 237, 170)",
            margin: "0 2rem 0 0",
          }}
        >
          <button
            className="shadow"
            style={{
              width: "130px",
              height: "55px",
              alignSelf: "center",
              fontWeight: "bolder",
              fontSize: "20px",
              border: "none",
              borderRadius: "20px",
              backgroundColor: "rgb(255, 237, 170)",
              margin: "0 2rem 0 0",
            }}
            onClick={() => goToOtherGame(Number(2))}
          >
            {" "}
            카드 짝찾기
          </button>
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.1 }}
          onHoverStart={(e) => {}}
          onHoverEnd={(e) => {}}
          style={{
            width: "130px",
            height: "55px",
            alignSelf: "center",
            fontWeight: "bolder",
            fontSize: "20px",
            border: "none",
            borderRadius: "20px",
            backgroundColor: "rgb(255, 237, 170)",
            margin: "0 2rem 0 0",
          }}
        >
          <button
            className="shadow"
            style={{
              width: "130px",
              height: "55px",
              alignSelf: "center",
              fontWeight: "bolder",
              fontSize: "20px",
              border: "none",
              borderRadius: "20px",
              backgroundColor: "rgb(255, 237, 170)",
              margin: "0 2rem 0 0",
            }}
            onClick={() => goToOtherGame(Number(3))}
          >
            {" "}
            구구단
          </button>
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.1 }}
          onHoverStart={(e) => {}}
          onHoverEnd={(e) => {}}
          style={{
            width: "130px",
            height: "55px",
            alignSelf: "center",
            fontWeight: "bolder",
            fontSize: "20px",
            border: "none",
            borderRadius: "20px",
            backgroundColor: "rgb(255, 237, 170)",
            margin: "0 2rem 0 0",
          }}
        >
          <button
            className="shadow"
            style={{
              width: "130px",
              height: "55px",
              alignSelf: "center",
              fontWeight: "bolder",
              fontSize: "20px",
              border: "none",
              borderRadius: "20px",
              backgroundColor: "rgb(255, 237, 170)",
              margin: "0 2rem 0 0",
            }}
            onClick={() => goToOtherGame(Number(4))}
          >
            {" "}
            문장 만들기
          </button>
        </motion.a>
        <div style={{
            width: "200px",
            height: "55px",
            alignSelf: "center",
            fontWeight: "bolder",
            fontSize: "20px",
            border: "none",
            borderRadius: "20px",
            margin: "0",
            alignSelf: "center",}}>
          화상 시간 나오는 공간
        </div>
        <motion.a
          className="shadow"
          whileHover={{ scale: 1 }}
          onHoverStart={(e) => {}}
          onHoverEnd={(e) => {}}
          style={{
            width: "100px",
            height: "54px",
            alignSelf: "center",
            fontWeight: "bolder",
            fontSize: "20px",
            border: "none",
            borderRadius: "20px",
            backgroundColor: "rgb(255, 237, 170)",
            margin: "0 1rem 0 0",
          }}
        >
          <ImgCaptureBtn />
        </motion.a>

        <div style={{ display: "flex", marginTop: "12px", marginRight: "0" }}>
          <Link to="/volunteer_video_chatting_start">
            <CloseImg src="./Close_video_chat.png" />
          </Link>
        </div>
      </div>
    </NavBar>
  );
};

export default GameNav;
