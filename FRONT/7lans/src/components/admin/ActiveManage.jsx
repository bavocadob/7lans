import React from "react";
import { useSelector } from "react-redux";
import getEnv from "../../utils/getEnv";
import axios from "axios";
import NormalNav from "../navs/NormalNav";
import styled from "styled-components";
import ActiveLeft from "./ActiveLeft";
import ActiveRight from "./AcitveRight";


const BoardContainer = styled.div`
  border: #ff9f1c solid;
  margin-top: 130px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 600px; /* 최소 높이 설정 */
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
    <>
      <NormalNav />
      <BoardContainer>
        <ActiveLeftContainer>
          <ActiveLeft />
        </ActiveLeftContainer>
       
        <ActiveRightContainer>
          <ActiveRight />
        </ActiveRightContainer>
      </BoardContainer>
    </>
  );
};

export default ActiveManage;
