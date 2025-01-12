import React from 'react'
import styled from 'styled-components'
import Spinner from '../../../images/loading.gif';
import PropTypes from "prop-types";

const RightSide = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-content: center;
  border-radius: 0 20px 20px 0;
`

const Background =  styled.div`
  width: 100%;
  height: 100%;
  background: #ffffffb7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const LoadingText = styled.div`
    text-align: center;
    font-size: 30px;
`

// const Game = () => {
//     const gameSelector = useSelector((state) => state.chooseGame.value)
    
//         const renderGame = () => {
//             if (gameSelector === 1) {
//                 return (
//                     <p>퀴즈 출제</p>
//                 )
//             }
            
//             if (gameSelector === 3) {
//                 return (
//                     <p>구구단</p>
//                 )
//             }
//             if (gameSelector === 4) {
//                 return (
//                     <p>단어 제시</p>
//                     )
//             };
//         return renderGame();
// }

const Waiting = ({ problemType }) => {
  return (
    <Background>
      <LoadingText>
        <p>
          {problemType} 출제 중입니다
        </p>
        <p>
          조금만 기다려 주세요
        </p>
      </LoadingText>
      <img src={Spinner} alt='기다리는 중' width="5%"/>
    </Background>
  )
}


Waiting.propTypes = {
  problemType: PropTypes.string.isRequired
};

export default Waiting;