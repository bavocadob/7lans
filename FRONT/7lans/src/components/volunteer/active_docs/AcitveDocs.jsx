import React, { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? "block" : "none")};
`;

const ModalOverlaySpeek = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? "block" : "none")};
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const CuteButton = styled.button`
  background-color: #ff8c94;
  border: none;
  border-radius: 15px;
  padding: 10px;
  font-size: 14px;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 5px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: relative;
  margin-left: 78%;
  margin-top: 10px;
  background-color: #ff8c94;
  border: none;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 16px;
  color: white;
  cursor: pointer;
`;

const InputRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  width: 60%;
`;

const TextArea = styled.textarea`
  width: 80%;
  height: 300px;
`;

const ButtonContainer = styled.div`
  margin-top: 2%;
  margin-left: 57%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const CuteButtonWithMargin = styled(CuteButton)`
  margin-right: 10px;
`;

export default function ActiveDocs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenSpeek, setIsModalOpenSpeek] = useState(false);

  const handleSpeek = () => {
    setIsModalOpenSpeek(true);
  };

  const closeModalSpeek = () => {
    setIsModalOpenSpeek(false);
  };

  const handleSubmission = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <CloseButton>X</CloseButton>
      <h3>학생이름과의 활동일지</h3>
      <br></br>
      <InputRow>
        <div>
          활동일자: <input type="date" />
        </div>
        <div>
          활동시간: <input type="time" />
        </div>
      </InputRow>
      <InputRow>
        <div>
          활동기관: <input type="text" />
        </div>
        <div>
          봉사자 성명: <input type="text" />
        </div>
      </InputRow>
      <TextArea placeholder="활동내용 및 의견을 작성해주세요" />
      <ButtonContainer>
        <CuteButtonWithMargin onClick={handleSpeek}>
          말하기
        </CuteButtonWithMargin>
        <CuteButtonWithMargin>수정하기</CuteButtonWithMargin>
        <CuteButton onClick={handleSubmission}>제출하기</CuteButton>
      </ButtonContainer>

      {/* 버튼에 대한 모달창들 */}
      <ModalOverlaySpeek open={isModalOpenSpeek} onClick={closeModalSpeek}>
        <ModalContent>
          <p>활동 내용 및 의견을 말씀하시면 자동으로 작성됩니다.</p>
          <CuteButton onClick={closeModalSpeek}>취소하기</CuteButton>
          <CuteButton>녹음하기</CuteButton>
        </ModalContent>
      </ModalOverlaySpeek>

      <ModalOverlay open={isModalOpen} onClick={closeModal}>
        <ModalContent>
          <p>더 이상 수정이 불가합니다. 제출하시겠습니까?</p>
          <CuteButton onClick={closeModal}>취소하기</CuteButton>
          <CuteButton>제출하기</CuteButton>
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
}
