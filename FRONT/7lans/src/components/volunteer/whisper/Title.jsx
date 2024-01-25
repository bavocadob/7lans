import React from "react";
import styled from "styled-components";

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  margin-right: 10px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid black;
  padding: 5px;
`;

const Title = () => {
  return (
    <>
      <TitleContainer>
        <Label>제목</Label>
        <Input placeholder="제목을 입력하세요" />
      </TitleContainer>
    </>
  );
};

export default Title;
