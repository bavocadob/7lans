import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeGame } from "../../store/chooseGameSlice";
import { motion } from "framer-motion"

const NavBar = styled.nav`
  position: relative;
  top: 0;
  width: 100%;
  height: 100px;
  background-color: rgb(255, 215, 3);
  display: flex;
  padding-right: 15%;
`;

const LogoImage = styled.img`
  height: 70px;
  margin-left: 40px;
  margin-top: 15px;
`;

const GameNav = () => {

  const gameChange = useSelector((state) => state.isPlayGameNow.value)
  const dispatch = useDispatch()

  const goToOtherGame = (num) => {
    if (gameChange === true) {
      dispatch(changeGame(num))
    }
  }

  return (
    <NavBar className="shadow">
      <Link to="/volunteer_main">
        <LogoImage src="./7lans_logo.png" alt="logo" />
      </Link>
     
<<<<<<< HEAD
      <div style={{display: 'flex', width: '100%', marginLeft:'33%'}}>
=======
      <div style={{display: 'flex', width: '100%', marginLeft:'25%'}}>
>>>>>>> feature/front/dinosaur-page
       <motion.a
            whileHover={{ scale: 1.1 }}
            onHoverStart={e => {}}
            onHoverEnd={e => {}}
            style={{width: '150px', 
                        height:'55px', 
                        alignSelf: 'center', 
                        fontWeight: 'bolder', 
                        fontSize: '20px', 
                        border: 'none',
                        borderRadius: '20px',
                        backgroundColor: 'rgb(255, 237, 170)', 
                        margin: '0 3rem 0 0'}}
          >
        <button className='shadow' 
                style={{width: '150px', 
                        height:'55px', 
                        alignSelf: 'center', 
                        fontWeight: 'bolder', 
                        fontSize: '20px', 
                        border: 'none',
                        borderRadius: '20px',
                        backgroundColor: 'rgb(255, 237, 170)', 
                        margin: '0 3rem 0 0'}} 
                onClick={() => goToOtherGame(Number(1))}> 퀴즈 출제
        </button></motion.a>

        <motion.a
            whileHover={{ scale: 1.1 }}
            onHoverStart={e => {}}
            onHoverEnd={e => {}}
            style={{width: '150px', 
                        height:'55px', 
                        alignSelf: 'center', 
                        fontWeight: 'bolder', 
                        fontSize: '20px', 
                        border: 'none',
                        borderRadius: '20px',
                        backgroundColor: 'rgb(255, 237, 170)', 
                        margin: '0 3rem 0 0'}}
          >
        <button className='shadow' 
                style={{width: '150px', 
                        height:'55px', 
                        alignSelf: 'center', 
                        fontWeight: 'bolder', 
                        fontSize: '20px', 
                        border: 'none',
                        borderRadius: '20px',
                        backgroundColor: 'rgb(255, 237, 170)', 
                        margin: '0 3rem 0 0'}}  onClick={() => goToOtherGame(Number(2))}> 카드 짝찾기
        </button></motion.a>

        <motion.a
            whileHover={{ scale: 1.1 }}
            onHoverStart={e => {}}
            onHoverEnd={e => {}}
            style={{width: '150px', 
                        height:'55px', 
                        alignSelf: 'center', 
                        fontWeight: 'bolder', 
                        fontSize: '20px', 
                        border: 'none',
                        borderRadius: '20px',
                        backgroundColor: 'rgb(255, 237, 170)', 
                        margin: '0 3rem 0 0'}}
          >
        <button className='shadow' 
                style={{width: '150px', 
                        height:'55px', 
                        alignSelf: 'center', 
                        fontWeight: 'bolder', 
                        fontSize: '20px', 
                        border: 'none', 
                        borderRadius: '20px',
                        backgroundColor: 'rgb(255, 237, 170)', 
                        margin: '0 3rem 0 0'}} 
                onClick={() => goToOtherGame(Number(3))}> 구구단
        </button></motion.a>

        <motion.a
            whileHover={{ scale: 1.1 }}
            onHoverStart={e => {}}
            onHoverEnd={e => {}}
            style={{width: '150px', 
                        height:'55px', 
                        alignSelf: 'center', 
                        fontWeight: 'bolder', 
                        fontSize: '20px', 
                        border: 'none',
                        borderRadius: '20px',
                        backgroundColor: 'rgb(255, 237, 170)', 
                        margin: '0 3rem 0 0'}}
          >
        <button className='shadow' 
                style={{width: '150px', 
                        height:'55px', 
                        alignSelf: 'center', 
                        fontWeight: 'bolder', 
                        fontSize: '20px', 
                        border: 'none', 
                        borderRadius: '20px',
                        backgroundColor: 'rgb(255, 237, 170)', 
                        margin: '0 3rem 0 0'}} 
                onClick={() => goToOtherGame(Number(4))}> 문장 만들기
        </button></motion.a>
      </div>
      
    </NavBar>
  );
};

export default GameNav;
