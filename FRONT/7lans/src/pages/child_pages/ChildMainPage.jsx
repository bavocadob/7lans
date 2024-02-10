import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../store/userSlice";
import axios from "axios";
import { updateVolInfo } from "../../store/volSlice";
import { updateVolsInfo } from "../../store/volsSlice";
import getEnv from "../../utils/getEnv";

const Container = styled.div`
/* font-family: 'Nanum Gothic', sans-serif; */
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
    180deg,
    rgba(255, 230.27, 102, 0.71),
    rgb(255, 215, 3) 60%,
    rgba(255, 248.22, 224.19, 0) 100%
  );
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  header {
    display: flex;
    justify-content: flex-end;
    margin-right: 2rem;
    background-color: rgb(255, 215, 3);
    width: 100%;
    height: 100px;
  }

  a {
    color: rgb(45, 45, 45); /* 글자 색상 설정 */
    font-size: 18px; /* 글자 크기 설정 */
    font-weight: bolder;
    margin: 2rem;
    text-decoration-line: none;
    display: flex;
    flex-direction: column;
    text-align: center;

    &:hover {
      text-decoration: underline; /* 호버 시 밑줄 추가 */
    }
  }
`;

const LogoImage = styled.img`
  position: absolute; /* 절대 위치 설정 */
  left: 3rem; /* 왼쪽 여백 조절 */
  top: 1rem; /* 상단 여백 조절 */
  height: 70px;
`;

const MyChildren = styled.div`
  position: absolute;
  left: 4rem;
  top: 20%;
  .img {
    display: flex;
    align-items: center;
  }
  .h2 {
    position: absolute;
    left: 3.4rem;
    top: 69%;
    width: 220px;
    font-size: 23px;
    border-radius: 40px;
    background: rgba(255, 184, 36, 1);
    text-align: center;
    box-shadow: 5px 5px 5px #dfb150;
  }
`;

const Letter = styled.div`
  position: relative;
  width: 1250px;
  top: 130px;
  left: 200px;
`;

const Overlap = styled.div`
  height: 195px;
  left: 218px;
  position: absolute;
  top: 40px;
  width: 867px;
`;

const Line = styled.div`
  height: 133px;
  left: 16%;
  position: absolute;
  width: 880px;
`;

const LeftLetter = styled.div`
  position: absolute;
  left: 33%;
  top: 10%;
`;

const MiddleLetter = styled.div`
  position: absolute;
  left: 56%;
  top: 20%;
`;

const RightLetter = styled.div`
  position: absolute;
  left: 79%;
  top: 33%;
`;

const AirPlane = styled.div`
  left: 22%;
  object-fit: cover;
  position: absolute;
  top: 65px;
  width: 164px;
  transform: rotate(-20deg);
`;

const PostBox = styled.div`
  height: 250px;
  left: 1050px;
  object-fit: cover;
  position: absolute;
  width: 220px;
`;



const VolunteerMainPage = () => {
  const urlInfo = getEnv('API_URL');
  const userInfo = useSelector((state) => state.user.value);
  const dino = useSelector((state) => state.dino.value)
  const dispatch = useDispatch();
  const calculatedWidth = userInfo?.volunteerTime >= 100 ? userInfo.volunteerTime % 100 : userInfo?.volunteerTime || 0;
  const quotient = Math.floor(calculatedWidth / 100);
  //아동 데이터 가져오기(봉사자 id를 가지고 있어야함)
  useEffect(() => {
    axios
      .get(`${urlInfo}/volunteer/listByChild/${userInfo.memberId}`)
      .then((res) => {
        console.log(res.data)
        dispatch(updateVolInfo(res.data[0]));
        dispatch(updateVolsInfo(res.data));
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  const resetData = () => {
    dispatch(updateVolInfo(""));
    dispatch(updateVolsInfo([]));
    dispatch(updateUserInfo(""));
  };

  return (
    <Container>
      {console.log(userInfo)}
      {console.log(dino)}
      <header className="shadow">
        <LogoImage src="./7lans_logo.png" />
        <Link
          style={{ fontSize: "23px", textDecorationLine: "none" }}
          to={"/child_dinosaur_dict"}
        >
          공룡도감
        </Link>
        <Link
          style={{ fontSize: "23px", textDecorationLine: "none" }}
          to={"/"}
          onClick={() => resetData()}
        >
          로그아웃
        </Link>
      </header>
      <MyChildren>
        <Link
          to={"/child_start"}
          style={{ fontSize: "23px", textDecorationLine: "none" }}
        >
          <img src="../../../main_page/main_page_children.png" alt="나의 아이들 이미지" />
        </Link>
      </MyChildren>

      <Letter>
        <Overlap>
          <Line>
            <img style={{ width: "80%" }} src="../../../main_page/line.png" alt="선" />
          </Line>

          <Link to={"/child_whispher"}>
            <LeftLetter>
              <img
                style={{ width: "70px" }}
                src="../../../main_page/left_letter.png"
                alt="편지"
              />
            </LeftLetter>
          </Link>
          <Link to={"/child_whispher"}>
            <MiddleLetter>
              <img
                style={{ width: "70px" }}
                src="../../../main_page/middle_letter.png"
                alt="편지"
              />
            </MiddleLetter>
          </Link>
          <Link to={"/child_whispher"}>
            <RightLetter>
              <img
                style={{ width: "70px" }}
                src="../../../main_page/right_letter.png"
                alt="편지"
              />
            </RightLetter>
          </Link>
        </Overlap>
        <AirPlane>
          <img
            style={{ width: "70px" }}
            src="../../../main_page/airplane.png"
            alt="비행기"
          />
        </AirPlane>
        <Link to={"/child_whispher"}>
          <PostBox>
            <img
              style={{ width: "180px" }}
              src="../../../main_page/post.png"
              alt="우편함"
            />
          </PostBox>
        </Link>
      </Letter>
      
    </Container>
  );
};

export default VolunteerMainPage;
