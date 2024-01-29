import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChoosePicturePage = () => {
  const navigate = useNavigate(); // useNavigate 함수를 호출하여 navigate 함수를 가져옴


  return (
    <>
      <div> 화상 때 캡쳐한 사진들 & 동영상</div>
    </>
  );
};

export default ChoosePicturePage; // 파일 이름을 PascalCase로 수정
