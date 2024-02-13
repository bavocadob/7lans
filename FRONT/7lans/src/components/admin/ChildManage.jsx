import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import NormalNav from "../navs/NormalNav";
import ChildUpDiv from "./ChildUpDiv";
import ChildLowDiv from "./ChildLowDiv";
import { adminSelectChild } from "../../store/adminSelectChildSlice";
import { useDispatch, useSelector } from "react-redux";
import getEnv from "../../utils/getEnv";

const StyledChildManage = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  margin-top: 100px;
`;

const ChildManageContainer = styled.div`
  flex: 1;
  display: flex;
`;

const LeftContainer = styled.div`
  flex: 1;
  height: 620px;
  background-color: #fde79b;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const RightContainer = styled.div`
  flex: 2;
  height: 101%;
  background-color: #fde79b;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ChildListContainer = styled.div`
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

// ChildListContainer의 컨텐츠들
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

const ChildCardList = styled.div`
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

const ChildCard = styled.div`
  width: 80%;
  height: 160px;
  background-color: ${(props) => (props.isSelected ? "#ffd700" : "#ffe792")};
  margin-bottom: 15px;
  margin-left: 40px;
  padding: 15px;
  border-radius: 20px; /* borderRadius 값을 20px로 변경하여 귀엽고 입체적인 느낌을 줍니다 */
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s; /* transform transition 추가 */
  align-items: center; /* 세로 중앙 정렬 추가 */

  &:hover {
    background-color: #ffd700;
    transform: translateY(
      -5px
    ); /* 호버 시 약간 위로 이동하여 입체적인 느낌을 줍니다 */
  }
`;

const ChildManage = () => {
  const urlInfo = getEnv("API_URL");
  const dispatch = useDispatch();
  const selectChildCard = useSelector((state) => state.adminSelectChild);
  const userInfo = useSelector((state) => state.user);
  const centerId = userInfo.value.centerId;
  // 카드 선택하기
  const [selectedCard, setSelectedCard] = useState(null);
  // 검색어 상태
  const [search, setSearch] = useState("");
  // 학생 리스트
  const [ChildList, setChildList] = useState([]);

  // 해당 센터의 학생리스트 가져오기
  useEffect(() => {
    axios
      .get(`${urlInfo}/child/listByCenter/${centerId}`)
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
        console.error(err, "err -> ChildUpDiv");
      });
  }, []);

  const handleChildClick = (Child, index) => {
    setSelectedCard(index);
    dispatch(adminSelectChild(Child));
  };

  // 검색함수
  const filteredChilds = ChildList.filter((Child) =>
    Child.some(
      (property) =>
        typeof property === "string" &&
        property.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <StyledChildManage>
      <NormalNav />
      <ChildManageContainer>
        <LeftContainer>
          <ChildListContainer>
            <h2>아동리스트</h2>
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="학생이름이나 날짜 검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchContainer>
            <ChildCardList>
              {/* 검색 결과에 따라 동적으로 ChildCard를 생성 */}
              {filteredChilds.map((Child, index) => (
                <ChildCard
                  key={index}
                  isSelected={index === selectedCard}
                  onClick={() => handleChildClick(Child, index)}
                >
                  <h3>{Child[0]} 아동</h3>
                  <br />
                  <h5>{Child[1]}</h5>
                  <h5>{Child[2]}</h5>
                </ChildCard>
              ))}
            </ChildCardList>
          </ChildListContainer>
        </LeftContainer>
        <RightContainer>
          <ChildUpDiv />
          <ChildLowDiv />
        </RightContainer>
      </ChildManageContainer>
    </StyledChildManage>
  );
};

export default ChildManage;
