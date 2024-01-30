import React from 'react';
import { useNavigate } from 'react-router-dom';
import NormalNav from '../../components/navs/NormalNav'
import CommonSidePanel from '../../components/side_panels/CommonSidePanel'
import Picture from '../../components/volunteer/calendar/Picture'

const ChoosePicturePage = () => {
  const navigate = useNavigate(); // useNavigate 함수를 호출하여 navigate 함수를 가져옴


  return (
    <>
      <div>
      <NormalNav />
      </div>

      <div style={{display: 'flex'}}>
        <div style={{width: '300px'}}>
          <CommonSidePanel />
        </div>
        <div style={{width: '100%'}}> 
          <Picture />
        </div>
      </div>
    </>
    
  );
};

export default ChoosePicturePage; // 파일 이름을 PascalCase로 수정

<>
<div style={{
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100vw',
}}>
  <NormalNav />
  <div style={{flex: 1, padding: '30px', backgroundColor: 'rgb(255, 226, 123)'}}>
    <div style={{height: '100%',borderRadius: '20px', backgroundColor: 'rgb(255, 255, 255)'}}>
      <Picture />
    </div>
  </div>
</div>
</>