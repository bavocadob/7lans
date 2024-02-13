import React from "react";
import { useSelector } from "react-redux";
import getEnv from "../../utils/getEnv";
import axios from "axios";
import NormalNav from "../navs/NormalNav";
import styled from "styled-components";
import ActiveLeft from "./ActiveLeft";
import ActiveRight from "./AcitveRight";

const Container = styled.div`
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  height: 100vh; /* 화면 전체 높이만큼 설정 */
`;

const BoardContainer = styled.div`
  border: #ff9f1c solid;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
  height: 600px; /* 최소 높이 설정 */
  width: 1500px;
  display: flex; /* 세로 정렬을 위해 flex 속성 적용 */
`;

const ActiveLeftContainer = styled.div`
  flex: 2; /* 동일한 너비를 갖도록 설정 */
  margin-top: 20px;
`;

const ActiveRightContainer = styled.div`
  flex: 2; /* 동일한 너비를 갖도록 설정 */
  margin-top: 20px;
`;

const ActiveManage = () => {
  return (
    <Container>
      <NormalNav />
      <BoardContainer>
        <ActiveLeftContainer>
          <ActiveLeft />
        </ActiveLeftContainer>

        <ActiveRightContainer>
          <ActiveRight />
        </ActiveRightContainer>
      </BoardContainer>
    </Container>
  );
};

export default ActiveManage;
