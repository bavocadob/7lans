import React from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* 텍스트 위치를 조정하기 위해 position 속성 추가 */
`;

const Image = styled.img`
  width: 380px;
  height: 400px;
  position: absolute;
  bottom: 45px;
  right: 60px;
`;

const TextContainer = styled.div`
  position: absolute; /* 텍스트를 이미지 위에 위치시키기 위해 position 속성 추가 */
  top: 0px;
  left: 100px;
  // background-color: #b5d84c; /* 말풍선 배경색 설정 */
  // padding: 8px 16px; /* 말풍선 내부 여백 설정 */
  // border-radius: 8px; /* 말풍선 테두리 둥글게 설정 */
`;

const Text = styled.div`
  position: absolute;
  top: 115px;
  left: 60px;
  width: 70%;
  color: rgb(45,45,45);
  font-weight: bold;
  font-size: 30px;
  text-align: center; 
`;

export default function WhisperFirst() {
  return (
    <>
      <Box>
        {/* 이미지를 바꿀 수 있게 수정하기*/}
        <Image src="/Whisper/sampleDia.png" alt="dinosaur" />
        <TextContainer>
          <img src="../../text_balloon.png" alt="말풍선" style={{width:'400px', transform: 'rotate(-20deg)'}}></img>
          <Text>어떤 학생의 속닥속닥을 보실건가요? 학생을 선택해 주세요</Text>
        </TextContainer>
      </Box>
    </>
  );
}
