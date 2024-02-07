import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {useNavigate, useLocation} from 'react-router-dom'
import axios from "axios";
import SelectedPostit from "../post_it/SelectedPostit";
import PostIt from "../post_it/PostIt";
import { useSelector } from "react-redux";
import "regenerator-runtime"
import speech, { useSpeechRecognition } from "react-speech-recognition";

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
  margin-top: 5px;
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
  height: 200px;
`;

const ButtonContainer = styled.div`
  /* margin-top: 2%; */
  margin-left: 50%;
  display: flex;
  justify-content: flex-end;
  /* gap: 1px; */
  margin-bottom: 2%;
`;

const CuteButtonWithMargin = styled(CuteButton)`
  margin-right: 10px;
`;

export default function ActiveDocs() {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isModalOpenSpeak, setIsModalOpenSpeak] = useState(false);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [isRecordStart, setIsRecordStart] = useState(false)

  const [activityLog, setActivityLog] = useState('')
  const [content, setContent] = useState("")

  const childInfo = useSelector((state) => state.child.value)
  const urlInfo = useSelector((state) => state.url.value)
  const userInfo = useSelector((state) => state.user.value)

  //activity log 전달받은 값
  const location = useLocation();
  const state = {...location.state};

  //console.log(childInfo)
  //활동일지 상세 정보 가져오기
  useEffect(() => {
    axios.post(`${urlInfo}/activityLog/volunteer`, {
      relationId: childInfo.relationId,
      activityLogId: state.activityLogId
    })
    .then((res) => {
      //console.log(res.data)
      setActivityLog(res.data)
      if(res.data.content == null || res.data.content == ""){
        setContent("활동을 입력해 주세요")
      }
      else{
      setContent(res.data.content)
      }
    })
    .catch((err) => {
    });
  }, [])

  //모달 관련 함수
  const handleSpeek = () => {
    setIsModalOpenSpeak(true);
  };

  const closeModalSpeek = () => {
    setIsModalOpenSpeak(false);
  };

  const handleSubmission = () => {
    setIsSubmitModalOpen(true);
  };

  const closeModal = () => {
    setIsSubmitModalOpen(false);
  };

  const closeChangeModal = () =>{
    setIsChangeModalOpen(false);
  }

  //수정하기
  const changeContent = () =>{
    //console.log(content)
    axios.put(`${urlInfo}/activityLog/volunteer/modify`, {
      volunteerId: userInfo.memberId,
      relationId: childInfo.relationId,
      activityLogId: state.activityLogId,
      content: content
    })

    //수정 후 modal 띄우기
    setIsChangeModalOpen(true)
    //console.log(activityLog.writeDoneStatus)

  }

  //제출하기
  const submit = () => {
    axios.put(`${urlInfo}/activityLog/volunteer/writeDone`, {
      volunteerId: userInfo.memberId,
      relationId: childInfo.relationId,
      activityLogId: state.activityLogId,
      content: content
    })

    navigate(-1)
  }

  const {
    listening,
    transcript,
  } = useSpeechRecognition();

  //녹음 시작하기
  const recordStart = () =>{
    setIsRecordStart(true);
  }

  //녹음 음성 추가
  const addRecord = (transcript) =>{
    console.log(content + " " + transcript)
    setContent(content + " " + transcript)
    setIsModalOpenSpeak(false)
  }

  //입력한 content값 바로 받기
  function onChange(e){
    setContent(e.target.value)
  }

  const navigate = useNavigate();
  
  
  return (
    <Container>
      <CloseButton onClick={() => {navigate(-1)}}>X</CloseButton>
      <h3>{childInfo.childName}의 활동일지</h3>
      <br></br>
      <InputRow>

        <div>
          활동일자: <input type="date" value={activityLog.dateInfo} readOnly/>
        </div>
        <div>
          활동시간: <input type="time" readOnly/>
        </div>
      </InputRow>
      <InputRow>
        <div>
          활동기관: <input type="text" value={activityLog.centerName} readOnly/>
        </div>
        <div>
          봉사자 성명: <input type="text" value={activityLog.volunteerName} readOnly/>
        </div>
      </InputRow>
      
      <TextArea 
        value={content} 
        onChange={onChange}
        readOnly={activityLog.writeDoneStatus} />
      {!activityLog.writeDoneStatus &&  (
      <ButtonContainer>
        <CuteButtonWithMargin onClick={handleSpeek}>
          말하기
        </CuteButtonWithMargin>     
          <CuteButtonWithMargin onClick={changeContent}>수정하기</CuteButtonWithMargin>
        <CuteButton onClick={handleSubmission}>제출하기</CuteButton>
      </ButtonContainer>
      )}

      {/* 버튼에 대한 모달창들 */}
      <ModalOverlaySpeek open={isModalOpenSpeak} >
        <ModalContent>
          <p>활동 내용 및 의견을 말씀하시면 자동으로 작성됩니다.</p>
          <CuteButton onClick={closeModalSpeek}>취소하기</CuteButton>
          <CuteButton onClick={recordStart}>녹음하기</CuteButton>
          <CuteButton onClick={() => { addRecord(transcript)}}>추가하기</CuteButton>
          {isRecordStart && (
            <>
    
            {listening ? (
              <p>Go ahead I'm listening</p>
            ) : (
              <p>Click the button and ask me anything</p>
            )}
              <button onClick={()=>{
                speech.startListening({continuous: true, language: 'ko'});
              }}
              >
                ASk me anything</button>
                <button onClick={()=>{
                  speech.stopListening();
              }}
              >
                StopListening</button>
                {transcript && <div>{transcript}</div>}
            </>
          )}
        </ModalContent>
      </ModalOverlaySpeek>

      <ModalOverlay open={isSubmitModalOpen} onClick={closeModal}>
        <ModalContent>
          <p>더 이상 수정이 불가합니다. 제출하시겠습니까?</p>
          <CuteButton onClick={closeModal}>취소하기</CuteButton>
          <CuteButton onClick={submit}>제출하기</CuteButton>
        </ModalContent>
      </ModalOverlay>

      <ModalOverlay open={isChangeModalOpen} onClick={closeChangeModal}>
        <ModalContent>
          <p>수정이 완료됐습니다. </p>
          <CuteButton onClick={closeChangeModal}>닫기</CuteButton>
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
}
