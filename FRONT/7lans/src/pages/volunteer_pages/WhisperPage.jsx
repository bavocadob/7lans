import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DateTime from "../../components/volunteer/whisper/DateTime";
import Title from "../../components/volunteer/whisper/Title";
import IndexToVol from "../../components/volunteer/whisper/IndexToVol";
import IndexToChild from "../../components/volunteer/whisper/IndexToChild";
import Wheather from "../../components/volunteer/whisper/Wheather";
import WhisperLetterToChild from "../../components/volunteer/whisper/WhisperLetterToChild";
import WhisperLetterFromChild from "../../components/volunteer/whisper/WhisperLetterFromChild";
import CommonSidePanel from "../../components/side_panels/CommonSidePanel";
import NormalNav from "../../components/navs/NormalNav";
import PostIt from "../../components/volunteer/post_it/PostIt";
import SelectedPostit from "../../components/volunteer/post_it/SelectedPostit";

const PageContainer = styled.div`
  margin-top: 5%;
  margin-left: 10%;
  display: flex;
  justify-content: center;
  padding: 0 20px;
  background-image: url("../../public/Whisper/속닥속닥.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 80%;
  height: 500px;
  position: relative;
`;

const Container = styled.div`
  padding-top: 15%;
  display: flex;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const FormToChild = styled.div`
  padding: 20px;
  width: 30%;
  height: 600px;
  font-family: Arial, sans-serif;
  margin-right: 80px;
`;

const FromChild = styled.div`
  margin-top: 50px;
  padding: 20px;
  width: 30%;
  font-family: Arial, sans-serif;
  margin-left: 80px;
`;

const SendBtn = styled.button`
  border: 2px solid limegreen;
  width: 20%;
  height: 4%;
  background-color: limegreen;
  color: white;
  font-size: 16px;
  margin-left: 250px;
`;

const WhisperPage = () => {
  const [titleData, setTitleData] = useState("");
  const [formToChildData, setFormToChildData] = useState("");

  // SendBtn 클릭 시 데이터 전송 함수
  const sendData = () => {
    // 데이터를 다른 곳으로 전송
    // 예시로 콘솔에 데이터를 출력
    console.log("Title 데이터:", titleData);
    console.log("FormToChild 데이터:", formToChildData);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <NormalNav />
      <div
        style={{
          flex: 1,
          padding: "30px",
          backgroundColor: "rgb(255, 226, 123)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            borderRadius: "20px",
            backgroundColor: "rgb(255, 226, 123)",
          }}
        >
          <CommonSidePanel />
          <div
            style={{
              width: "90%",
              flex: 1,
              borderRadius: "0 20px 20px 0",
              backgroundColor: "rgb(255, 255, 255)",
            }}
          >
            <PageContainer>
              <Container>
                <FormToChild>
                  <DateTime />
                  <IndexToVol />
                  <Title onChange={(e) => setTitleData(e.target.value)} />
                  <WhisperLetterToChild
                    onChange={(e) => setFormToChildData(e.target.value)}
                  />

                  <SendBtn onClick={sendData}>보내기</SendBtn>
                </FormToChild>

                <FromChild>
                  <Wheather />
                  <IndexToChild />
                  <WhisperLetterFromChild />
                </FromChild>
              </Container>
            </PageContainer>
          </div>

          <div style={{ width: "10%", backgroundColor: "rgb(255, 226, 123)" }}>
            <PostIt message={"/volunteer_video_chatting_start"} />
            <PostIt message={"/volunteer_active_doc"} />
            <SelectedPostit message={"/volunteer_whispher"} />
            <PostIt message={"/volunteer_raise_egg"} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            right: "2%",
            top: "10rem",
          }}
        ></div>
      </div>
    </div>
  );
};

export default WhisperPage;
