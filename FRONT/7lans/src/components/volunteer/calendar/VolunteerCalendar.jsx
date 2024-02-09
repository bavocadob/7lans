import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { format, addMonths, subMonths } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ReactModal from "react-modal";
import MeetingModal from "./MeetingModal";
import {dateToNumber} from "./DateTranslation";

import styled from "styled-components";
// import CommonSidePanel from '../../components/side_panels/CommonSidePanel';
import NormalNav from '../../navs/NormalNav';
import PostIt from '../../volunteer/post_it/PostIt';
import SelectedPostit from '../../volunteer/post_it/SelectedPostit';
import Modal from 'react-modal';
import { current } from '@reduxjs/toolkit';
import getEnv from "../../../utils/getEnv";


const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="header row" style={{ marginBottom: '10px'}}>
      <div style={{display:'flex', 
                    flexDirection:'row', 
                    justifyContent: 'space-between', 
                    fontSize:'30px',
                    marginBottom: '10px'
                    }}>
        <div>
          <img
            style={{ width: "30px" , transform: "scaleX(-1)"}}
            src="../../next_button.png"
            alt=""
            onClick={prevMonth}
          />
        </div>
        <div>
          <div className="col col-start">
            <span className="text">
              <span className="text month">{format(currentMonth, "M")}월</span>
              {format(currentMonth, "yyyy")}
            </span>
          </div>
        </div>
        <div>
          <img
            style={{ width: "30px" }}
            src="../../next_button.png"
            alt=""
            onClick={nextMonth}
          />
        </div>
      </div>
    </div>
  );
};


const RenderDays = () => {
  const days = [];
  const date = [
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
    "일요일",
  ];
  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col" key={i} style={{ marginLeft:'0.1rem', marginRight: '0.1rem'}}>
        {date[i]}
      </div>
    );
  }
  return <div className="days row" style={{ marginLeft:'1px'}}>{days}</div>;
};


const GetMeeting = (meetings, cloneDay, currentMonth) => {
  let meeting = "";
  meetings.forEach((m) => {
    if (cloneDay.getDate() == m.day) {
      meeting = m;
    }
  });
  return meeting;
};


const RenderCells = ({ currentMonth, selectedDate, onDateClick, meetings }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = addDays(day, 1);
      formattedDate = format(cloneDay, "d");
      //해당 날짜에 미팅이 있으면 담기
      const meeting = GetMeeting(meetings, cloneDay);
      
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(cloneDay, monthStart)
              ? "disabled"
              : isSameDay(cloneDay, selectedDate)
                ? "selected"
                : format(currentMonth, "M") !== format(cloneDay, "M")
                  ? "not-valid"
                  : "valid"
          }`}
          key={cloneDay}
          onClick={() => onDateClick(cloneDay, meeting)}
        >
          <span
            className={
              format(currentMonth, "M") !== format(cloneDay, "M")
                ? "text not-valid"
                : ""
            }
          >
            {formattedDate}
          </span>
          <Meeting
            meeting={meeting}
            currentMonth={currentMonth}
            cloneDay={cloneDay}
          />
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
};

//달력 칸에 썸네일 출력하기
const Meeting = ({ meeting, currentMonth, cloneDay }) => {
  //console.log(meeting);
  // console.log(currentMonth);
  // console.log(cloneDay);
  if (meeting && currentMonth.getMonth() == cloneDay.getMonth()) {

    //console.log(meeting.thumbnailImgPath)
    if(meeting.thumbnailImgPath != "defaultThumbnailImgPath"){
      return <img 
                src={meeting.thumbnailImgPath}
                alt=""  
                style={{ width: '100%'}}></img>
    }
    else{
      return <img
                src={'./egg_img.png'}
                style={{width: '100%'}}></img>
    }
  }
};
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
  const urlInfo = getEnv('API_URL');

  //해당 아동의 미팅 정보 불러오기
  useEffect(() => {
    setRelation(childInfo.relationId);
    axios
      .post(`${urlInfo}/meetingSchedue`, {
        relationId: childInfo.relationId,
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1,
      })
      .then((res) => {
        setMeetings(res.data);
        //console.log(res);
      })
      .catch((err) => {});
  }, [childInfo, currentMonth, isModalOpen]);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = (day, meeting) => {

    setSelectedDate(day);

    //지난날 + meeting존재 -> picture
    //지난날 + meeting없음 -> 무응답
    //오늘 + meeting존재 -> 화상 채팅 이동
    //오늘 + meeting없음 -> 채팅 생성
    //이후 + meeting존재-> 하루 1개만 생성 가능
    //이후 + meeting없음 -> 생성

    const selectDate = dateToNumber(day)

    const current = dateToNumber(currentDate)

    //미팅 생성
    if (!meeting && (selectDate == current || selectDate > current)) {
      setModalOpen(true);
    }

    //화상 채팅 입장
    else if (selectDate == current) {
      console.log("세션입장");
    }

    //사진 기록들 보기
    else if (selectDate < current && meeting) {
      navigate("/volunteer_ChoosePicturePage", {
        state: {
          //날짜가 아닌 meetingId로 사진 불러오기
          meetingId: `${meeting.meetingId}`,
        },
      });
    }
    //하루에 한개의 미팅만 생성가능
    else if (selectDate > current) {
      console.log("1개만 생성할 수 있습니다");
    }
  };
  const closeModal = () => {
    // 모달을 닫을 때 호출되는 함수
    setModalOpen(false);
  };

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
        meetings={meetings}
      />
      {isModalOpen && (
        <MeetingModal
          setModalOpen={setModalOpen}
          isModalOpen={isModalOpen}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};
export default VolunteerCalendar;