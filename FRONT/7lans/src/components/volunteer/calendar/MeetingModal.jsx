import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import ReactModal from 'react-modal';
import getEnv from "../../../utils/getEnv";
import styled from "styled-components";
import { borderRadius, shadows } from '@mui/system';
import { inline } from '@floating-ui/core';

ReactModal.setAppElement('#root');

const ModalOverlay = styled.div`
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
  background-color: #ffd703;
  border: none;
  border-radius: 15px;
  padding: 10px;
  font-size: 14px;
  color: black;
  cursor: pointer;
  margin-top: 5px;
  margin-left: 5px;
`;

const ClockText = styled.div`
  display: flex;
  justify-content: space-between;

`

const resetSelect = (setSelectedTimes) => {
  setSelectedTimes([]);
}

const TimeSelect = ({selectedTimes, setSelectedTimes}) => {
  // const [selectedTimes, setSelectedTimes] = useState([]);
  
  const handleTimeClick = (time) => {
    const isSelected = selectedTimes.includes(time);
  
    if (isSelected) {
      // 이미 선택된 시간이면 해제
      setSelectedTimes((prevSelectedTimes) =>
        prevSelectedTimes.filter((selectedTime) => selectedTime !== time
        ));
    } else {
      // 선택되지 않은 시간이면 추가
      setSelectedTimes((prevSelectedTimes) => [...prevSelectedTimes, time]);
    }};
  
    const rows = [];

    //맨 처음 숫자 출력
    const morningHourBlocks = [];
    morningHourBlocks.push(
      <span>오전</span>
    )
    for(let hour = 1; hour <= 12; hour += 1){

      morningHourBlocks.push(
        <span>{hour}시</span>
      )
    }

    rows.push(
      <ClockText>
        {morningHourBlocks}
      </ClockText>
    )
  
    //시간 선택 block
    for (let hour = 0; hour <= 13; hour += 12) {
      const timeBlocks = [];
  
      for (let halfHour = 0; halfHour < 24; halfHour++) {
        const time = hour + halfHour * 0.5;
  
        const blockStyle = {
          border: '1px solid black',
          padding: '20px',
          position: 'relative',
          cursor: 'pointer',
          backgroundColor: selectedTimes.includes(time) ? '#F8B407' : 'transparent',
          color: selectedTimes.includes(time) ? '#fff' : '#000',
        };
  
        timeBlocks.push(
          <div
            className="col"
            key={time}
            style={blockStyle}
            onClick={() => handleTimeClick(time)}
          >
            {/* {time % 1 === 0 && (
              <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)' }}>
                {time}시
              </div>
            )} */}
          </div>
        );
      }
  
      rows.push(
        <div className="row" key={hour}>
          {timeBlocks}
        </div>
      );
    }

    //오후 숫자 입력
    const afternoonHourBlocks = [];
    afternoonHourBlocks.push(
          <span>오후</span>
    )
    for(let hour = 1; hour <= 12; hour += 1){
    
      afternoonHourBlocks.push(
        <span>{hour}시</span>
      )
    }
    
    rows.push(
      <ClockText>
        {afternoonHourBlocks}
      </ClockText>
    )
    return <div className="body">{rows}</div>;
};

const calTime = (time) => {
    //console.log("time" + time)
  let returnTime = "";

  //시간
  if(time%1 == 0.5){
    //시
    if(time < 10){
      returnTime += "0"
    }
    
    returnTime += String(time-0.5) + ":";
    
    //분, 초
    returnTime += "30" + ":00"
  }
  else{
    if(time < 10){
      returnTime += "0"
    }
    returnTime += String(time) + ":";
    returnTime += "00" + ":00"
  }

  //console.log("returnTime" + returnTime)

  return returnTime;
}

const MeetingModal = ({setModalOpen, isModalOpen, selectedDate}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [isCheckOpen, setIsCheckOpen] = useState(false);
    const [isWarnModal, setIsWarnModal] = useState(false)
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const childInfo = useSelector((state) => state.child.value);
    const urlInfo = getEnv('API_URL');

   //미팅 생성하기
    const saveMeeting = (selectedTimes) =>{       
      //날짜 형식에 맞게 변경
      //%1해서 0.5나오면 30분을 추가

      //날짜
      //년
      let day = String(selectedDate.getFullYear()) + "-"
      //월                
      if(selectedDate.getMonth() < 9){
        day += "0";
      }

      day += String(selectedDate.getMonth()+1) + "-"
      //일
      if(selectedDate.getDate() < 10){
        day += "0";
      }

      day += String(selectedDate.getDate()) + "T";

      //14 -> 14:00:00형식으로 변환
      const startTime = calTime(selectedTimes[0]);
      const endTime = calTime(selectedTimes[selectedTimes.length-1] + 0.5);

      const createStart = day+startTime
      const createEnd = day + endTime

      //해당 월의 미팅 목록 불러오기
      axios.post(`${urlInfo}/meetingSchedue/create`,{
        relationId: childInfo.relationId,
        ScheduledStartTime: createStart,
        ScheduledEndTime: createEnd
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
      });

      //창 닫기
      setModalOpen(false)
    }

    //미팅 생성 확인(연속된 시간인지 확인 후 시간 출력)
    const checkMeeting = (selectedTimes, setMeetingCreate) => {
      //시간 순으로 배열
      selectedTimes = selectedTimes.sort((a, b) => a - b);

      //시간이 1개 이상 일 때만 
      if(selectedTimes.length >= 1){
        //연속된 시간인지 확인
        for(let i = 1; i < selectedTimes.length; i++){
          if(selectedTimes[i] !== selectedTimes[i-1] +0.5){
            //연속된 시간이 아니면 그냥 돌아가기 
            setIsWarnModal(true)
            return false;
          }
        }    
      
        //날짜 형식에 맞게 변경
        //%1해서 0.5나오면 30분을 추가

        //날짜
        //년
        let day = String(selectedDate.getFullYear()) + "년"
        day += String(selectedDate.getMonth()+1) + "월"
        day += String(selectedDate.getDate()) + "일 ";

        //14 -> 14:00:00형식으로 변환
        const startTime = calTime(selectedTimes[0]);
        const endTime = calTime(selectedTimes[selectedTimes.length-1] + 0.5);

        setStart(day + startTime)
        setEnd(day + endTime)

        setIsCheckOpen(true)
      }
      
    }
    const closeModal = () => {
      setIsCheckOpen(false);
    }

    const closeWarnModal = () => {
      setIsWarnModal(false);
    }
    
    return (
      <ReactModal isOpen={isModalOpen} 
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.73)'
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '90%',
            height: '70%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid #ccc',
            background: 'rgba(122, 80, 0, 0.73)',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '10px',
            outline: 'none',
            padding: '20px'
          }
        }}
      >
      
      <div>       
        <div>
          <div>
            <h3 style={{color: 'white'}}>시간 선택</h3>
            
            <CuteButton 
              onClick={() => setModalOpen(false)}
            >
            닫기
            </CuteButton>
            
            <span>
              <CuteButton
                onClick={() => resetSelect(setSelectedTimes)}
              >
              다시 선택
              </CuteButton>
            </span>
          </div>
          <div>

            <div style={{
                color: 'white',
                paddingTop: '1%',
                paddingLeft: '1%',
                fontWeight: 'bold'
            }}>
              현재 일시: {currentDate.getFullYear()}년 {currentDate.getMonth()+1}월 {currentDate.getDate()}일
            </div>
            <div style={{
                color: 'white',
                padding: '1%',
                fontWeight: 'bold'
            }}>
              선택 일시: {selectedDate.getFullYear()}년 {selectedDate.getMonth()+1}월 {selectedDate.getDate()}일
            </div>
          </div>
          <div style={{
                background: 'rgba(255, 255, 255, 0.73)',
                padding: '30px',
                borderRadius: '10px'
          }}>
            <TimeSelect 
              selectedTimes={selectedTimes}
              setSelectedTimes={setSelectedTimes}>
            </TimeSelect>
          </div>
        </div>
        <div style={{padding: '1%'}}>
                    
        <CuteButton
          onClick={() => checkMeeting(selectedTimes)}>
              저장하기
        </CuteButton>
                    
        <span style={{color: 'white' , fontWeight: 'bold'}}> 연속된 시간을 선택해 주세요 </span>
                    
      </div>
      </div>

      {/* 저장 확인 모달 */}
      <ModalOverlay open={isCheckOpen}>
        <ModalContent>
          <div>시작 시간 : {start}</div>
          <div>종료 시간 : {end}</div>
          <p>예약 하시겠습니까?</p>
                
          <CuteButton onClick={closeModal}>취소하기</CuteButton>
          <CuteButton onClick={() => saveMeeting(selectedTimes) }>예약하기</CuteButton>
        </ModalContent>
      </ModalOverlay>

      {/* 연속 시간이 아닐 때 보여주는 모달 */}
        <ModalOverlay open={isWarnModal}>
          <ModalContent>
            <p>연속된 시간을 골라주세요</p>  
            <CuteButton onClick={closeWarnModal}>취소하기</CuteButton>
          </ModalContent>
        </ModalOverlay>
 
    </ReactModal>
    )
}

export default MeetingModal;