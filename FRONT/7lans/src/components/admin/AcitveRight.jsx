import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import getEnv from "../../utils/getEnv";
import axios from "axios";
import Modal from "react-modal";
import { adminAddFriend } from "../../store/adminAddFriendSlice";

const RightContainer = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  border-radius: 10px; /* 테두리에 귀여운 모양을 주기 위해 */
  border: 2px solid #ffa5ab; /* 귀여운 트렌디한 색상의 테두리 추가 */
  padding: 10px; /* 테두리 안의 내용과 여백을 조정 */
`;

const HeaderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px; /* 헤더 아이템 간격을 조정 */
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 10px; /* 라벨과 값 사이의 간격을 조정 */
`;

const ActiveHeader = styled.div`
  flex: 1;
  padding: 10px;
  border-bottom: 2px solid #ffa5ab; /* 헤더 아이템과 컨텐츠를 구분하는 선의 색상을 변경 */
`;

const ActiveContent = styled.div`
  flex: 3;
  padding: 20px;
  word-wrap: break-word;
`;

const ApproveButton = styled.button`
  background-color: #ff6b81;
  color: white;
  padding: 8px 16px; /* 크기 조정 */
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  align-self: flex-end; /* 오른쪽에 위치 */
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

const NoList = styled.div``;

const ActiveRight = () => {
  const { activityId, relationId } = useSelector(
    (state) => state.adminSelectActive
  );
  const userInfo = useSelector((state) => state.user);
  const isApproval = useSelector((state) => state.adminApproveBtn.value);
  const { filteredListLen, filteredApproveListLen } = useSelector(
    (state) => state.adminNoList
  );
  const centerId = userInfo.value.centerId;
  const urlInfo = getEnv("API_URL");
  const [activeLog, setActiveLog] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isApproveSuccessModalOpen, setIsApproveSuccessModalOpen] =
    useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeApproveSuccessModal = () => {
    setIsApproveSuccessModalOpen(false);
  };

  // 값에 제목도 추가하기 ->
  const fecthActives = async () => {
    try {
      const res = await axios.post(`${urlInfo}/activityLog/manager/detail`, {
        relationId: relationId,
        activityLogId: activityId,
      });
      console.log(res.data, "활동일지 상세보기");
      setActiveLog(res.data);
      dispatch(adminAddFriend(true));
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
      console.log(res.data, "활동일지 승인완료");
      fecthActives();
      setIsApproveSuccessModalOpen(true); // 승인 완료 모달을 표시합니다.
      setTimeout(closeApproveSuccessModal, 1000); // 0.5초 후에 승인 완료 모달을 닫습니다.
    } catch (err) {
      console.error("err ActiveRight activity 승인", err);
    }
  };

  const onClick = (centerId, relationId, activityId) => {
    fetchApporve(centerId, relationId, activityId);
    closeModal();
  };

  useEffect(() => {
    fecthActives();
  }, [activityId]);

  // 승인완료된 리스트가 없는 상태는 일단 보류..
  return (filteredListLen == 0 && !isApproval) ||
    (filteredApproveListLen == 0 && isApproval) ? (
    <RightContainer>활동일지가 없습니다</RightContainer>
  ) : (
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
      <ActiveContent>{activeLog.content}</ActiveContent>
      {activeLog.approveStatus ? null : (
        <ApproveButton onClick={openModal}>승인하기</ApproveButton>
      )}
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
      <Modal
        isOpen={isApproveSuccessModalOpen}
        onRequestClose={closeApproveSuccessModal}
        contentLabel="승인 완료"
      >
        <ModalContainer>
          <div>활동일지가 승인되었습니다!</div>
        </ModalContainer>
      </Modal>
    </RightContainer>
  );
};

export default ActiveRight;
