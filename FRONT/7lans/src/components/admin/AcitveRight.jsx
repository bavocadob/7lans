import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import getEnv from "../../utils/getEnv";
import axios from "axios";
import Modal from "react-modal";

const RightContainer = styled.div`
  height: 90%;
  border-left: solid 5px #edafb8;
  display: flex;
  flex-direction: column;
`;

const HeaderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const ActiveHeader = styled.div`
  flex: 1;
  padding: 10px;
  border-bottom: 2px solid #ccc;
`;

const ActiveContent = styled.div`
  flex: 3;
  padding: 20px;
  word-wrap: break-word;
`;

const ApproveButton = styled.button`
  background-color: #ff6b81;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ActiveRight = () => {
  const { activityId, relationId } = useSelector(
    (state) => state.adminSelectActive
  );
  const userInfo = useSelector((state) => state.user);
  const isApproval = useSelector((state) => state.adminApproveBtn.value)
  const centerId = userInfo.value.centerId;
  const urlInfo = getEnv("API_URL");
  const [activeLog, setActiveLog] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const fecthActives = async () => {
    try {
      const res = await axios.post(`${urlInfo}/activityLog/manager/detail`, {
        relationId: relationId,
        activityLogId: activityId,
      });
      console.log(res.data, "활동일지");
      setActiveLog(res.data);
    } catch (err) {
      console.error("err ActiveRight activity detail", err);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "";

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(date);
  };

  const fetchApporve = async (centerId, relationId, activityId) => {
    try {
      const res = await axios.post(`${urlInfo}/activityLog/manager/approve`, {
        centerId: centerId,
        relationId: relationId,
        activityLogId: activityId,
      });
      console.log(res.data, "승인완료");
    } catch (err) {
      console.error("err ActiveRight activity 승인", err);
    }
  };

  const onClick = (centerId, relationId, activityId) => {
    fetchApporve(centerId, relationId, activityId);
    closeModal()
  };

  useEffect(() => {
    fecthActives();
  }, [activityId]);

  return (
    <RightContainer>
      <ActiveHeader>
        <HeaderItem>
          <Label>Date:</Label>
          <div>{activeLog.dateInfo}</div>
        </HeaderItem>
        <HeaderItem>
          <Label>Start Time:</Label>
          <div>{formatDateTime(activeLog.activityStartTime)}</div>
        </HeaderItem>
        <HeaderItem>
          <Label>End Time:</Label>
          <div>{formatDateTime(activeLog.activityEndTime)}</div>
        </HeaderItem>
        <HeaderItem>
          <Label>Service Time:</Label>
          <div>{activeLog.activityTime}</div>
        </HeaderItem>
        <HeaderItem>
          <Label>Volunteer Name:</Label>
          <div>{activeLog.volunteerName}</div>
        </HeaderItem>
        <HeaderItem>
          <Label>Center Name:</Label>
          <div>{activeLog.centerName}</div>
        </HeaderItem>
      </ActiveHeader>
      <ActiveContent>
        {activeLog.content}
        {isApproval ? null:<ApproveButton onClick={openModal}>승인하기</ApproveButton>}
       
      </ActiveContent>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="승인 확인"
      >
        <ModalContainer>
          <div>승인하시겠습니까?</div>
          <ButtonContainer>
            <ApproveButton
              onClick={() => onClick(centerId, relationId, activityId)}
            >
              승인
            </ApproveButton>
            <ApproveButton onClick={closeModal}>취소</ApproveButton>
          </ButtonContainer>
        </ModalContainer>
      </Modal>
    </RightContainer>
  );
};

export default ActiveRight;
