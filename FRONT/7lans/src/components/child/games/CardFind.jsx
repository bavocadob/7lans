import React, { useEffect, useRef, useState } from 'react'

const cardNum = Array.from({ length: 16 }, (_, index) => index + 1);
const CardFind = () => {
    
  const [flippedCard, setFlippedCard] = useState([])
  const [nowCard, setNowCard] = useState([])
  const [mount, setMount] = useState([])
  const [flipping, setFlipping] = useState(false)
  const [correct, setCorrect] = useState(false)
  

  useEffect(() => {
    shuffle(cardNum)
    setMount(cardNum)
  }, [])

  useEffect(() => {
      if (nowCard.length == 2) {
          if ((nowCard[0] > nowCard[1] && nowCard[0] == nowCard[1] + 8) || (nowCard[1] > nowCard[0] && nowCard[1]  == nowCard[0] + 8)) {
              const temp = [...nowCard]
              setFlippedCard([...flippedCard, ...temp])
              setFlipping(true)
              const timeoutfunc = setTimeout(() => {
                  setNowCard([])
                  setFlipping(false)
              }, 1000)
              
              return () => clearTimeout(timeoutfunc)
          }
          else {
            setFlipping(true)
              const timeoutfunc = setTimeout(() => {
                  setNowCard([])
                  setFlipping(false)
              }, 1000)
              
              return () => clearTimeout(timeoutfunc)
          }
      }
      if (flippedCard.length == 16) {
          setCorrect(true)
          const timeoutfuncs = setTimeout(() => {
            shuffle(cardNum)
            setNowCard([])
            setFlippedCard([])
            setCorrect(false)
        }, 3000)
        return () => {clearTimeout(timeoutfuncs)}
      }
  }, [nowCard])

  const handleCard = (e, num) => {
    e.preventDefault()
    console.log(num)
    setNowCard((nowCard) => [...nowCard, num])
  }

  const shuffle = (arr) => {
    arr.sort(() => Math.random() -0.5)
  }
  
  const renderCard = () => {
    if (correct) {
        return (
            <div style={{ display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: '150px'
                        }}>
                성공
            </div>
        )
    }
    else {
        return (
            <div style={{display: 'flex', 
                        flexWrap: 'wrap', 
                        height: '100%', 
                        width: '100%', 
                        padding: '0' , 
                        alignItems: 'center', 
                        justifyContent: 'center'}}>
                {cardNum.map((num, index) => {
                    const isFlipped = nowCard.includes(num) || flippedCard.includes(num)
                    return (
                    <button disabled={(flippedCard.includes(num) || flipping)? true : false} 
                            style={{transform: (isFlipped ? 'rotateY(360deg)' : ''), 
                                    transition: 'transform 0.4s', 
                                    fontSize: '2rem' , 
                                    height: '120px', 
                                    width: '140px', 
                                    margin: '1rem',
                                    marginBottom: '0', 
                                    border: '3px solid rgb(240, 165, 8)', 
                                    borderRadius: '17px', 
                                    backgroundColor: 'rgb(255, 215, 3)',
                                  }} 
                            key={index} 
                            onClick={(e) => handleCard(e, num)}>
                              {(nowCard.includes(num) || flippedCard.includes(num))? 
                              (num > 8 ? <img src={`./cardImage/cardImage${num-8}.png`} 
                                              alt="" 
                                              style={{height: '60px', 
                                                      width: '60px'}} /> : 
                              <img src={`./cardImage/cardImage${num}.png`} 
                                   alt="" 
                                   style={{height: '60px', 
                                           width: '60px'}} />) : ''}
                            <img src={`./cardImage/cardImage${num}`} alt="" />
                    </button>
                )})}
            </div>
        )
    }

  }
  return (
    <div>
        {renderCard()}
    </div>
  )
}

export default CardFind