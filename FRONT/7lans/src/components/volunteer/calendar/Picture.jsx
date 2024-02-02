import { Button } from 'bootstrap'
import React from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom'
import styled from 'styled-components';

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

  //부모에게서 전달받은 값
  const location = useLocation();
  const state = {...location.state};

  console.log("Picture")
  console.log(state.meetingId);


  //이미지 데이터 가져오기
  axios.get(`http://localhost:8080/meetingSchedue/image/${state.meetingId}`)
  .then(function (response) {
      console.log(response)
  }).catch(function (error){

  }).then(function() {

  });

  const images = [
    {
      id: '1',
      src: "7lans_logo.png"
     },
     {
      id: '2',
      src: "7lans_logo1.png"
     },
     {
      id: '3',
      src: "7lans_logo2.png"
     },
     {
      id: '4',
      src: "7lans_logo3.png"
     },
     {
      id: '5',
      src: "anonymous.jpg"
     },]

  return (
    <div>
    {images.map((element) => (
      <Images 
        key={element.id}
        image={element.src}
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