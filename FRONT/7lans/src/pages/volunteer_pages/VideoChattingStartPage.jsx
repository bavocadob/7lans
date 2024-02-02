import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CommonSidePanel from '../../components/side_panels/CommonSidePanel';
import NormalNav from '../../components/navs/NormalNav';
import PostIt from '../../components/volunteer/post_it/PostIt';
import SelectedPostit from '../../components/volunteer/post_it/SelectedPostit';
import VolunteerCalendar from '../../components/volunteer/calendar/VolunteerCalendar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateChildInfo } from '../../store/childSlice';
import { updateUserInfo } from '../../store/userSlice';
import {updateChildrenInfo} from '../../store/childrenSlice';

const VideoChattingStartPage = () => {
  const [data, setData] = useState(0);

  const dispatch = useDispatch()

    //아동 데이터 가져오기(봉사자 id를 가지고 있어야함)
    useEffect(() => {axios.get(`http://localhost:8080/vol/list/${1}`)
    .then((res) => {
        dispatch(updateChildInfo(res.data[0]))
        dispatch(updateChildrenInfo(res.data))
        setData(res.data[0]);
    })
    .catch((err) => {
    });
}, []);

  
  return (
    <>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
    }}>
      <NormalNav />
      <div style={{flex: 1, padding: '30px', backgroundColor: 'rgb(255, 226, 123)'}}>
        <div style={{height: '100%', width: '100%', display: 'flex', borderRadius: '20px', backgroundColor: 'rgb(255, 226, 123)'}}>
          <CommonSidePanel 
            volunteerId={1}
            />
            <div>
            </div>
          <div style={{width: '90%', flex: 1, borderRadius: '0 20px 20px 0', backgroundColor: 'rgb(255, 255, 255)'}}>        
            <VolunteerCalendar 
              child={data}
            />
          </div>

          <div style={{width: '10%', backgroundColor: 'rgb(255, 226, 123)'}}>
            <SelectedPostit message={'/volunteer_video_chatting_start'}/>
            <PostIt message={'/volunteer_active_doc'}/>
            <PostIt message={'/volunteer_whispher'}/>
            <PostIt message={'/volunteer_raise_egg'}/>
          </div>
        </div>
          <div style={{display: 'flex', flexDirection: 'column', position: 'absolute', right: '2%', top: '10rem'}}>
          </div>
      </div>
    </div>
    </>
  );
};

export default VideoChattingStartPage;
