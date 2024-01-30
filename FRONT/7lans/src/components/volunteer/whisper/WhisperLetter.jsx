import React from "react";
import styled from "styled-components";

// 스타일드 컴포넌트를 사용하여 스타일 정의
const LetterContainer = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  margin: 20px;
  border: 1px solid #ddd;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  font-size: 16px;
  padding: 10px;
  margin-top: 10px;
`;

// 편지지를 나타내는 React 컴포넌트 정의
const WhisperLetter = () => {
  return (
    <LetterContainer>
      <h2>편지를 쓰세요</h2>
      <TextArea placeholder="편지를 작성해 보세요..." />
    </LetterContainer>
  );
};

export default WhisperLetter;
