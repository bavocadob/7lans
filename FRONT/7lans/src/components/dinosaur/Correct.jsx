import React from 'react'
import { useSelector } from 'react-redux'

const Correct = () => {
  const userDino = useSelector((state) => state.dino.value)
  return (
    <div>
        <img style={{width: '350', height: '480px'}}
            src={`./dinosourImage/dinosaur${userDino}_happy.png`} alt="" />
    </div>
  )
}

export default Correct