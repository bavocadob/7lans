import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const UpperDiv = styled.div`
  flex: 1.2;
  background-color: #fffdf6;
  border-radius: 20px;
  border-radius: 20px;
  border: solid 3px black;
  margin-bottom: 15px;
  margin-left: -10px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileCard = styled.div`
  width: 40%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
`;

const InformationSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChildSearchInput = styled.input`
  width: 70%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

function VolUpdiv() {
  const selectVolCard = useSelector((state) => state.adminSelectVol);
  let name, email, birth;
  name = selectVolCard[0];
  email = selectVolCard[1];
  birth = selectVolCard[2];

  return (
    <>
      <UpperDiv>
        <ProfileCard>
          {/* 이미지도 넣기 */}
          <ProfileImage src="./admin_pic/봉사자프로필예시.png" alt="Profile" />
        </ProfileCard>
        <InformationSection>
          <p>email: {email}</p>
          <p>Name: {name}</p>
          <p>Age: {birth}</p>
        </InformationSection>
        <SearchContainer>
          <ChildSearchInput type="text" placeholder="학생 검색" />
        </SearchContainer>
      </UpperDiv>
    </>
  );
}

export default VolUpdiv;
