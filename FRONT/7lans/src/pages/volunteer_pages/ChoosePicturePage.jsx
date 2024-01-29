import React from 'react';
import { useNavigate } from 'react-router-dom';
import NormalNav from '../../components/navs/NormalNav'
import CommonSidePanel from '../../components/side_panels/CommonSidePanel'

const ChoosePicturePage = () => {
  const navigate = useNavigate(); // useNavigate 함수를 호출하여 navigate 함수를 가져옴


  return (
    <>
    <div>
    <NormalNav />
    </div>
    <div className='container'>
    <div className='-3'>
    <CommonSidePanel />
      <div className='row-9'> 화상 때 캡쳐한 사진들 & 동영상</div>
    </div>
    </div>
    </>
  );
};

export default ChoosePicturePage; // 파일 이름을 PascalCase로 수정
