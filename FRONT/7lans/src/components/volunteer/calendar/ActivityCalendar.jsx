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
import ActiveDocs from '../active_docs/AcitveDocs';

// import CommonSidePanel from '../../components/side_panels/CommonSidePanel';
import NormalNav from '../../navs/NormalNav';
import PostIt from '../../volunteer/post_it/PostIt';
import SelectedPostit from '../../volunteer/post_it/SelectedPostit';
import Modal from 'react-modal';
import { current } from '@reduxjs/toolkit';
import getEnv from "../../../utils/getEnv";

ReactModal.setAppElement('#root');


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
    //const days = [];
    const date = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

    const days = date.map((day, index) => (
        <div className="col" key={index} style={{ marginLeft:'0.1rem', marginRight: '0.1rem'}}>
        {day}
        </div>
    ));
        

    return <div className="days row" style={{ marginLeft:'1px'}}>{days}</div>;
};

const GetActivityLog = (activityLogs, cloneDay, currentMonth) => {

    let activityLog = '';
     activityLogs.forEach(a => {
        const day = Number(a.dateInfo.substr(8))

        const curDay = currentMonth.getDate()

        if(cloneDay.getDate() == day && curDay >= day){
            activityLog = a;
        }
     })

    return activityLog;
    
}

const Activity = ({activityLog, currentMonth, cloneDay}) => {
    // console.log(activityLog)
    // console.log(currentMonth)
    if(activityLog){
        
        //TODO: activity log 상태에 따라 다른 이미지 출력
        if(currentMonth.getMonth() == cloneDay.getMonth()){
        return (
                <div>
                    {activityLog.activityLogId}
                    <img    src={`./activity_log/activityLog_approve.png`} 
                            alt=""  
                            style={{ width: '100%'}}/>
                </div>
            )
        }
    }
}



const RenderCells = ({ currentMonth, selectedDate, onDateClick, activityLogs}) => {
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

          //해당 날짜에 activity log 잇으면 담기 
          const activityLog = GetActivityLog(activityLogs, cloneDay, currentMonth);
            
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
                  onClick={() => onDateClick(cloneDay, activityLog)}
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
                  {/* activity 있으면 로고 출력 */}
                  <Activity
                    activityLog = {activityLog}
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


const ActivityCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [relationId, setRelation] = useState(1);
    const [activityLogs, setActivityLogs] = useState([]);
    const urlInfo = getEnv('API_URL');


    const navigate = useNavigate();
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const childInfo = useSelector((state) => state.child.value)

    //해당 아동의 활동일지 정보 불러오기
    useEffect(() => {
        setRelation(childInfo.relationId);
    
        axios.post(`${urlInfo}/activityLog/volunteer/list`,{
            relationId: childInfo.relationId,
            dateInfo: "2024-02-01"
        })
        .then((res) => {
            setActivityLogs(res.data);
            //console.log(res)
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

    const onDateClick = (day, activityLog) => {
        setSelectedDate(day);
        
        //활동일지 존재하면 입력창으로 이동
        if(activityLog){

            //이전에 했던 화상만 입력이 가능 
            navigate('/active_docs', {
                state: {
                    activityLogId: `${activityLog.activityLogId}`
                }
            })
        }
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
                    activityLogs = {activityLogs}
                />
            </div>
      
    );


};

export default ActivityCalendar;

