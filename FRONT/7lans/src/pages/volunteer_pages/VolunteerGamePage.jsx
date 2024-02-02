import React from 'react'
import GameNav from '../../components/navs/GameNav'
import Chat from '../../components/child/games/Chatting'
import { useSelector } from 'react-redux'
import Gugudan from '../../components/child/games/Gugudan'
import Quiz from '../../components/child/games/Quiz'
import Words from '../../components/child/games/Words'
import CardFind from '../../components/child/games/CardFind'
import { GrGamepad } from "react-icons/gr";
import { motion } from "framer-motion"

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
    return (
      <div className='center' style={{fontSize:'45px', 
                              display: 'flex',
                              flexDirection: 'column', 
                              justifyContent: 'center', 
                              alignItems: 'center', 
                            }}>
          게임을 골라주세요.
          <motion.div
              animate={{
                scale: [1, 1.5, 1.5, 1, 1],
                rotate: [0, 0, 180, 360, 0],
                borderRadius: ["0%", "0%", "50%", "50%", "0%"]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1
              }}>
              <GrGamepad />
          </motion.div>
           
      </div>
            )
          }

  return (
    <div style={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <GameNav/>
      <div style={{flex: 1, backgroundColor: 'rgb(255, 233, 156)', display: 'flex', padding: '0.2rem'}}>
        <div style={{width: '100%', maxWidth: '35vw'}}>
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