import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import getEnv from "../../utils/getEnv";

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
  width: 50%;
  height: 20%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ChildList = styled.div`
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
  justify-content: center;
  align-items: center;
`;

// const ChildCard = styled.div`
//   width: 60%;
//   height: 70%;
//   margin-bottom: 5px;
//   border: 2px solid black;
//   border-radius: 10px;
//   text-align: center;
//   justify-content: center;
//   align-items: center;
//   margin-right: -20px;
// `;

const SearchChildContainer = styled.div`
  height: 100%;
  width: 60%;
  border-radius: 10px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChildCard = styled.div`
  width: 60%;
  height: 70%;
  margin-bottom: 5px;
  border: 2px solid black;
  border-radius: 10px;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-right: -20px;
  position: relative; /* 상대적인 위치 설정 */
`;

const GetFriendBtn = styled.button`
  position: absolute; /* 부모 요소에 상대적으로 배치 */
  top: 50px; /* 원하는 위치 조정 */
  right: 10px; /* 원하는 위치 조정 */
`;

function VolUpDiv() {
  const selectVolCard = useSelector((state) => state.adminSelectVol.value);
  const userInfo = useSelector((state) => state.user);
  const urlInfo = getEnv("API_URL");
  const centerId = userInfo.value.centerId;
  const [childList, setChildList] = useState([]);
  const [search, setSearch] = useState("");

  let name, email, time, volId;
  name = selectVolCard[0];
  email = selectVolCard[1];
  time = selectVolCard[2];
  volId = selectVolCard[3];

  useEffect(() => {
    axios
      .get(`${urlInfo}/manager/child/${centerId}`)
      .then((response) => {
        const arr = [];
        // console.log(response.data, "센터의 아동들");
        for (const element of response.data) {
          // console.log(element, "아동개인의 정보");
          let childName, centerName, childRelationId, childBirth, childId;
          for (const ele in element) {
            if (ele === "childName") {
              childName = element[ele];
            }
            if (ele === "childCenterName") {
              centerName = element[ele];
            }
            if (ele === "childBirth") {
              childBirth = element[ele];
            }
            if (ele === "childId") {
              childId = element[ele];
            }
          }
          arr.push([childName, centerName, childBirth, childId]);
        }
        setChildList(arr);
      })
      .catch((err) => {
        console.error(err, "err -> VolUpDiv");
      });
  }, []);

  const filteredChilds = childList.filter((Child) =>
    Child.some(
      (property) =>
        typeof property === "string" &&
        property.toLowerCase().includes(search.toLowerCase())
    )
  );

  const onClick = (childId) => {
    axios
      .post(`${urlInfo}/relation/create`, {
        childId: childId,
        volunteerId: volId,
      })
      .then((res) => {
        console.log("친구맺기 성공");
      })
      .catch((err) => {
        console.log(err, "친구맺기 오류 -> VolUpDiv");
      });
  };

  return (
    <>
      <UpperDiv>
        <ProfileCard>
          {/* 이미지도 넣기 */}
          <ProfileImage src="./admin_pic/봉사자프로필예시.png" alt="Profile" />
        </ProfileCard>
        <InformationSection>
          <p>Name : {name}</p>
          <p>email : {email}</p>
          <p>time : {time ? { time } : 0}</p>
        </InformationSection>
        <SearchChildContainer>
          <SearchContainer>
            <ChildSearchInput
              type="text"
              placeholder="아동이름 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchContainer>
          <ChildList>
            {filteredChilds.map((child, index) => (
              <ChildCard key={index}>
                <h6>{child[0]}</h6>
                <h6>{child[2]}</h6>
                <GetFriendBtn onClick={() => onClick(child[3])}>
                  친구추가
                </GetFriendBtn>
              </ChildCard>
            ))}
          </ChildList>
        </SearchChildContainer>
      </UpperDiv>
    </>
  );
}

export default VolUpDiv;
