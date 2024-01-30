import React from 'react'
import GameNav from '../../components/navs/GameNav'
import Chat from '../../components/child/games/commons/Chatting'
import { useSelector } from 'react-redux'
import Gugudan from '../../components/child/games/Gugudan'
import Quiz from '../../components/child/games/Quiz'
import Words from '../../components/child/games/Words'
import CardFind from '../../components/child/games/CardFind'

const VolunteerGamePage = () => {

  const gameSelector = useSelector((state) => state.chooseGame.value)

  const renderGame = () => {
    if (gameSelector === 1) {
      return(
        <Quiz />
      )
    }
    if (gameSelector === 2) {
      return(
        <CardFind />
      )
    }
    if (gameSelector === 3) {
      return(
        <Gugudan />
      )
    }
    if (gameSelector === 4) {
      return(
        <Words />
      )
    }
  }

  return (
    <div style={{
      height: '100vh',
      width: '100wh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <GameNav/>
      <div style={{flex: 1, backgroundColor: 'rgb(255, 233, 156)', display: 'flex', padding: '0.2rem'}}>
        <div style={{width: '40%', maxWidth: '400px'}}>
            <Chat/>
        </div>
        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
          {renderGame()}
        </div>
      </div>
    </div>
  )
}

export default VolunteerGamePage