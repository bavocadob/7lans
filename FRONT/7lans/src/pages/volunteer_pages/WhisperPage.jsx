import React from "react";
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
  position: relative; /* 상대적인 위치 설정 */
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  justify-content: center; /* 컨테이너를 가로 중앙으로 정렬 */
  position: absolute; /* 절대적인 위치 설정 */
  top: 50%; /* 컨테이너를 수직 중앙으로 위치시키기 위해 top을 50%로 설정 */
  transform: translateY(
    -50%
  ); /* 컨테이너를 수직으로 정확히 중앙으로 위치시키기 위해 translateY를 -50%로 설정 */
`;

const FormToChild = styled.form`
  padding: 20px;
  width: 30%;
  height: 600px;
  font-family: Arial, sans-serif;
  margin-right: 100px; /* 컨테이너 사이의 간격을 조정 */
`;

const FromChild = styled.div`
  padding: 20px;
  width: 30%;
  font-family: Arial, sans-serif;
  margin-left: 100px; /* 컨테이너 사이의 간격을 조정 */
`;

const WhisperPage = () => {
  return (
    <PageContainer>
      <Container>
        {/* prevent 필요. */}
        <FormToChild>
          <DateTime />
          <IndexToVol />
          <Title />
          <WhisperLetterToChild />
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
