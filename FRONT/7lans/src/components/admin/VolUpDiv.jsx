import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

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
`;

const SearchChildContainer = styled.div`
  height: 100%;
  width: 60%;
  border-radius: 10px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function VolUpDiv() {
  const selectVolCard = useSelector((state) => state.adminSelectVol);
  const userInfo = useSelector((state) => state.user);
  const urlInfo = useSelector((state) => state.url.value);
  const centerId = userInfo.value.centerId;
  const [childList, setChildList] = useState([]);
  const [search, setSearch] = useState("");
  console.log(centerId);

  let name, email, birth;
  name = selectVolCard[0];
  email = selectVolCard[1];
  birth = selectVolCard[2];

  useEffect(() => {
    axios
      .get(`${urlInfo}/manager/child/${centerId}`)
      .then((response) => {
        const arr = [];
        for (const element of response.data) {
          console.log(element);
          let childName, centerName, childId, childBirth;
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
          }
          arr.push([childName, centerName, childBirth]);
        }
        setChildList(arr);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const filteredChilds = childList.filter((Child) =>
    Child.some(
      (property) =>
        typeof property === "string" &&
        property.toLowerCase().includes(search.toLowerCase())
    )
  );

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
          <p>Birth: {birth}</p>
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
              </ChildCard>
            ))}
          </ChildList>
        </SearchChildContainer>
      </UpperDiv>
    </>
  );
}

export default VolUpDiv;
