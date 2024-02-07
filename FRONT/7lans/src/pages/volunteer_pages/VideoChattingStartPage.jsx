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

const RightSide = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  border-radius: 0 20px 20px 0;
  background-color: rgb(255, 255, 255, 0.5);
  /* border: 2px solid rgb(255, 183, 58);
  border-left: none; */

`

const VideoChattingStartPage = () => {
  const [data, setData] = useState(0);
  const childInfo = useSelector((state) => state.child.value)

  const dispatch = useDispatch()
  console.log(childInfo)

  
  return (
    <>
      <NormalNav />
      <div style={{ marginTop: "5.7%" }}>
      <div style={{ height: '650px',
                    padding: '30px', 
                    paddingBottom: "20px",
                    backgroundColor: 'rgb(255, 226, 123)'}}>
        <div style={{height: '100%', 
                      width: '100%', 
                      display: 'flex', 
                      flexDirection: 'row',
                      borderRadius: '20px', 
                      backgroundColor: 'rgb(255, 226, 123)'}}>
          <CommonSidePanel 
            volunteerId={1}
            />
          <RightSide>
             {childInfo? 
              <VolunteerCalendar 
                child={data}
              />
              :
              <div>
                연걸된 아동이 없어요
                <Wrong/>
              </div>
            }     

         </RightSide>

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
