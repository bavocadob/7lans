import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import styled, {keyframes} from "styled-components";
import Modal from 'react-modal';
import {useNavigate} from "react-router-dom";
import {Session} from "openvidu-browser";
import {postMeetingImage} from "../../api/axioses.jsx";


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
  background-color: rgb(255, 248, 224);
  border: 4px solid rgb(45, 45, 45);
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

const ConfirmModalText = styled.p`
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 20px;
`;

const ConfirmModalButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const ConfirmModalButton = styled.button`
  background: linear-gradient(190deg, rgba(255, 184, 36, 1), rgba(255, 237, 140, 1));
  font-size: 16px;
  font-weight: bold;
  border: 3px solid rgb(45, 45, 45);
  border-radius: 50px;
  padding: 0.5rem;
  height: 40px;
  width: 15%;
  cursor: pointer;
  position: relative;
  margin: 10px;
`;


const ConfirmModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.8);
  border: 3px solid rgb(45, 45, 45);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50%;
`;


// 로딩 스피너 임시
// 키프레임 애니메이션 정의
// 키프레임 애니메이션 정의
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  > div {
    margin: 0 5px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #ffcc00;

    animation: ${bounce} 0.6s infinite;
    animation-delay: calc(0.2s * var(--order));
  }
`;


const VideoChattingExit = ({
                             capturedImages,
                             session
                           }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isComplete, setComplete] = useState(false);

  // TODO 추후 아래와 같은 방식으로 meetingId를 가져오게 수정해야 함
  // const { meetingId } = useParams();


  const navigate = useNavigate();


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

  const imageSelectSignal = (image) => {
    session.signal({
      type: 'imageSelect',
      data: image
    })
      .then(() => console.log('이미지 선택 시그널'))
      .catch(err => console.log(err))
  }

  const receiveSelectImage = ((event) => {
    const image = event.data;
    handleImageClick(image);
  })

  // 모달 닫기 함수
  const closeModal = () => {
    setIsOpen(false);
  }

  // 이하 컨펌 모달 관련
  const handleConfirmButtonClick = () => {
    setConfirmModalIsOpen(true); // 선택완료 버튼 클릭시 모달 열기
  }

  const confirmCheckSignal = () => {
    session.signal({
      type: 'confirmCheck',
    })
      .then(() => console.log('이미지 선택완료 시그널'))
      .catch(err => console.log(err))
  }

  const receiveConfirmCheck = (event) => {
    handleConfirmButtonClick();
  }

  const closeConfirmModal = () => {
    setConfirmModalIsOpen(false); // 선택완료 모달 닫기
  }



  const handleConfirmModalCancel = () => {
    closeConfirmModal(); // 취소 버튼 클릭시 모달 닫기
  }

  const confirmCancelSignal = () => {
    session.signal({
      type: 'confirmCancel',
    })
      .then(() => console.log('이미지 선택취소 시그널'))
      .catch(err => console.log(err))
  }

  const receiveConfirmCancel = (event) => {
    handleConfirmModalCancel();
  }

  const imageUploadSignal = (uploadStatus) => {
    session.signal({
      type: 'imageUpload',
      data: uploadStatus
    })
      .then(() => console.log('이미지 선택취소 시그널'))
      .catch(err => console.log(err))
  }


  const receiveImageUpload = (event) => {
    const status = event.data

    if (status) {
      // setLoading 호출로 로딩 모달 활성화
      setLoading(true);
    } else {
      // 이미지 저장 완료 후, setLoading과 setComplete 호출로 상태 업데이트
      setLoading(false);
      setComplete(true);

      // 모든 프로세스 완료 후 일정 시간(여기서는 3초)이 지나면 모든 상태 초기화
      setTimeout(() => {
        setConfirmModalIsOpen(false);
        setComplete(false);
        // TODO 메인 페이지로 보내니까 로그인 창으로 가는데 이거 나중에 수정하자
        navigate('/');
      }, 3000);
    }
  }


  const handleConfirmModalConfirm = () => {
    // const meetingId = props.meetingId; // props로부터 meetingId 받아오기
    // 임시로 meetingId는 1번으로 설정
    const meetingId = 1;
    imageUploadSignal(true)

    setTimeout(async () => {
      // 미팅 이미지를 비동기로 모두 넣어준다.
      try {
        await Promise.all(selectedImages.map((imagePath) => postMeetingImage(meetingId, imagePath)));
        imageUploadSignal(false)
      } catch (err) {
        // 이곳에서 에러 처리를 수행합니다.
        console.error(err);
      }
    }, 1000); // 1초 대기 후 실행

  };



  useEffect(() => {
    session.on('signal:imageSelect', receiveSelectImage);
    session.on('signal:confirmCheck', receiveConfirmCheck);
    session.on('signal:confirmCancel', receiveConfirmCancel);
    session.on('signal:imageUpload', receiveImageUpload);

    return () => {
      session.off('signal:imageSelect', receiveSelectImage);
      session.off('signal:confirmCheck', receiveConfirmCheck);
      session.off('signal:confirmCancel', receiveConfirmCancel);
      session.off('signal:imageUpload', receiveImageUpload);
    };
  }, [session]);


  return (
    <MainContainer>
      <HeaderText>마음에 드는 사진을 골라주세요!</HeaderText>

      <ImagesContainer>
        {capturedImages.map((image, i) => (
          <SelectableImage
            key={i}
            src={image}
            isSelected={selectedImages.includes(image)}
            onClick={() => imageSelectSignal(image)}
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

      <ConfirmButton
        onClick={confirmCheckSignal}>
        선택 완료
      </ConfirmButton>

      <ConfirmModal
        isOpen={confirmModalIsOpen && !isLoading && !isComplete}
        onRequestClose={closeConfirmModal}
        style={modalStyles}
        contentLabel="Confirm Selected Images"
      >
        <ConfirmModalText>선택된 사진을 저장하시겠어요?</ConfirmModalText>
        <ConfirmModalButtonsContainer>
          <ConfirmModalButton onClick={handleConfirmModalConfirm}>선택 완료</ConfirmModalButton>
          <ConfirmModalButton onClick={confirmCancelSignal}>다시 선택</ConfirmModalButton>
        </ConfirmModalButtonsContainer>
      </ConfirmModal>

      <ConfirmModal
        isOpen={confirmModalIsOpen && isLoading}
        onRequestClose={closeConfirmModal}
        style={modalStyles}
        contentLabel="Images Saving">
        <ConfirmModalText>사진을 저장중이에요</ConfirmModalText>
        <LoadingSpinner style={{marginTop: '30px'}}>
          <div style={{'--order': 0}}/>
          <div style={{'--order': 1}}/>
          <div style={{'--order': 2}}/>
        </LoadingSpinner>
      </ConfirmModal>

      <ConfirmModal
        isOpen={confirmModalIsOpen && isComplete}
        onRequestClose={closeConfirmModal}
        style={modalStyles}
        contentLabel="Images Saved">
        <ConfirmModalText>
          선택한 사진이 모두 저장되었어요.
          <br/>
          잠시 후 세션이 종료됩니다.
        </ConfirmModalText>
      </ConfirmModal>
    </MainContainer>
  );
};


VideoChattingExit.propTypes = {
  capturedImages: PropTypes.arrayOf(PropTypes.string).isRequired,
  session: PropTypes.instanceOf(Session).isRequired // session이 Session의 인스턴스인지 확인
};

export default VideoChattingExit;