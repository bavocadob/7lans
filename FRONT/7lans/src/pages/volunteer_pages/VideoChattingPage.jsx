import React from 'react'
import GameNav from '../../components/navs/GameNav'

const VideoChattingPage = () => {
  return (
    <div style={{
      height: '100vh',
      width: '100wh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <GameNav/>
      <div style={{flex: 1, backgroundColor: 'rgb(255, 233, 156)', display: 'flex', padding: '3rem', justifyContent: 'space-between'}}>
        <div style={{width: '30vw', backgroundColor: 'rgb(255, 248, 224)', border: '5px solid black', borderRadius: '20px'}}></div>
        <div>공룡 이미지 들어갈 공간</div>
        <div style={{width: '30vw', backgroundColor: 'rgb(255, 248, 224)', border: '5px solid black', borderRadius: '20px'}}></div>
      </div>
    </div>
  )
}

export default VideoChattingPage