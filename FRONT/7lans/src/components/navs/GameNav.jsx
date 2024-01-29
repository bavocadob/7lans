import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeGame } from "../../store/chooseGameSlice";

const NavBar = styled.nav`
  position: relative;
  top: 0;
  width: 100vw;
  height: 100px;
  background-color: rgb(255, 215, 3);
`;

const LogoImage = styled.img`
  height: 70px;
  margin-left: 40px;
  margin-top: 15px;
`;

const GameNav = () => {
  
  const dispatch = useDispatch()

  return (
    <NavBar className="shadow">
      <Link to="/volunteer_main">
        <LogoImage src="./7lans_logo.png" alt="logo" />
      </Link>
        <button onClick={() => dispatch(changeGame(Number(1)))}>퀴즈 출제하기</button>
        <button onClick={() => dispatch(changeGame(Number(2)))}>하노이</button>
        <button onClick={() => dispatch(changeGame(Number(3)))}>구구단</button>
        <button onClick={() => dispatch(changeGame(Number(4)))}>문장 만들기</button>
    </NavBar>
  );
};

export default GameNav;
