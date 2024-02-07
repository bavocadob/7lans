import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import ReactModal from 'react-modal';
import MeetingModal from './MeetingModal';
import styled from 'styled-components';

// import CommonSidePanel from '../../components/side_panels/CommonSidePanel';
import NormalNav from '../../navs/NormalNav';
import PostIt from '../post_it/PostIt';
import SelectedPostit from '../post_it/SelectedPostit';
import Modal from 'react-modal';
import { current } from '@reduxjs/toolkit';
import getEnv from "../../../utils/getEnv";

ReactModal.setAppElement('#root');


const RenderHeader = ({ currentMonth, prevMonth, nextMonth, volunteer }) => {
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
                    {volunteer.childName}과의 일정
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
    const date = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

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
                {meeting.meetingId}
            </div>
        );
    }
}

const ChildCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [meetings, setMeetings] = useState([]);


    const navigate = useNavigate();
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const volInfo = useSelector((state) => state.vol.value)

    const urlInfo = getEnv('API_URL');

    //해당 아동의 미팅 정보 불러오기
    useEffect(() => {

        axios.post(`${urlInfo}/meetingSchedue`,{
            relationId: volInfo.relationId,
            year: currentDate.getFullYear(),
            month: currentDate.getMonth()+1
        })
        .then((res) => {
            setMeetings(res.data);
        })
        .catch((err) => {
        });
    }, [volInfo])


    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day, meeting) => {
        //console.log(dayOfMonth)
        //console.log(day,'day')

        setSelectedDate(day);

        //지난날 + meeting존재 -> picture
        //지난날 + meeting없음 -> 무응답
        //오늘 + meeting존재 -> 화상 채팅 이동
        //오늘 + meeting없음 -> 무응답
        //이후 + meeting존재-> 무응답
        //이후 + meeting없음 -> 무응답

        const selectDate = day.getDate()
    
        //화상 채팅 입장
        if(meeting && (selectDate == dayOfMonth)){
            console.log("세션입장")
        }
        //사진 기록들 보기
        else if(selectDate < dayOfMonth && meeting){
            navigate('/child_choose_picturePage',{
                state: {
                    //날짜가 아닌 meetingId로 사진 불러오기
                    meetingId: `${meeting.meetingId}`
                }
            }); 
        }
    };
    
    
    return (
       
            <div className="calendar">
                <RenderHeader
                    currentMonth={currentMonth}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                    volunteer={volInfo}
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

export default ChildCalendar;

