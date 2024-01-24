import React, { useState } from 'react'

const CommonSidePanel = () => {

  const [sidePanelStatus, setSidePanelStatus] = useState(true)

  const renderSidePanel = () => {
    if (sidePanelStatus) {
      return (
        <div style={{
          backgroundColor: 'rgb(255, 248, 223)',
          padding: '2rem',
          color: 'white',
          maxWidth: '300px',
          borderRadius: '20px 0 0 20px',
          height: '100%',
        }}>
          <div>
            <button style={{position: 'absolute', left: '225px', borderRadius: '25px', backgroundColor: 'rgb(255, 248, 223)', fontWeight: 'bold', color: 'rgb(240, 165, 8)'}} onClick={() => setSidePanelStatus(false)}>{"<<"}</button>
            <img style={{position: 'absolute', left: '70px', top: '200px', height: '200px', width: '200px', borderRadius: '100px', border: '5px solid rgb(0, 0, 0)'}} src="./anonymous.jpg" alt="" />
          </div>
        </div>
      )
    }
    else {
      return (
        <button style={{borderRadius: '25px', backgroundColor: 'rgb(255, 248, 223)', fontWeight: 'bold', color: 'rgb(240, 165, 8)', margin: '2rem'}} onClick={() => setSidePanelStatus(true)}>{">>"}</button>
      )
    }
  }

  return (
    renderSidePanel()
  )
}

export default CommonSidePanel