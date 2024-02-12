import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from 'react-modal';

// 모달 창의 스타일을 설정합니다.
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
};

Modal.setAppElement('#root') // 외부 환경 공략으로 평소 body 태그 이외에 root 태그 설정이 권장됩니다

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledImage = styled.img`
  width: 30%;
  margin: 10px;
  border: ${(props) => (props.isSelected ? "2px solid blue" : "none")};
  cursor: pointer;
`;

const VideoChattingExit = ({ capturedImages }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (capturedImages.length === 0) {
      setIsOpen(true);
    }
  }, [capturedImages]);

  const handleImageClick = (image) => {
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.includes(image)
        ? prevSelectedImages.filter((img) => img !== image)
        : [...prevSelectedImages, image]
    );
  };

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <Container>
      {capturedImages.map((image, i) => (
        <StyledImage
          key={i}
          src={image}
          isSelected={selectedImages.includes(image)}
          onClick={() => handleImageClick(image)}
          alt={`Captured ${i}`}
        />
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="No Captures Alert"
      >
        <p>캡쳐한 사진이 없어요!</p>
        <button onClick={closeModal}>확인</button>
      </Modal>
    </Container>
  );
};

VideoChattingExit.propTypes = {
  capturedImages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default VideoChattingExit;