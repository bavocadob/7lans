import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  background-color: rgb(255, 215, 7);
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImage = styled.img`
  margin-bottom: 1rem;
`;

const InfoSpan = styled.span`
  background-color: rgb(255, 241, 165);
  padding: 1rem;
  border-radius: 1rem;
`;

const LoginButton = styled(Link)`
  background-color: rgb(240, 165, 8);
  padding: 1rem;
  border-radius: 1rem;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: rgb(255, 211, 7);
  }
`;

const EntryPage = () => {
  return (
    <Container>
      <LogoImage src="./7lans_logo.png" alt="" />
      <InfoSpan>
        <h3>
          봉사자와 피봉사자의 연결을 도와주는 보조 웹 사이트
        </h3>
      </InfoSpan>
      <LoginButton to="/login">
        로그인
      </LoginButton>
    </Container>
  );
}

export default EntryPage;
