import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

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
          prevSelectedTimes.filter((selectedTime) => selectedTime !== time)
        );
      } else {
        // 선택되지 않은 시간이면 추가
        setSelectedTimes((prevSelectedTimes) => [...prevSelectedTimes, time]);
      }
    };
  
    const rows = [];
  
    for (let hour = 0; hour <= 13; hour += 12) {
      const timeBlocks = [];
  
      for (let halfHour = 0; halfHour < 24; halfHour++) {
        const time = hour + halfHour * 0.5;
  
        const blockStyle = {
          border: '1px solid black',
          padding: '20px',
          position: 'relative',
          cursor: 'pointer',
          backgroundColor: selectedTimes.includes(time) ? '#3498db' : 'transparent',
          color: selectedTimes.includes(time) ? '#fff' : '#000',
        };
  
        timeBlocks.push(
          <div
            className="col"
            key={time}
            style={blockStyle}
            onClick={() => handleTimeClick(time)}
          >
            {time % 1 === 0 && (
              <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)' }}>
                {time}시
              </div>
            )}
          </div>
        );
      }
  
      rows.push(
        <div className="row" key={hour}>
          {timeBlocks}
        </div>
      );
    }
  
    return <div className="body">{rows}</div>;
};

const MeetingModal = ({setModalOpen, isModalOpen, selectedDate}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [meetingCreate, setMeetingCreate] = useState(false);
    const childInfo = useSelector((state) => state.child.value);

   //미팅 생성하기
   const saveMeeting = (selectedTimes,setMeetingCreate, meetingCreate) =>{
        //시간 순으로 배열
        selectedTimes = selectedTimes.sort((a, b) => a - b);
    
        //시간이 1개 이상 일 때만 
        if(selectedTimes.length >= 1){
            //연속된 시간인지 확인
            for(let i = 1; i < selectedTimes.length; i++){
                if(selectedTimes[i] !== selectedTimes[i-1] +0.5){
                     //연속된 시간이 아니면 그냥 돌아가기 
                    return false;
                }
            } 
    
            //연속된시간이면
            setMeetingCreate(true);
            
        
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

            const firstTime = selectedTimes[0];
            let startTime = "";

            //시간
            if(firstTime%1 == 0.5){
                //console.log(selectedTimes[0])
                //시
                if(firstTime < 10){
                    startTime += "0"
                }
                startTime += String(firstTime-0.5) + ":";

                //분, 초
                startTime += "30" + ":00"
            }
            else{
                if(firstTime < 10){
                    startTime += "0"
                }
                startTime += String(firstTime) + ":";
                startTime += "00" + ":00"
            }

            const lastTime = selectedTimes[selectedTimes.length-1] + 0.5;
            let endTime = "";

            //시간
            if(lastTime%1 == 0.5){
                //시
                if(lastTime < 10){
                    endTime += "0"
                }
                endTime += String(lastTime-0.5) + ":";

                //분, 초
                endTime += "30" + ":00"
            }
            else{
                if(lastTime < 10){
                    endTime += "0"
                }
                endTime += String(lastTime) + ":";
                endTime += "00" + ":00"
            }

            const start = day + startTime
            const end = day + endTime

            axios.post('https://i10e103.p.ssafy.io/api/v1/meetingSchedue/create',{
                relationId: childInfo.relationId,
                ScheduledStartTime: start,
                ScheduledEndTime: end
                })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                });

            //창 닫기
            setModalOpen(false)
        }

   }
    return (
        <ReactModal isOpen={isModalOpen}>
            <div>       
                <div>
                    <div>
                        <span>시간 선택</span>
                        <button
                            onClick={() => setModalOpen(false)}
                            >
                            닫기
                        </button>
                        <button
                            onClick={() => resetSelect(setSelectedTimes)}
                            >
                            다시 선택
                        </button>
                    </div>
                    <div>

                        <div>
                            현재 일시: {currentDate.getFullYear()}년 {currentDate.getMonth()+1}월 {currentDate.getDate()}일
                        </div>
                        <div>
                            선택 일시: {selectedDate.getFullYear()}년 {selectedDate.getMonth()+1}월 {selectedDate.getDate()}일
                        </div>
                    </div>
                    <TimeSelect 
                    selectedTimes={selectedTimes}
                    setSelectedTimes={setSelectedTimes}>
                    </TimeSelect>
                </div>
                <div>
                    
                    <button
                        onClick={()=> saveMeeting(selectedTimes,setMeetingCreate, meetingCreate, selectedDate)}>
                        저장하기
                    </button>
                    {!meetingCreate && (
                        <span> 연속된 시간을 선택해 주세요 </span>
                    )}
                </div>
            </div>
        </ReactModal>
    )
}

export default MeetingModal;