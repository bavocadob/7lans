import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CommonSidePanel from '../../components/side_panels/CommonSidePanel';
import NormalNav from '../../components/navs/NormalNav';
import PostIt from '../../components/volunteer/post_it/PostIt';
import Correct from '../../components/dinosaur/Correct';
import { useSelector } from 'react-redux';
import Wrong from '../../components/dinosaur/Wrong';


const StartPage = () => {

  const childInfo = useSelector((state) => state.child.value)
  const childrenInfo = useSelector((state) => state.children.value)

  console.log(childInfo)
  console.log(childrenInfo)
  
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
          <CommonSidePanel />
          <div style={{width: '90%', flex: 1, borderRadius: '0 20px 20px 0', backgroundColor: 'rgb(255, 255, 255)'}}>
            {childInfo?
              <div>
                함께할 아이를 선택해주세요
                <Correct/>
              </div>
              :
              <div>
                함께 할 아이가 없어요
                <Wrong />
              </div>
            }
          </div>
          {childInfo?
            <div style={{width: '10%', backgroundColor: 'rgb(255, 226, 123)'}}>
              <PostIt message={'/volunteer_video_chatting_start'}/>
              <PostIt message={'/volunteer_active_doc'}/>
              <PostIt message={'/volunteer_whispher'}/>
              <PostIt message={'/volunteer_raise_egg'}/>
            </div>
            :
            ''
          }
        </div>
          <div style={{display: 'flex', flexDirection: 'column', position: 'absolute', right: '2%', top: '10rem'}}>
          </div>
      </div>
    </div>
    </>
  );
};

export default StartPage;
