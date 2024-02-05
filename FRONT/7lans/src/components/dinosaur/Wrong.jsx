import React from 'react'
import { useSelector } from 'react-redux'

const Wrong = () => {
    const userDino = useSelector((state) => state.dino.value)
    return (
      <div>
          <img style={{width: '60%'}} src={`./dinosourImage/dinosaur${userDino}_sad.png`} alt="" />
      </div>
    )
}

export default Wrong