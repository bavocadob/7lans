import { Button } from 'bootstrap'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom'
import styled from 'styled-components';
import getEnv from "../../../utils/getEnv";
import { useSelector } from "react-redux";

const getRandomRotation = () => Math.floor(Math.random() * 30) -20;
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const Frame = styled.div`
  border: 5px solid #523329;
  padding: 10px;
  width: 150px;
  height: 150px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: transparent;

  &:hover {
    background-color: #FFB743;
  }
`;

const Outer = styled.div`
  display: inline-block;
  width: 200px;
  height: 200px;
  position: relative;
`;

const Blackboard = styled.img`
position: absolute;
top: 80%;
left: 80%;

width: 100px;
height: 100px;
`;

const Desk = styled.div`
  width: 89%;
  height: 50px;
  background-color: #964b00;

  position: absolute;
  top: 95%;
  color: white;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? "block" : "none")};
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const CuteButton = styled.button`
  background-color: #ff8c94;
  border: none;
  border-radius: 15px;
  padding: 10px;
  font-size: 14px;
  color: white;
  cursor: pointer;
  margin-top: 5px;
  margin-left: 5px;
`;


//이미지 렌덤한 각으로 돌려서 출력
const Images = ({image, setSelectedImage, setIsModalOpen}) => {

  const selectThumbnail = () => {
    setIsModalOpen(true)
    setSelectedImage(image.meetingImageId)
  }

  return(
    <Outer>
      <Frame style={
          {
            transform: `rotate(${getRandomRotation()}deg)`,
            transformOrigin: 'right top'
          }
        }
          onClick={() => {selectThumbnail()}}
        >
        <Image src={image.meetingImagePath}/>
      </Frame>
    </Outer>
  )
}


const Picture = () => {
  const [images, setImages] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  
  //부모에게서 전달받은 값
  const location = useLocation();
  const state = {...location.state};
  
  const urlInfo = getEnv('API_URL');

  //console.log("Picture")
  //console.log(state.meetingId);

  //이미지 데이터 가져오기
  useEffect(() => {
    axios.get(`${urlInfo}/meetingImage/${state.meetingId}`)
      .then((res) => {
        //console.log(res)

        const image = [];

        res.data.map((meetingImage, index) => {
          image.push(meetingImage)
        })

        setImages(image)
      
      }).catch((error) => {

    }).then(() => {

    });
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const changeThumbnail = () => {
    //console.log(selectedImage)
    axios.put(`${urlInfo}/meetingImage/changeThumbnailImage`, {
      meetingImageId: selectedImage
    })
    .then((res)=> {

    })
    .catch((err) => {
    });
  }

  console.log(images.length)
  return (
    <div>
    {images.length > 0 && images.map((element) => (
      <Images 
        key={element.meetingImageId}
        image={element}
        setSelectedImage={setSelectedImage}
        setIsModalOpen={setIsModalOpen}
        />
    ))}
    {images.length == 0 && (
     <div style={{height: '500px', position: 'absolute', top: '10%'}}>
     <img src='./dinosourImage/dinosaur1_sad.png'
          style={{height: '100%'}}/>
      <div style={{color: 'white'}}>같이 찍은 사진이 없어요</div>
      </div>

    )}
    
      <div>
        <Blackboard src="blackboard.png"/>
      </div>
      <Desk>사진을 선택하면 썸네일이 돼요!</Desk>

{/* 썸네일 설정 확인 모달 */}
      <ModalOverlay open={isModalOpen} onClick={closeModal}>
        <ModalContent>
          <p>해당 사진을 대표사진으로 설정할까요?</p>
          <CuteButton onClick={closeModal}>취소하기</CuteButton>
          <CuteButton onClick={changeThumbnail}>제출하기</CuteButton>
        </ModalContent>
      </ModalOverlay>
    </div>


    
    
  )
}

export default Picture