import React from 'react'
import { useSelector } from 'react-redux'
import getEnv from '../../utils/getEnv'

const Correct = () => {
  const userDino = useSelector((state) => state.dino.value)
  return (
    <div>
        <img style={{width: '350', height: '480px'}}
            src={`${getEnv("PUBLIC_URL")}/dinosourImage/dinosaur${userDino}_happy.png`} alt="" />
    </div>
  )
}

export default Correct