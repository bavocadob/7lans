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

  //transform: rotate(${getRandomRotation()}deg);
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
`;

//이미지 렌덤한 각으로 돌려서 출력
function Images({image}){
  return(
    <Outer>
      <Frame style={
          {
            transform: `rotate(${getRandomRotation()}deg)`,
            transformOrigin: 'right top'
          }
        }>
        <Image src={image}/>
      </Frame>
    </Outer>
  )
}


const Picture = () => {
  const [images, setImages] = useState([])
  
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

  return (
    <div>
    {images.map((element) => (
      <Images 
        key={element.meetingImageId}
        image={element.meetingImagePath}
        />
    ))}
    
      <div>
        <Blackboard src="blackboard.png"/>
      </div>
      <Desk></Desk>
    </div>
    
    
  )
}

export default Picture