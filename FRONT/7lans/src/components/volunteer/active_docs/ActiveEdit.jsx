import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {useNavigate, useLocation} from 'react-router-dom'
import axios from "axios";
import { useSelector } from "react-redux";
import "regenerator-runtime"
import speech, { useSpeechRecognition } from "react-speech-recognition";
import getEnv from "../../../utils/getEnv"

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
  : translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  border: solid;
`;

const ButtonStyle = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 15px;
  padding: 10px;
  font-size: 20px;
  color: black;
  cursor: pointer;
  margin-top: 5px;
  margin-left: 5px;
`;

const ModalButton = styled.button`
  background-color: #FFD703;
  border: none;
  border-radius: 50px;
  padding: 10px;
  font-size: 20px;
  color: black;
  cursor: pointer;
  margin-top: 5px;
  margin-left: 5px;
  box-shadow: -4.148px -5.185px 1.763px 0px rgba(68, 58, 47, 0.25) inset;
`;

const ButtonWithMargin = styled(ButtonStyle)`
  margin-right: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CloseButton = styled.img`
  position: relative;
  width: 50px;
  height: 50px;
  margin-left: 78%;
  margin-top: 10px;
  cursor: pointer;
`;

const InputRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  justify-content: space-evenly;
`;

const TextArea = styled.textarea`
  width: 95%;
  height: 45%;
  background-color: #FFEDAA;
  border: none;
  outline: none;
  resize: none;
`;

const ButtonContainer = styled.div`
  /* margin-top: 2%; */
  margin-left: 50%;
  display: flex;
  justify-content: flex-end;
  /* gap: 1px; */
  margin-bottom: 2%;
`;

const BasicText = styled.input.attrs({ readOnly: true })`
  background-color: #FFEDAA;
  border: none;
  outline: none;
  text-align:center;
  width: 30%;
  font-weight: bold;
`

const ButtonImg = styled.img`
  width : 30px;
  padding-right: 5px;

`

const ActiveEdit = ({activityLog, content, setContent, activityTime}) => {
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [isModalOpenSpeak, setIsModalOpenSpeak] = useState(false);
    const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
    const [isRecordStart, setIsRecordStart] = useState(false)
    
    const childInfo = useSelector((state) => state.child.value)
    const urlInfo = getEnv('API_URL');
    const userInfo = useSelector((state) => state.user.value)

    
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
      activityLogId: activityLog.activityLogId,
      content: content
    })

    //수정 후 modal 띄우기
    setIsChangeModalOpen(true)

  }

  //제출하기
  const submit = () => {
    axios.put(`${urlInfo}/activityLog/volunteer/writeDone`, {
      volunteerId: userInfo.memberId,
      relationId: childInfo.relationId,
      activityLogId: activityLog.activityLogId,
      content: content
    })

    navigate(-1)
  }

  //녹음 받아쓰기 함수
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

  const navigate = useNavigate()

  return (
    <Container>
      <CloseButton src="../../close_button.png" 
        onClick={() => {navigate(-1)}}
        />
      <h3>{childInfo.childName} 학생과의 활동일지</h3>
      <br></br>
      <div style={{width: "95%"}}>

      <InputRow>
          <h4 style={{display: 'inline'}}>활동일자: </h4>
          <BasicText
            type="date" value={activityLog.dateInfo } />
          <h4 style={{display: 'inline'}}>활동시간: </h4>
          <BasicText type="text" 
                          value={activityTime} />
      </InputRow>

      <InputRow>
        <h4 style={{display: 'inline'}}>활동기관: </h4>
        <BasicText type="text" value={activityLog.centerName}/>
        <h4 style={{display: 'inline'}}>봉사자 성명: </h4>
        <BasicText type="text" value={activityLog.volunteerName}/>
      </InputRow>

      </div>

      <h4>
        활동 내용 및 의견
      </h4>
      <TextArea 
        value={content} 
        onChange={onChange}
        readOnly={activityLog.writeDoneStatus} />
      {!activityLog.writeDoneStatus &&  (
      <ButtonContainer>
        <ButtonWithMargin onClick={handleSpeek}>
          <ButtonImg
            src="public\activity_log\mic.png"
          />
           말하기
        </ButtonWithMargin> 

          <ButtonWithMargin onClick={changeContent}>
          <ButtonImg
            src="public\activity_log\modify.png"
          /> 
          수정하기</ButtonWithMargin>
        <ButtonStyle onClick={handleSubmission}>
        <ButtonImg
            src="public\activity_log\submit.png"
          /> 
          제출하기</ButtonStyle>
      </ButtonContainer>
      )}

      {/* 버튼에 대한 모달창들 */}
      <ModalOverlaySpeek open={isModalOpenSpeak} >
        <ModalContent>
          <p>활동 내용 및 의견을 말씀하시면 자동으로 작성됩니다.</p>
          <ModalButton onClick={closeModalSpeek}>취소하기</ModalButton>
          <ModalButton onClick={recordStart}>녹음하기</ModalButton>
          <ModalButton onClick={() => { addRecord(transcript)}}>추가하기</ModalButton>
          {isRecordStart && (
            <>
    
            {listening ? (
              <p>음성을 듣고 있습니다. 종료를 원하시면 녹음을 멈추고 추가하기를 눌러주세요</p>
            ) : (
              <p>녹음 후 저장을 위해서는 수정 혹은 제출을 해주세요</p>
            )}
              <ModalButton onClick={()=>{
                speech.startListening({continuous: true, language: 'ko'});
              }}
              >
                녹음 시작하기</ModalButton>
                <ModalButton onClick={()=>{
                  speech.stopListening();
              }}
              >
                녹음 멈추기</ModalButton>
                {transcript && <div>{transcript}</div>}
            </>
          )}
        </ModalContent>
      </ModalOverlaySpeek>

      <ModalOverlay open={isSubmitModalOpen} onClick={closeModal}>
        <ModalContent>
          <p>더 이상 수정이 불가합니다. 제출하시겠습니까?</p>
          <ModalButton onClick={closeModal}>취소하기</ModalButton>
          <ModalButton onClick={submit}>제출하기</ModalButton>
        </ModalContent>
      </ModalOverlay>

      <ModalOverlay open={isChangeModalOpen} onClick={closeChangeModal}>
        <ModalContent>
          <p>수정이 완료됐습니다. </p>
          <ModalButton onClick={closeChangeModal}>닫기</ModalButton>
        </ModalContent>
      </ModalOverlay>
    </Container>
    )
}

export default ActiveEdit;