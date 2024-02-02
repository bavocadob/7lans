import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
// import CommonSidePanel from '../../components/side_panels/CommonSidePanel';
import NormalNav from '../../navs/NormalNav';
import PostIt from '../../volunteer/post_it/PostIt';
import SelectedPostit from '../../volunteer/post_it/SelectedPostit';
import Modal from 'react-modal';
import { current } from '@reduxjs/toolkit';

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="header row">
            <div className="col col-start">
                <span className="text">
                    <span className="text month">
                        {format(currentMonth, 'M')}월
                    </span>
                    {format(currentMonth, 'yyyy')}
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
          //console.log("in RenderCells")
          //console.log(currentMonth);
            
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
        <div className='presentation' role="presentation">
            <div className='wrapper-modal'>
                <div className='modal'>
                    <span
                        onclick={() => setModalOpen(false)}
                        classsName="modal-close">
                            X
                    </span>
                    <img 
                        className='modal_time-img'
                        src={''}
                        alt="modal_time_img"
                        />
                    <div className='modal_content'>
                        <p className='modal_details'>
                            <span className='modal_user_perc'></span>
                            {" "} {release_date ? release_date : first_air_date}
                        </p>
                        <h2 className='modal_title'> title </h2>
                        <p className='modal_overview'> content</p>
                        <p className='modal_overview'> overview </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const VolunteerCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalOpen, setModalOpen] = useState(false); // 모달창을 제어하는 state
    const [meetings, setMeetings] = useState([]);
    const navigate = useNavigate();
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();

    //이번 달 미팅 정보들
    useEffect(() => {axios.post('http://localhost:8080/meetingSchedue',{
        relationId: 1,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth()+1
    })
    .then((res) => {
        setMeetings(res.data);
    })
    .catch((err) => {
    });
}, []);

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
                />
                <RenderDays />
                <RenderCells
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={onDateClick}
                    meetings = {meetings}
                />
            </div>
      
    );
};

export default VolunteerCalendar;

