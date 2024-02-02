import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from "framer-motion";

const Container = styled.div`
  background: linear-gradient(
                        180deg,
                  rgba(255, 230.27, 102, 0.71),
                  rgb(255,215,3) 60%,
                  rgba(255, 248.22, 224.19, 0)100%);
  /* background-color: rgb(255, 215, 7); */
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogoImage = styled.img`
  margin-bottom: 1rem;
  width: 380px;
  margin-bottom:20px;
`;

const InfoSpan = styled.span`
  background-color: rgb(253, 236, 136);
  padding: 0.8rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 1rem;
  text-align: center;
  margin-bottom:60px;
  margin-top:20px
`;

const LoginButton = styled(Link)`
  background-color: rgb(240, 165, 8);
  padding: 0.7rem;
  width: 231.86px;
  border-radius: 102.67px;
  transition: background-color 0.3s ease-in-out;
  gap:10.37px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: rgb(0, 164, 27);
  }
`;

const variants = {
    hidden: {
      opacity: 0.2,
      y: 15
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse"
      }
    })
  };

const items = ["️❤️", "💛", "💜"];

const HeartContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row; /* 가로로 정렬되도록 변경 */
  align-items: center;
`;

const Heart = () => {
  return (
    <HeartContainer>
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial="hidden"
          animate="visible"
          variants={variants}
          custom={i}
        >
          {item}
        </motion.li>
      ))}
    </HeartContainer>
  );
};

const EntryPage = () => {
  return (
    
    <Container>
      <LogoImage src="./7lans_logo.png" alt="" />
        <Heart />
      <InfoSpan className='shadow'>
        <h3 style={{margin: '0'}}>
          봉사자와 피봉사자의 연결을 도와주는 보조 웹 사이트
        </h3>
      </InfoSpan>
      <LoginButton className='shadow'
                  style={{fontSize:'20px',
                          color: 'white'}} to="/login">
        로그인
      </LoginButton>
    </Container>
  );
}

export default EntryPage;
