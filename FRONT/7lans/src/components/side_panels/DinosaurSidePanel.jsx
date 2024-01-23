import React, { useState } from 'react'

const DinosaurSidePanel = () => {

  const [sidePanelStatus, setSidePanelStatus] = useState(true)

  const renderSidePanel = () => {
    if (sidePanelStatus) {
      return (
        <div style={{
          backgroundColor: 'rgb(255, 248, 223)',
          padding: '2rem',
          minHeight: '100vh',
          height: '100%',
          color: 'white',
          minWidth: '300px'
        }}>
          <button onClick={() => setSidePanelStatus(false)}>-</button>
        </div>
      )
    }
    else {
      return (
        <button onClick={() => setSidePanelStatus(true)}>+</button>
      )
    }
  }

  return (
    renderSidePanel()
  )
}

export default DinosaurSidePanel