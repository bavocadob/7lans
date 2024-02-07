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
import Wrong from '../../components/dinosaur/Wrong';
import SelectedChildPostit from '../../components/volunteer/post_it/SelectedChildPostit';
import ChildPostit from '../../components/volunteer/post_it/ChildPostit';
import ChildCommonSidePanel from '../../components/side_panels/ChildCommonSidePanel';
import ChildCalendar from '../../components/volunteer/calendar/ChildCalendar';

const ChildVideoChattingStartPage = () => {
  const [data, setData] = useState(0);
  const volInfo = useSelector((state) => state.vol.value)

  const dispatch = useDispatch()
  console.log(volInfo)

  
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
          <ChildCommonSidePanel 
            volunteerId={1}
            />
            <div>
            </div>
          <div style={{width: '90%', flex: 1, borderRadius: '0 20px 20px 0', backgroundColor: 'rgb(255, 255, 255)'}}>
            {volInfo? 
              <ChildCalendar 
                child={data}
              />
              :
              <div>
                연걸된 아동이 없어요
                <Wrong/>
              </div>
            }     

          </div>

          <div style={{width: '10%', backgroundColor: 'rgb(255, 226, 123)'}}>
            <SelectedChildPostit message={'/child_video_chatting_start'}/>
            <ChildPostit message={'/child_whispher'}/>
            <ChildPostit message={'/child_raise_egg'}/>
          </div>
        </div>
          <div style={{display: 'flex', flexDirection: 'column', position: 'absolute', right: '2%', top: '10rem'}}>
          </div>
      </div>
    </div>
    </>
  );
};

export default ChildVideoChattingStartPage;
