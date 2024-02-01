import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 10px solid rgb(255, 215, 7);
`;

const Header = styled.header`
  align-self: flex-start;
  margin: 1rem;
`;

const H1 = styled.h1`
  font-weight: bold;
  color: rgb(134, 134, 134);
`

const ContentWrapper = styled.div`
  flex: 1;
  width: 100vw;
  display: flex;
`;

const LeftContent = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const RightContent = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  input, button, select {
    background-color: rgb(255, 241, 165);
    border: none;
    border-radius: 1rem;
    margin: 0.5rem;
    padding: 0.5rem;
  }

  p {
    margin: 0.5rem;
  }
`;

const LogoImage = styled.img`
  height: 20vh;
`;

const InfoSpan = styled.span`
  background-color: rgb(255, 241, 165);
  padding: 0.5rem;
  border-radius: 1rem;
`;

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('')
  const [userName, setUserName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [birth, setBirth] = useState('')
  const [centerId, setCenterId] = useState('')

  const navigate = useNavigate()

  // phoneNumber 변경 함수 (자동으로 '-' 삽입)
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
    const formattedValue = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    setPhoneNumber(formattedValue);
  };
  

  const signUp = async (memberEmail, memberPassword, memberType, memberName, memberPhoneNumber, memberbirth, centerId) => {
    try {
      console.log('rkwk');
      const res = await axios.post('https://i10e103.p.ssafy.io/api/v1/member/register', {
        memberEmail, memberPassword, memberType, memberName, memberPhoneNumber, memberbirth, centerId
      });
  
      console.log(res);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <Container>
      <Header>
        <Link to={'/'}>
          <FaArrowLeft />
        </Link>
      </Header>
      <H1>회원가입</H1>
      <ContentWrapper>
        <LeftContent>
          <LogoImage src="./7lans_logo.png" alt="" />
          <InfoSpan>
            <h5>
              봉사자와 피봉사자의 연결을 도와주는 보조 웹 사이트
            </h5>
          </InfoSpan>
        </LeftContent>
        <RightContent>
          <form>
            <input type="text" placeholder={email? '': 'email'} value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder={password? '': 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder={userName? '': 'userName'} value={userName} onChange={(e) => setUserName(e.target.value)} />
            <select value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="">사용자 타입 선택</option>
              <option value="V">봉사자</option>
              <option value="C">학생</option>
              <option value="M">관리자</option>
            </select>
            {(userType === "C" || userType === "M") &&
              <select value={centerId} onChange={(e) => setCenterId(e.target.value)}>
                <option value="">센터 선택</option>
                <option value={1}>A 센터</option>
                <option value={2}>B 센터</option>
                <option value={3}>C 센터</option>
                <option value={3}>D 센터</option>
              </select>
            }
            <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} />
            <input type="text" placeholder={phoneNumber ? '' : 'phoneNumber'} value={phoneNumber} onChange={(e) => handlePhoneNumberChange(e)} />
            <p>아이디 찾기 | 비밀번호 찾기 | </p>
            <Link to={'/login'}>로그인</Link>
            <button type='button' onClick={() => signUp(email, password, userType, userName, phoneNumber, birth, centerId)}>회원가입</button>
          </form>
        </RightContent>
      </ContentWrapper>
    </Container>
  );
}

export default Register;
