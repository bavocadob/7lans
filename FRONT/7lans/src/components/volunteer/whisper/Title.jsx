import React from "react";
import styled from "styled-components";

const TitleContainer = styled.div`
  border: solid black 2px;
  display: flex;
  align-items: center;
  flex-direction: row; /* 가로 방향으로 정렬되도록 수정 */
`;

const Label = styled.label`
  padding-left: 3%;
  width: 20%;
`;

const Input = styled.input`
  border: none;
  border-left: solid 2px black;
  width: 100%;
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
