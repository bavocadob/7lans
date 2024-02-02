import React from "react";
import styled from "styled-components";

const LowerDiv = styled.div`
  flex: 2.2;
  background-color: #fffdf6;
  border-radius: 20px;
  border-radius: 20px;
  border: solid 3px black;
  margin-left: -10px;
  margin-bottom: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 넘치는 부분 숨기기 */
`;

const LowerProfileCard = styled.div`
  width: 20%;
  height: 50%;
  margin: 10px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgb(45, 45, 45);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  margin-top: 30px;
`;

const LowerProfileImage = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 70px;
  margin-bottom: 10px;
`;

// 추가적으로 페이지 내비게이션 스타일링
const PaginationContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
`;

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function VolLowDiv() {
  return (
    <>
      <LowerDiv>
        {Array.from({ length: 4 }).map((_, index) => (
          <LowerProfileCard key={index}>
            <LowerProfileImage src="./admin_pic/프로필예시.png" alt="Profile" />
            <p>Name: John Doe</p>
            <p>Age: 25</p>
          </LowerProfileCard>
        ))}
        <PaginationContainer>
          <PaginationButton>1</PaginationButton>
          <PaginationButton>2</PaginationButton>
          {/* Add more pagination buttons as needed */}
        </PaginationContainer>
      </LowerDiv>
    </>
  );
}

export default VolLowDiv;
