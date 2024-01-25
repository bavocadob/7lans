import React from 'react'
import GameNav from '../../components/navs/GameNav'
import VolunteerChatSidePanel from '../../components/side_panels/VolunteerChatSidePanel'

const VolunteerGamePage = () => {
  return (
    <div style={{
      height: '100vh',
      width: '100wh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <GameNav/>
      <div style={{flex: 1, backgroundColor: 'rgb(255, 233, 156)', display: 'flex', padding: '1rem'}}>
        <div style={{width: '40%', maxWidth: '400px'}}>
            <VolunteerChatSidePanel/>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default VolunteerGamePage