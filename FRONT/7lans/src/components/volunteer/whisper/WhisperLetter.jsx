import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";
import { useSelector } from "react-redux";
import getEnv from "../../../utils/getEnv";


const ChatContainer = styled.div`
  background-color: rgb(255, 248, 223);
  padding: 20px;
  border-radius: 10px;
  height: 93%;
  width: 95%;
  overflow-y: auto;
  margin-top: 22px;
  margin-left: 20px;
  `;

const ChatCardChild = styled.div`
  background-color: #a396ea;
  height: 40%;
  width: 440px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 15px;
  cursor: pointer;
  position: relative;
  margin-right: 50px;
`;

const ChatCardVol = styled.div`
  background-color: #a4e399;
  height: 40%;
  width: 440px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 15px;
  cursor: pointer;
  position: relative;
  margin-left: 400px;
  margin-right: 20px;
`;

const CustomModal = styled(Modal)`
  width: 70%;
  margin: 100px auto;
  border-radius: 15px;
  outline: none;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 300px;
`;

const ModalContent = styled.div`
  padding: 30px;
`;

const ModalButton = styled.button`
  padding: 10px;
  cursor: pointer;
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-left: 5px;
`;

const WriteButton = styled.button`
  position: fixed;
  bottom: 8%;
  left: 82%;
  transform: translateX(-50%);
  padding: 10px;
  cursor: pointer;
  background:rgba(255, 237, 140, 1);
  font-weight: bold;
  border: 2px solid rgb(255, 184, 36);
  border-radius: 5px;
`;

// button {
//   background: linear-gradient(
//               300deg,
//               rgba(255, 184, 36, 1),
//               rgba(255, 237, 140, 1));
//   font-size: 19px;
//   font-weight: bold;
//   border: none;
//   border-radius: 50px;
//   margin: 0.5rem;
//   padding: 0.5rem;
//   height: 50px;
//   width: 130px;
//   margin-left: 35%;
//   margin-top: 7%;
//   color: white;
//   text-decoration-line: none;
// };

const WriteModal = styled(Modal)`
  width: 70%;
  max-width: 600px;
  margin: 100px auto;
  border-radius: 15px;
  outline: none;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const WriteModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100%;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const ChatDate = styled.p`
  font-size: 12px;
  color: #777;
  margin-top: 10px;
`;

const WhisperLetter = () => {
  const volInfo = useSelector((state) => state.vol.value);
  const userInfo = useSelector((state) => state.user.value);
  const childInfo = useSelector((state) => state.child.value);
  const childRelationId = childInfo.relationId;
  console.log(childRelationId);
  const writerId = userInfo.memberId;
  const urlInfo = getEnv("API_URL");

  const userName = userInfo.volunteerName;
  const childName = childInfo.childName;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [writeModalIsOpen, setWriteModalIsOpen] = useState(false);
  const [typingMessage, setTypingMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    axios
      .get(`${urlInfo}/whisper/list/${childRelationId}`)
      .then((res) => {
        setChatMessages(res.data);
      })
      .catch((err) => {
        console.log(err, "속닥속닥 리스트 불러오기 에러");
      });
  }, [childRelationId]);

  const openModal = (message) => {
    setSelectedChat(message);
    setModalIsOpen(true);
    setTypingMessage(message.content);
  };

  const openWriteModal = () => {
    setWriteModalIsOpen(true);
  };

  const closeWriteModal = () => {
    setWriteModalIsOpen(false);
    setTypingMessage("");
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setTypingMessage("");
    setSelectedChat(null);
  };

  const handleWriteMessage = () => {
    if (typingMessage.trim() !== "") {
      axios
        .post(`${urlInfo}/whisper`, {
          writerId: writerId,
          relationId: childRelationId,
          content: typingMessage,
        })
        .then((res) => {
          // 속닥속닥 작성 후 갱신하기 위해 다시 불렀는데 더 좋은방법있나요?
          axios
            .get(`${urlInfo}/whisper/list/${childRelationId}`)
            .then((res) => {
              setChatMessages(res.data);
            })
            .catch((err) => {
              console.log(err, "속닥속닥리스트 불러오기 에러");
            });
          closeWriteModal();
        })
        .catch((err) => {
          console.log(err, "WhisperLetter post 에러");
        });
    }
  };

  return (
    <ChatContainer>
      
      {chatMessages.map((message, index) =>
        message.writer === userName ? (
          <ChatCardVol key={index} onClick={() => openModal(message)}>
            {message.content}
            {/* 생성시간 넣기..? */}
          </ChatCardVol>
        ) : (
          <ChatCardChild key={index} onClick={() => openModal(message)}>
            {message.content}
          </ChatCardChild>
        )
      )}

      <WriteButton onClick={openWriteModal}>속닥속닥 적어봐요</WriteButton>
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Chat Detail Modal"
      >
        <ModalContainer>
          <h2>채팅 상세 정보</h2>
          <ChatDate>{new Date().toLocaleString()}</ChatDate>
          {selectedChat && (
            <ModalContent>
              {typingMessage}
              <ModalButtonContainer>
                <ModalButton onClick={closeModal}>확인</ModalButton>
              </ModalButtonContainer>
            </ModalContent>
          )}
        </ModalContainer>
      </CustomModal>
      <WriteModal
        isOpen={writeModalIsOpen}
        onRequestClose={closeWriteModal}
        contentLabel="Write Modal"
      >
        <WriteModalContainer>
          <h2>속닥속닥 보내기</h2>
          <textarea
            rows={5}
            cols={55}
            value={typingMessage}
            onChange={(e) => setTypingMessage(e.target.value)}
          />

          <ModalButtonContainer>
            <ModalButton onClick={handleWriteMessage}>확인</ModalButton>
            <ModalButton onClick={closeWriteModal}>닫기</ModalButton>
          </ModalButtonContainer>
        </WriteModalContainer>
      </WriteModal>

    </ChatContainer>
  );
};

export default WhisperLetter;
