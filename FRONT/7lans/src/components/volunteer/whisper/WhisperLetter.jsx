import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";
import { useSelector } from "react-redux";

const ChatContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  height: 500px;
  width: 90%;
  overflow-y: auto;
  position: relative;
`;

const ChatCardChild = styled.div`
  background-color: #8bf678;
  height: 40%;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 15px;
  cursor: pointer;
  position: relative;
  margin-left: 50px;
`;

const ChatCard2 = styled.div`
  background-color: #9785fd;
  height: 40%;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 15px;
  cursor: pointer;
  position: relative;
  margin-right: 50px;
`;

// 채팅 모달
const CustomModal = styled(Modal)`
  width: 70%;
  max-width: 400px;
  margin: 100px auto;
  border-radius: 15px;
  outline: none;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

// 채팅 상세 정보
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
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  cursor: pointer;
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
`;

const WriteModal = styled(Modal)`
  width: 70%;
  max-width: 600px;
  margin: 100px auto;
  border-radius: 15px;
  outline: none;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

// 속닥속닥 글쓰기 모달
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
  const childInfo = useSelector((state) => state.child.value);
  const userInfo = useSelector((state) => state.user.value);
  const childRelationId = childInfo.relationId;
  const writerId = userInfo.memberId;
  const urlInfo = useSelector((state) => state.url.value);

  // 해당 아동과의 속닥속닥 가져오기
  useEffect(() => {
    axios
      .get(`${urlInfo}/whisper/list/${childRelationId}`)
      .then((res) => {
        console.log(res, "chatdata, 어디보자");
      })
      .catch((err) => {
        console.log(err, "위스퍼레터에서 에러발생");
      });
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [writeModalIsOpen, setWriteModalIsOpen] = useState(false);
  const [typingMessage, setTypingMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      content: "나도 정말 재밌었어 다음시간에는 뭐하면 좋을지 고민해봐!",
      isMyMessage: false,
      timestamp: new Date(),
    },
  ]);

  // 작성된 채팅을 누르면 해당 모달 open~
  const openModal = (message) => {
    setSelectedChat(message);
    setModalIsOpen(true);
    setTypingMessage(message.content);
  };

  // 속닥속닥 글쓰기 모달 열기
  const openWriteModal = () => {
    setWriteModalIsOpen(true);
  };

  // 속닥속닥 글쓰기 모달 닫기
  const closeWriteModal = () => {
    setWriteModalIsOpen(false);
    setTypingMessage("");
  };

  // 작성된 채팅 모달 누르면 닫기
  const closeModal = () => {
    setModalIsOpen(false);
    setTypingMessage("");
    setSelectedChat(null);
  };

  // 속닥속닥 쓰기
  const handleWriteMessage = () => {
    if (typingMessage.trim() !== "") {
      const newMessage = {
        id: chatMessages.length + 1,
        content: typingMessage,
        isMyMessage: true,
        timestamp: new Date(),
      };
      setChatMessages([...chatMessages, newMessage]);
      closeWriteModal();
    }
  };

  // // 글쓰기
  // useEffect(() => {
  //   axios
  //     .post(`${urlInfo}/whisper`, {
  //       writerId: writerId,
  //       relationId: childRelationId,
  //       content: typingMessage,
  //     })
  //     .then((res) => {
  //       console.log(res, "글쓰기 보내기");
  //     })
  //     .catch((err) => {
  //       console.log(err, "WhisperLetter post 에러");
  //     });
  // }, []);

  return (
    <ChatContainer>
      {/*  백에서 값 가져오기 */}
      <ChatCard2>
        선생님 저번 수업 정말 재미있었어! 얼른 또 뵙고 싶어요!!
      </ChatCard2>

      {/* 내가쓴 채팅 */}
      {chatMessages.map((message, index) => (
        // 채팅
        <ChatCardChild key={index} onClick={() => openModal(message)}>
          {message.content}
        </ChatCardChild>
      ))}
      <WriteButton onClick={openWriteModal}>속닥속닥 쓰기</WriteButton>
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
          <h2>속닥속닥 쓰기</h2>
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
