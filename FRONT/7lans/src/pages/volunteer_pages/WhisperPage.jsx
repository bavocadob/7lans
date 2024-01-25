import React, { useState } from "react";
import styled from "styled-components";
import DateTime from "../../components/volunteer/whisper/DateTime";
import Title from "../../components/volunteer/whisper/Title";
import IndexToVol from "../../components/volunteer/whisper/IndexToVol";
import IndexToChild from "../../components/volunteer/whisper/IndexToChild";
import Wheather from "../../components/volunteer/whisper/Wheather";
import WhisperLetterToChild from "../../components/volunteer/whisper/WhisperLetterToChild";
import WhisperLetterFromChild from "../../components/volunteer/whisper/WhisperLetterFromChild";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 20px;
  margin-top: 10%;
  background-image: url("../../public/Whisper/속닥속닥.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 700px;
  position: relative;
`;

const Container = styled.div`
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
  margin-right: 100px;
`;

const FromChild = styled.div`
  padding: 20px;
  width: 30%;
  font-family: Arial, sans-serif;
  margin-left: 100px;
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
  );
};

export default WhisperPage;
