import React, { useEffect, useRef, useState } from 'react'

const cardNum = Array.from({ length: 16 }, (_, index) => index + 1);
const CardFind = () => {

  const [flippedCard, setFlippedCard] = useState([])
  const copyCardList = useRef([])

  useEffect(() => {
    shuffle(cardNum)
  }, [])

  const handleCard = (n) => {
    copyCardList.current = [...copyCardList.current, n]
    if (copyCardList.current.length == 2) {
        if (copyCardList.current[0]/2 == copyCardList.current[1] || copyCardList.current[1]/2 == copyCardList.current[0]) {
            setFlippedCard(copyCardList.current)
            copyCardList = []
        }
    }
    
  }

  const shuffle = (arr) => {
    arr.sort(() => Math.random() -0.5)
  }
  
  

  const renderCard = () => {
    return (
        <div>
            {cardNum.map((num, index) => {return (
                <button style={{height: '20px', width: '20px'}} key={index} onClick={() => handleCard(num)}>{flippedCard.includes(num)? Math.round(num/2): 'X'}</button>
            )})}
        </div>
    )
  }
  return (
    <div>
        {renderCard()}
    </div>
  )
}

export default CardFind