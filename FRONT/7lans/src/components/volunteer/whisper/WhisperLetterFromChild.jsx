import React from "react";
import styled from "styled-components";

const Letter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Content = styled.div`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: #060606;
  background-color: #f9f8f8;
  width: 100%;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const WhisperLetterFromChild = () => {
  // 받은 편지 내용 연결하기
  const letterContent = "선생님 보고싶어요!";

  return (
    <Letter>
      <Content>{letterContent}</Content>
    </Letter>
  );
};

export default WhisperLetterFromChild;
