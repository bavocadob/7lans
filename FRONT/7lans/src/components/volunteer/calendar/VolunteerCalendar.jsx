import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import ReactModal from 'react-modal';
import styled from 'styled-components';

// import CommonSidePanel from '../../components/side_panels/CommonSidePanel';
import NormalNav from '../../navs/NormalNav';
import PostIt from '../../volunteer/post_it/PostIt';
import SelectedPostit from '../../volunteer/post_it/SelectedPostit';
import Modal from 'react-modal';
import { current } from '@reduxjs/toolkit';

ReactModal.setAppElement('#root');


const RenderHeader = ({ currentMonth, prevMonth, nextMonth, child }) => {
    return (
        <div className="header row">
            <div className="col col-start">
                <span className="text">
                    <span className="text month">
                        {format(currentMonth, 'M')}월
                    </span>
                    {format(currentMonth, 'yyyy')}
                </span>
                <span>
                    {child.childName}과의 일정
                </span>
            </div>
            <div className="col col-end">
                <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
            </div>
        </div>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>,
        );
    }

    return <div className="days row">{days}</div>;
};

const GetMeeting = (meetings, cloneDay, currentMonth) => {

    let meeting = '';

    meetings.forEach(m => {
        if(cloneDay.getDate() == m.day){
            meeting = m;
        }
    })

    return meeting;
    
}


const RenderCells = ({ currentMonth, selectedDate, onDateClick, meetings}) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
          const cloneDay = addDays(day, 1);
          formattedDate = format(cloneDay, 'd');
          //해당 날짜에 미팅이 있으면 담기
          const meeting = GetMeeting(meetings, cloneDay);
            
          days.push(
              <div
                  className={`col cell ${
                      !isSameMonth(cloneDay, monthStart)
                          ? 'disabled'
                          : isSameDay(cloneDay, selectedDate)
                          ? 'selected'
                          : format(currentMonth, 'M') !== format(cloneDay, 'M')
                          ? 'not-valid'
                          : 'valid'
                  }`}
                  key={cloneDay}
                  onClick={() => onDateClick(cloneDay, meeting)}
              >
                  <span
                      className={
                          format(currentMonth, 'M') !== format(cloneDay, 'M')
                              ? 'text not-valid'
                              : ''
                      }
                  >
                      {formattedDate}
                  </span>
                  <Meeting 
                    meeting = {meeting}
                    currentMonth = {currentMonth}
                    cloneDay = {cloneDay}
                  />
              </div>,
          );


          day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>,
        );
        days = [];
    }
    return <div className="body">{rows}</div>;
};

const Meeting = ({meeting, currentMonth, cloneDay}) => {
    //console.log(meeting);
    //console.log(currentMonth.getMonth());
    //console.log(cloneDay);
    if(currentMonth.getMonth() == cloneDay.getMonth()){
        return (
            <div>
                {meeting.day}
            </div>
        );
    }
}



const MeetingModal = ({setModalOpen, isModalOpen, selectedDate}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [meetingCreate, setMeetingCreate] = useState(false);
    const childInfo = useSelector((state) => state.child.value);

   //미팅 생성하기
   const saveMeeting = (selectedTimes,setMeetingCreate, meetingCreate, selectedDate) =>{
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
            if(selectedDate.getMonth() < 10){
                day += "0";
            }
            day += String(selectedDate.getMonth()) + "-"
            //일
            if(selectedDate.getDay() < 10){
                day += "0";
            }
            day += String(selectedDate.getDay()) + "T";

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
                    </div>
                    <div>

                        <div>
                            현재 일시: {currentDate.getFullYear()}년 {currentDate.getMonth()}월 {currentDate.getDay()}일
                        </div>
                        <div>
                            선택 일시: {selectedDate.getFullYear()}년 {selectedDate.getMonth()}월 {selectedDate.getDay()}일
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

const TimeModal = ({
    backdrop_path,
    title,
    overview,
    name,
    release_date,
    first_air_date,
    vote_average,
    setModalOpen,
}) => {
    return (
        <div>kk</div>
        // <div className='presentation' role="presentation">
        //     <div className='wrapper-modal'>
        //         <div className='modal'>
        //             <span
        //                 onClick={() => setModalOpen(false)}
        //                 className="modal-close">
        //                     X
        //             </span>
        //             <img 
        //                 className='modal_time-img'
        //                 src={''}
        //                 alt="modal_time_img"
        //                 />
        //             <div className='modal_content'>
        //                 <p className='modal_details'>
        //                     <span className='modal_user_perc'></span>
        //                     {" "} {release_date ? release_date : first_air_date}
        //                 </p>
        //                 <h2 className='modal_title'> title </h2>
        //                 <p className='modal_overview'> content</p>
        //                 <p className='modal_overview'> overview </p>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

const VolunteerCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalOpen, setModalOpen] = useState(false); // 모달창을 제어하는 state
    const [meetings, setMeetings] = useState([]);
    const [relationId, setRelation] = useState(1);


    const navigate = useNavigate();
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const childInfo = useSelector((state) => state.child.value)

    //해당 아동의 미팅 정보 불러오기
    useEffect(() => {
        //console.log("change")

        setRelation(childInfo.relationId);

        axios.post('https://i10e103.p.ssafy.io/api/v1/meetingSchedue',{
        relationId: childInfo.relationId,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth()+1
        })
        .then((res) => {
            setMeetings(res.data);
        })
        .catch((err) => {
        });
    }, [childInfo])


    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day, meeting) => {
      //console.log(dayOfMonth)
      //console.log(day,'day')
      // 오늘 날짜 이전은 사진고를 수 있는 페이지로 이동하게 됨
      if (day.getDate() <= dayOfMonth) { // day가 유효한지 확인
        setSelectedDate(day);
        navigate('/volunteer_ChoosePicturePage',{
            state: {
                //날짜가 아닌 meetingId로 사진 불러오기
                // year : `${day.getFullYear()}`,
                // month: `${day.getMonth()+1}`,
                // day: `${day.getDate()}`,
                meetingId: `${meeting.meetingId}`
            }
        }); 
      }
      else {
        // 오늘날짜 이후로는 화상채팅약속시간 잡을 수 있는 모달 창이 떠야 함
        setModalOpen(true)
        console.log('isModalOpen', isModalOpen);
      }
    };

      const closeModal = () => {
        // 모달을 닫을 때 호출되는 함수
        setModalOpen(false);
      };
    
    //   return (
    //     <div className="Calendar">
    //       {/* RenderHeader, RenderDays, RenderCells 등 기존의 컴포넌트들 */}
    //       {/* ... */}
    
    //       {/* 모달 창 */}
    //       {isModalOpen && (
    //         <div className="modal">
    //           <div className="modal-content">
    //             {/* 모달 내용 */}
    //             <p>화상채팅 약속시간을 잡을 수 있는 모달입니다.</p>
    //             {/* 모달 닫기 버튼 */}
    //             <button onClick={closeModal}>모달 닫기</button>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   );
    // };
    
    // export default VolunteerCalendar;
    
    return (
       
            <div className="calendar">
                <RenderHeader
                    currentMonth={currentMonth}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                    child={childInfo}
                />
                <RenderDays />
                <RenderCells
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={onDateClick}
                    meetings = {meetings}
                />
                {isModalOpen && (< MeetingModal 
                    setModalOpen={setModalOpen}
                    isModalOpen={isModalOpen}
                    selectedDate={selectedDate}
                />)}
            </div>
      
    );
};

export default VolunteerCalendar;

