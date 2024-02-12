import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import getEnv from "../../utils/getEnv";
import { adminAddFriend } from "../../store/adminAddFriendSlice";
import {adminDeleteFriend }from "../../store/adminDeleteFriendSlice";

const LowerDiv = styled.div`
  flex: 2.1;
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

const LowerProfileImage = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 70px;
  margin-bottom: 10px;
`;

const LowerProfileCard = styled.div`
  position: relative;
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

const ProfileInfo = styled.div`
  width: 90%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #ff8f8f;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const DeleteModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ConfirmButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;

const VolLowDiv = () => {
  const urlInfo = getEnv("API_URL");
  const selectVolCard = useSelector((state) => state.adminSelectVol);
  const addFriend = useSelector((state) => state.adminAddFriend)
  const [childList, setChildList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [relationId, setRelationId] = useState(null);
  const volId = selectVolCard.value[3];
  const dispatch = useDispatch();

  console.log(addFriend, "addFreind")
  useEffect(() => {
    axios
      .get(`${urlInfo}/child/listByVolunteer/${volId}`)
      .then((res) => {
        setChildList(res.data);
      })
      .catch((err) => {
        console.log(err, "err -> VolLowDiv");
      });
      // 다른 걸 감시해야함
  }, [volId, addFriend]);

  const handleDeleteClick = (relationId) => {
    setShowDeleteModal(true);
    setRelationId(relationId);
  };

  const handleConfirmDelete = () => {
    axios
      .post(`${urlInfo}/relation/delete`, {
        relationId: relationId,
      })
      .then((res) => {
        console.log(res, "친구끊기");
        setChildList((prevChildList) =>
          prevChildList.filter((child) => child.relationId !== relationId)
        );
        dispatch(adminAddFriend(false))
        dispatch(adminDeleteFriend(true))
      })
      .catch((err) => {
        console.log(err, "err -> VolLowDiv 친구끊기 오류");
      });
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <LowerDiv>
        {childList.map((child) => (
          <LowerProfileCard key={child.relationId}>
            <LowerProfileImage src="./admin_pic/프로필예시.png" alt="Profile" />
            <DeleteButton onClick={() => handleDeleteClick(child.relationId)}>
              X
            </DeleteButton>
            <ProfileInfo>
              Name: {child.childName}
              <br />
              Birth: {child.childBirth}
              <br />
              Center: {child.childCenterName}
            </ProfileInfo>
          </LowerProfileCard>
        ))}
      </LowerDiv>
      {showDeleteModal && (
        <DeleteModal>
          정말 삭제하시겠습니까?
          <ConfirmButton onClick={handleConfirmDelete}>확인</ConfirmButton>
          <CancelButton onClick={handleCancelDelete}>취소</CancelButton>
        </DeleteModal>
      )}
    </>
  );
};

export default VolLowDiv;
