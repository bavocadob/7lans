import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import getEnv from "../../utils/getEnv";
import { adminAddFriend } from "../../store/adminAddFriendSlice";
import { adminDeleteFriend } from "../../store/adminDeleteFriendSlice";

import VolunteerProfileEx from "../../images/admin_pic/volunteer_profile_example.png"

const UpperDiv = styled.div`
  flex: 0.4;
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
  height: 100px;
  overflow-y: auto;
  position: relative;
  justify-content: center;
  align-items: center;
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
  position: relative;
  z-index: 0;
`;

const GetFriendBtn = styled.button`
  position: absolute;
  top: 50px;
  right: 10px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function VolUpDiv() {
  const selectVolCard = useSelector((state) => state.adminSelectVol.value);
  const userInfo = useSelector((state) => state.user);
  const urlInfo = getEnv("API_URL");
  const centerId = userInfo.value.centerId;
  const deleteFriend = useSelector((state) => state.adminDeleteFriend);
  const [childList, setChildList] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [childId, setChildId] = useState("");
  const dispatch = useDispatch();
  let name, email, time, volId;
  name = selectVolCard[0];
  email = selectVolCard[1];
  time = selectVolCard[2];
  volId = selectVolCard[3];

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    axios
      .post(`${urlInfo}/child/centerAndVolunteerNoRelation`, {
        childCenterId: centerId,
        volunteerId: volId,
      })
      .then((response) => {
        const arr = response.data.map((element) => ({
          childName: element.childName,
          centerName: element.childCenterName,
          childBirth: element.childBirth,
          childId: element.childId,
        }));
        setChildList(arr);
      })
      .catch((err) => {
        console.error(err, "err -> VolUpDiv");
      });
  }, [volId, deleteFriend]);

  const filteredChilds = childList.filter((child) =>
    Object.values(child).some(
      (property) =>
        typeof property === "string" &&
        property.toLowerCase().includes(search.toLowerCase())
    )
  );

  const onClick = (childId) => {
    setChildId(childId);
    setShowModal(true);
  };

  const handleAddFriend = () => {
    axios
      .post(`${urlInfo}/relation/create`, {
        childId: childId,
        volunteerId: volId,
      })
      .then((res) => {
        console.log("친구맺기 성공");
        setChildList((prevChildList) =>
          prevChildList.filter((child) => child.childId !== childId)
        );
        dispatch(adminAddFriend(true));
        dispatch(adminDeleteFriend(false));
      })
      .catch((err) => {
        console.error(err, "친구맺기 오류 -> VolUpDiv");
      });
    setShowModal(false);
  };

  return (
    <>
      <UpperDiv>
        <ProfileCard>
          {/* 이미지도 넣기 */}
          <ProfileImage src={VolunteerProfileEx} alt="Profile" />
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
                <h6>{child.childName}</h6>
                <h6>{child.childBirth}</h6>
                <GetFriendBtn onClick={() => onClick(child.childId)}>
                  친구추가
                </GetFriendBtn>
              </ChildCard>
            ))}
          </ChildList>
        </SearchChildContainer>
      </UpperDiv>
      {showModal && (
        <Modal>
          <ModalContent>
            <p>친구 추가하시겠습니까?</p>
            <ButtonContainer>
              <ConfirmButton onClick={handleAddFriend}>확인</ConfirmButton>
              <CancelButton onClick={closeModal}>취소</CancelButton>
            </ButtonContainer>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default VolUpDiv;
