import React from 'react';
import { useNavigate } from 'react-router-dom';
import NormalNav from '../../components/navs/NormalNav'
import CommonSidePanel from '../../components/side_panels/CommonSidePanel'
import Picture from '../../components/volunteer/calendar/Picture'
import PostIt from '../../components/volunteer/post_it/PostIt';
import SelectedPostit from '../../components/volunteer/post_it/SelectedPostit';


const ChildChoosePicturePage = () => {
  const navigate = useNavigate(); // useNavigate 함수를 호출하여 navigate 함수를 가져옴
  
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

          <div style={{width: '90%', flex: 1, borderRadius: '0 20px 20px 0', backgroundColor: 'rgba(29, 73, 11, 1)'}}>
            <Picture/>
          </div>
          
          <div style={{width: '10%', backgroundColor: 'rgb(255, 226, 123)'}}>
            <SelectedPostit message={'/child_video_chatting_start'}/>
            <PostIt message={'/child_whispher'}/>
            <PostIt message={'/child_raise_egg'}/>
          </div>
        </div>
          <div style={{display: 'flex', flexDirection: 'column', position: 'absolute', right: '2%', top: '10rem'}}>
          </div>
      </div>
    </div>
    </>
  );
}

export default ChildChoosePicturePage