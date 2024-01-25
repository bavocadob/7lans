import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url('/main_page_background.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;

  /* 링크 스타일링 */
  header {
    display: flex;
    justify-content: flex-end;
    height: 10%;
  }

  a {
    text-decoration: none; /* 밑줄 제거 */
    color: rgb(0, 0, 0); /* 글자 색상 설정 */
    font-size: 18px; /* 글자 크기 설정 */
    font-weight: bolder;
    margin: 2rem;

    &:hover {
      text-decoration: underline; /* 호버 시 밑줄 추가 */
    }
  }

  position: relative; /* relative로 설정 */

  span {
    position: absolute; /* 절대 위치 설정 */
    bottom: 16.5rem; /* 아래 여백 조절 */
    right: 20rem; /* 오른쪽 여백 조절 */
    font-size: 24px; /* 글자 크기 설정 */
    font-weight: bold;
    color: rgb(0, 0, 0); /* 글자 색상 설정 */
  }
`;

const LogoImage = styled.img`
  position: absolute; /* 절대 위치 설정 */
  left: 5rem; /* 왼쪽 여백 조절 */
  top: 2rem; /* 상단 여백 조절 */
  height: 15vh;
`;

const ChildMainPage = () => {
  return (
    <Container>
      <header>
        <LogoImage src='./7lans_logo.png' />
        <Link to={'/dinosaur_dict'}>공룡도감</Link>
        <Link to={'/'}>로그아웃</Link>
      </header>
      <span>
        <Link to={'/child_start'}>나의 선생님</Link>
      </span>
    </Container>
  );
};

export default ChildMainPage;
