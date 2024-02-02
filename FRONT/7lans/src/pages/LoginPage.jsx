import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../store/userSlice';
import { FcKey } from "react-icons/fc";
import { FcContacts } from "react-icons/fc";

const Container = styled.div`
  height: 93vh;
  width: 95vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 8px solid rgb(255, 215, 7);
  margin-top: 1.5%;
  margin-left: 2.3%;
  background-color:rgb(255, 255, 241);
`;

const Header = styled.header`
  align-self: flex-start;
  margin: 1rem;
`;

const H1 = styled.h1`
  font-weight: bold;
  color: rgb(53, 53, 53);
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
  margin: 2%;
`;

const Line = styled.div`
  border: 1px dashed rgb(226, 198, 60);
  height: 90%;
  margin-top: 20px
`

const RightContent = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2%;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  button {
    background-color: rgb(255, 241, 165);
    border: none;
    border-radius: 14.52px;
    margin: 0.5rem;
    padding: 0.5rem;
    height: 50px;
    width: 100px;
    margin-left: 35%;
    margin-top: 7%;
  }

  p {
    margin: 0.5rem;
  }
`;

const IdFind =  styled.p`
  margin-left: 10px

`
const EmailInput = styled.input`
    background-color: rgb(255, 241, 165);
    border: none;
    border-radius: 14.52px;
    margin-left: 10px;
    padding: 1rem;
    height: 50px;
    width: 300px
`
const PasswordInput = styled.input`
background-color: rgb(255, 241, 165);
    border: none;
    border-radius: 14.52px;
    margin-left: 10px;
    padding: 1rem;
    height: 50px;
    width: 300px
`

const LogoImage = styled.img`
  height: 22vh;
  margin-bottom: 8%;
`;

const InfoSpan = styled.span`
  background-color: rgb(255, 241, 165);
  padding: 0.5rem;
  border-radius: 14.52px;
  width: 540px;
  text-align: center;
  margin-bottom: 10%;
  
`;

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.user.value)
  const dispatch = useDispatch()

  const login = async (memberEmail, memberPassword) => {
    try {
      const res = await axios.post('https://i10e103.p.ssafy.io/api/v1/member/login', {
        memberEmail,
        memberPassword
      });
      // console.log(res);
      if (res && res.data.memberType === 'CHILD') {
        navigate('/child_main');
        dispatch(updateUserInfo(res.data))
      }
      else if (res && res.data.memberType === 'VOLUNTEER') {
        navigate('/volunteer_main')
        dispatch(updateUserInfo(res.data))
      }
      else if (res && res.data.memberType === 'MANAGER') {
        navigate('/admin_main_page')
        dispatch(updateUserInfo(res.data))
      }
    } 
    catch (err) {
      console.error(err);
    }
    console.log(userInfo)
  };

  return (
    <Container>
      <Header>
        <Link to={'/'}>
          <FaArrowLeft />
        </Link>
      </Header>
      <H1>로그인</H1>
      <ContentWrapper>
        <LeftContent>
          <LogoImage src="./7lans_logo.png" alt="" />
          <InfoSpan>
            <h5 style={{margin: '0'}} >
              봉사자와 피봉사자의 연결을 도와주는 보조 웹 사이트
            </h5>
          </InfoSpan>
        </LeftContent>
        <Line />
        <RightContent>
          <div>
          <p> <FcContacts /> <EmailInput type="text" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email? email:''} 
                    placeholder='이메일을 입력하세요(test@email.com)' /></p>
          <p> <FcKey /> <PasswordInput type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password? password:''} 
                        placeholder='비밀번호를 입력하세요' /></p>
            <div style={{marginLeft: '20%'}}> 아이디 찾기  |  비밀번호 찾기  |  {"  "}
            <Link to={'/register'}>회원가입 </Link>
            </div>
            <button onClick={() => login(email, password)}>로그인</button>
          </div>
        </RightContent>
      </ContentWrapper>
    </Container>
  );
}

export default LoginPage;
