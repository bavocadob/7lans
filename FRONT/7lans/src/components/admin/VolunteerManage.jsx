import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import NormalNav from "../navs/NormalNav";

const StyledVolunteerManage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const VolunteerManageContainer = styled.div`
  flex: 1;
  display: flex;
`;

const LeftContainer = styled.div`
  flex: 1;
  background-color: #fde79b;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const RightContainer = styled.div`
  flex: 2;
  background-color: #fde79b;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const VolunteerListContainer = styled.div`
  flex: 1;
  background-color: #fffdf6;
  border-radius: 20px;
  border: solid 3px black;
  max-height: 80vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: -10px;
`;

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

// VolunteerListContainer의 컨텐츠들
const SearchContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 91%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
`;

const CildSearchInput = styled.input`
  width: 70%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const VolunteerCardList = styled.div`
  flex-direction: column;
  overflow-y: auto;
  max-height: 100vh;
  width: 100%;
  height: 100%;
  padding: 0;
  border-radius: 20px;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-left: -50px;
  margin-right: -20px;
`;

const VolunteerCard = styled.div`
  width: 80%;
  height: 160px;
  background-color: #ffe792;
  margin-bottom: 15px;
  margin-left: 40px;
  padding: 15px;
  border: 2px solid black;
  border-radius: 10px;
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

// 아래로 upperdiv contents
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

function VolunteerManage() {
  // 검색어 상태
  const [search, setSearch] = useState("");
  // 봉사자 리스트
  const volunteerList = [
    "봉사자 정보 1",
    "봉사자 정보 2",
    "봉사자 정보 3",
    "봉사자 정보 4",
  ];

  // `https://i10e103.p.ssafy.io/api/v1/vol/search/${옥세훈}`;
  axios
    .post(`https://i10e103.p.ssafy.io/api/v1/vol/search/${"옥세훈"}`)
    .then((response) => {
      console.log(response.data, "bye");
    })
    .catch((error) => {
      console.error(error);
    })
    .then(() => {
      // 항상 실행
    });

  axios
    .get(`https://i10e103.p.ssafy.io/api/v1/manager/volunteerList`)
    .then((response) => {
      console.log(response.data, "hi");
    })
    .catch((error) => {
      console.error(error);
    })
    .then(() => {
      // 항상 실행
    });

  const volunteerName = {
    volunteerName: "옥세훈",
  };
  axios
    .get(`https://i10e103.p.ssafy.io/api/v1/vol/search/${volunteerName}`)
    .then((response) => {
      console.log(response.data, "hi");
    })
    .catch((error) => {
      // 오류발생시 실행
    })
    .then(() => {
      // 항상 실행
    });

  // 검색어와 일치하는 봉사자 필터링
  const filteredVolunteers = volunteerList.filter((volunteer) =>
    volunteer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <StyledVolunteerManage>
      <NormalNav />
      <VolunteerManageContainer>
        <LeftContainer>
          <VolunteerListContainer>
            <h2>봉사자리스트</h2>
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="봉사자 검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchContainer>
            <VolunteerCardList>
              {/* 검색 결과에 따라 동적으로 VolunteerCard를 생성 */}
              {filteredVolunteers.map((volunteer, index) => (
                <VolunteerCard key={index}>{volunteer}</VolunteerCard>
              ))}
            </VolunteerCardList>
          </VolunteerListContainer>
        </LeftContainer>
        <RightContainer>
          <UpperDiv>
            <ProfileCard>
              <ProfileImage
                src="./admin_pic/봉사자프로필예시.png"
                alt="Profile"
              />
              <p>Name: John Doe</p>
              <p>Age: 25</p>
            </ProfileCard>
            <InformationSection>
              <p>Phone: 123-456-7890</p>
              <p>Management Center: Center A</p>
              <p>Birthday: January 1, 1990</p>
            </InformationSection>
            <SearchContainer>
              <CildSearchInput type="text" placeholder="학생 검색" />
            </SearchContainer>
          </UpperDiv>
          <LowerDiv>
            {Array.from({ length: 4 }).map((_, index) => (
              <LowerProfileCard key={index}>
                <LowerProfileImage
                  src="./admin_pic/프로필예시.png"
                  alt="Profile"
                />
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
        </RightContainer>
      </VolunteerManageContainer>
    </StyledVolunteerManage>
  );
}

export default VolunteerManage;
