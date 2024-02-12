import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from 'react-modal';

// 모달 창의 스타일 설정
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
};

// 모달 라이브러리의 접근성 요구사항에 따라 root를 설정
Modal.setAppElement('#root')

// 화면의 메인 컨테이너 스타일링
const MainContainer = styled.div`
  background-color: rgb(255,248,224);
  border: 4px solid rgb(45,45,45);
  border-radius: 20px;
  width: 90%;
  height: calc(100vh - 100px - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  margin: 50px auto 0;
`;

// 이미지를 담는 컨테이너 스타일링
const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: auto;
  width: 100%;
  max-height: 500px;
  margin: 20px 0;
`;

// 각 이미지 스타일링
const SelectableImage = styled.img`
  width: 16%;
  margin: 10px;
  border: ${(props) => props.isSelected ? "5px solid rgba(147, 112, 219, 0.8)" : "0px"};
  border-radius: 20px;
  cursor: pointer;
  transition: border 0.1s ease-in-out;
`;

// 상단 텍스트 스타일링
const HeaderText = styled.h3`
  text-align: center;
  margin-bottom: 15px;
  width: 100%;
`;

// 버튼 스타일링
const ConfirmButton = styled.button`
  background: linear-gradient(190deg, rgba(255, 184, 36, 1), rgba(255, 237, 140, 1));
  font-size: 19px;
  font-weight: bold;
  border: 3px solid rgb(45, 45, 45);
  border-radius: 50px;
  padding: 0.5rem;
  height: 50px;
  width: 200px;
  cursor: pointer;
  position: sticky;
  bottom: 0;
  align-self: center;
  margin: 10px 0;
`;

const VideoChattingExit = ({ capturedImages }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (capturedImages.length === 0) {
      setIsOpen(true);
    }
  }, [capturedImages]);

  // 이미지 클릭 핸들러
  const handleImageClick = (image) => {
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.includes(image)
        ? prevSelectedImages.filter((img) => img !== image)
        : [...prevSelectedImages, image]
    );
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsOpen(false);
  }

  // TODO 1. 선택완료하면 확인 모달 나타나게 하기


  // TODO 2. 확인모달에서 최종 확인하면 세션 종료되면서 메인페이지로 이동 및 meeting image들 api로 넣어주기


  return (
    <MainContainer>
      <HeaderText>마음에 드는 사진을 골라주세요!</HeaderText>

      <ImagesContainer>
        {capturedImages.map((image, i) => (
          <SelectableImage
            key={i}
            src={image}
            isSelected={selectedImages.includes(image)}
            onClick={() => handleImageClick(image)}
            alt={`Captured ${i}`}
          />
        ))}
      </ImagesContainer>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="No Captures Alert"
      >
        <p>캡쳐한 사진이 없어요!</p>
        <button onClick={closeModal}>확인</button>
      </Modal>

      <ConfirmButton>선택 완료</ConfirmButton>

    </MainContainer>
  );
};


VideoChattingExit.propTypes = {
  capturedImages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default VideoChattingExit;