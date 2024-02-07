import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../store/userSlice";
import { updateChildInfo } from "../../store/childSlice";
import { updateChildrenInfo } from "../../store/childrenSlice";
import axios from "axios"

const Container = styled.div`
/* font-family: 'Nanum Gothic', sans-serif; */
  height: 100vh;
  width: 100vw;
  background-image: url('/main_page_background.png');
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
  left: 3rem;
  top: 20%;
  /* background-color: rgb(255, 240, 186); */
  border-radius: 100px;
  /* box-shadow: 5px 5px 5px #ffde95;  */
  .img {
    display: flex;
    align-items: center;
  }

  :hover{
    transform: scale(1.01);
    transition: 0.2s ease-in-out;
  }
`;

// const TextBox = styled.h2`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     width: 220px;
//     border-radius: 15px;
//     background: #b798e0;
//     /* box-shadow: 5px 5px 5px #dfb150;  */
//     height: 50px;
//     margin-left: 1.4rem;
//     color: white;
// `

const Letter = styled.div`
  position: relative;
  width: 1250px;
  top: 53px;
  left: 200px;
  
`;

const Overlap = styled.div`
  height: 195px;
  left: 218px;
  position: absolute;
  top: 56px;
  width: 867px;
  transform: rotate(3deg);
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

const MainBanner = styled.div`
  /* border: 1px solid black; */
  width: 1070px;
  height: 80px;
  position: absolute;
  left: 390px;
  top: 77%;
  display: flex;
  flex-direction: row;
  justify-content: end;
`

const BannerText = styled.p`
  color: white;
  font-size: 50px;
  p {
  animation-duration: 2s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    margin-right: 100%;
    /* width: 300%; */
  }

  to {
    margin-left: 0%;
    /* width: 100%; */
  }
}
`

const UnderSection = styled.div`
  position: absolute;
  top: 83%;
  left: 2.5%;
  width: 95vw;
  height: 115px;
  padding: 1.4rem;
`;

const ExpBar = styled.div`
  width: 100%;
  height: 60px;
  border: 3px solid rgb(45,45,45);
  background-color: rgb(255, 240, 186);
  border-radius: 20px;
  margin-top: 10px;
`;

const FilledExp = styled.div`
  height: 100%;
  border-radius: 10px;
  background-color: rgba(255, 184, 36, 1); /* 채우진 부분의 색상 */
`;

const VolunteerMainPage = () => {
  const urlInfo = useSelector((state) => state.url.value)
  const userInfo = useSelector((state) => state.user.value);
  const dino = useSelector((state) => state.dino.value)
  const dispatch = useDispatch();
  const calculatedWidth = userInfo?.volunteerTime >= 100 ? userInfo.volunteerTime % 100 : userInfo?.volunteerTime || 0;
  const quotient = Math.floor(calculatedWidth / 100);
  //아동 데이터 가져오기(봉사자 id를 가지고 있어야함)
  useEffect(() => {
    axios
      .get(`${urlInfo}/vol/list/${userInfo.memberId}`)
      .then((res) => {
        dispatch(updateChildInfo(res.data[0]));
        dispatch(updateChildrenInfo(res.data));
      })
      .catch((err) => {});
  }, []);

  const resetData = () => {
    dispatch(updateChildInfo(""));
    dispatch(updateChildrenInfo([]));
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
          to={"/dinosaur_dict"}
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
          to={"/volunteer_start"}
          style={{ fontSize: "23px", textDecorationLine: "none" }}
        >
          <img src="../../../main_page/main_page_children.png" alt="나의 아이들 이미지" />
          {/* <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">
  Tooltip on bottom
</button> */}
        </Link>
      </MyChildren>
        <MainBanner>
          {/* <img style={{ width: "80%", height: '70%' }} src="../../../main_page/main_banner.png" alt="선" /> */}
        <BannerText>
          {quotient === 0? 
            <p> 아이들과 함께한 시간 : {calculatedWidth} 시간 </p> 
          : <p> 아이들과 함께한 시간 : {quotient*100} 하고도 + {calculatedWidth} 시간 </p> }
          </BannerText>
        </MainBanner>
      <Letter>
        <Overlap>
          <Line>
            <img style={{ width: "80%" }} src="../../../main_page/line.png" alt="선" />
            
          </Line>
          <Link to={"/volunteer_whispher"}>
            <LeftLetter>
              <img
                style={{ width: "70px" }}
                src="../../../main_page/left_letter.png"
                alt="편지"
              />
            </LeftLetter>
          </Link>
          <Link to={"/volunteer_whispher"}>
            <MiddleLetter>
              <img
                style={{ width: "70px" }}
                src="../../../main_page/middle_letter.png"
                alt="편지"
              />
            </MiddleLetter>
          </Link>
          <Link to={"/volunteer_whispher"}>
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
        <Link to={"/volunteer_whispher"}>
          <PostBox>
            <img
              style={{ width: "180px" }}
              src="../../../main_page/post.png"
              alt="우편함"
            />
          </PostBox>
        </Link>
      </Letter>
      <UnderSection>
        {/* {quotient === 0? 
          <h3> 아이들과 함께한 시간 : {calculatedWidth} 시간 </h3> 
          : <h3> 아이들과 함께한 시간 : {quotient*100} 하고도 + {calculatedWidth} 시간 </h3> }
         */}
        <div>
          <ExpBar>
            <FilledExp style={{ width: `${calculatedWidth}%` }} />
          </ExpBar>
        </div>
      </UnderSection>
    </Container>
  );
};

export default VolunteerMainPage;
