import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeDan } from '../../../store/gugudanSlice';
import { gameChange } from '../../../store/isPlayGameNow';

const Gugudan = () => {
  const [dan, setDan] = useState('none');
  const [multipleNum, setMultipleNum] =useState('')
  const [nowAns, setNowAns] = useState('')
  const [correct, setCorrect] = useState('')

  const inputRef = useRef(null)

  const gugudanState = useSelector((state) => state.gugudan.value)

  const dispatch = useDispatch()

  useEffect(() => {
    if (multipleNum === Number(10)) {
      const timeoutIds = setTimeout(() => {
        resetGame()
      }, 2000)
      return () => clearTimeout(timeoutIds)
    }
    if (correct !== '') {
      const timeoutId = setTimeout(() => {
        setCorrect('')
      }, 2000)
      return () => clearTimeout(timeoutId)
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [multipleNum, correct])

  // 몇 단???
  const renderSpan = (danValue, key) => {
    return (
      <span
        key={key}
        style={{
          width: '10%',
          cursor: 'pointer',
          margin: '5%',
          fontSize: '37px',
          fontWeight: 'bold',
          transition: 'color 0.3s', // Added transition for a smooth effect
          color: dan === danValue ? 'red' : 'black', // Highlight the selected dan
        }}
        onClick={() => setDan(danValue)}
      >
        {danValue} 단
      </span>
    );
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (Number(dan)*Number(multipleNum) === Number(nowAns)) {
        setNowAns('')
        setMultipleNum(Number(multipleNum) + 1)
        setCorrect('정답')
      }
      else {
        setNowAns('')
        setCorrect('오답')
      }
      }
  }

  // 구구단 문제 출제되는 것
  const renderGugudanGame = (dan) => {
    if (dan !== 'none' && correct === '') {
      return(
        <div style={{display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    height: '400px', 
                    width: '50vw',
                    fontSize:'0'
                    }}>
          <h1 style={{
                      marginBottom: '4%', 
                      fontWeight: 'bolder', 
                      fontSize: '100px',
                      color: 'black', 
                      textShadow: '2px 2px 2px rgb(255, 215, 3)', 
                      // height: '20%' 
                      }}>
            {dan} X {multipleNum} = ?
          </h1>
          <div style={{display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        width: '100%', 
                        height: '50%',
                        marginBottom:'0%'
                        }}>
            <div style={{display:'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        height: '30%', 
                        width: '80%', 
                        border: '5px solid black',
                        borderBottom: '0', 
                        borderRadius: '20px 20px 0 0', 
                        backgroundColor: 'rgb(255, 237, 170)'}}>
              <h2>정답을 입력해 주세요</h2>
            </div>
            <div style={{display:'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        height: '100%', 
                        width: '80%', 
                        border: '5px solid black',
                        borderRadius: '0 0 20px 20px',
                        marginBottom:'0'
                        }}>
              <input ref={inputRef} 
                    style={{backgroundColor: 'rgb(255, 215, 3)', 
                            borderRadius: '0 0 15px 15px', 
                            border: 'none', 
                            width: '100%', 
                            height: '100%', 
                            textAlign: 'center',
                            fontSize: '100px'}} 
                    type="text" 
                    onKeyUp={handleEnter} 
                    onChange={(e) => setNowAns(e.target.value)} value={nowAns} />
            </div>
          </div>
        </div>
      )
    }
    else {
      return(
        <div>
          {correct}
        </div>
      )
    }

  }

  const startGame = (dan) => {
    dispatch(changeDan(dan))
    setMultipleNum(1)
    dispatch(gameChange(false))
  }

  const resetGame = () => {
    dispatch(changeDan('none'))
    setDan('none')
    dispatch(gameChange(true))
  }

  const danArray = Array.from({ length: 10 }, (_, index) => index + 1);

  const renderGugudan = () => {
    if (gugudanState === 'none') {
      return (
        <div style={{ display: 'flex', 
                      flexDirection: 'column', 
                      width: '100%', 
                      height:'96%',
                      alignItems: 'center' }}>
        
        <div
          className='shadow'
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '5px solid black',
            borderRadius: '20px',
            height:'70%',
            width: '90%',
            flex: 1,
            marginTop:'2%',
            // margin: '1rem',
            backgroundColor: 'rgb(255, 250, 233)',
          }}
        >
          <h1 style={{ marginTop: '3%', 
                      fontWeight: 'bolder', 
                      color: 'rgb(41, 40, 38)', 
                      textShadow: '2px 2px 2px rgb(255, 215, 3)', 
                      display: 'felx',
                      textAlign: 'center',
                      marginTop:'2rem',
                      marginBottom: '0'
                      }}>
          몇 단을 출제하실 건가요??
        </h1>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              // justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: 'rgb(251, 243, 212)',
              margin: '8%',
              marginTop:'35px',
              marginBottom:'20px',
              height: '70%',
              borderRadius: '16px',
              border: '5px solid black',
            }}
          >
            {danArray.map((danValue) => renderSpan(danValue, danValue))}
          </div>
          <button className='shadow' 
                  style={{width: '150px', 
                        height:'60px',
                        alignSelf: 'center', 
                        fontWeight: 'bolder', 
                        fontSize: '25px', 
                        border: 'none', 
                        borderRadius: '16px', 
                        backgroundColor: 'rgb(255, 215, 3)',
                        marginTop:'0',
                        marginBottom:'15px'
                      }} 
                  onClick={() => startGame(dan)}> 선택 완료 </button>
        </div>
      </div>
      )
    }
    else {
      return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', fontSize:'0'}}>
          {renderGugudanGame(gugudanState)}
          {!correct && 
          <button className='shadow' 
                  style={{width: '150px', 
                          height:'60px',
                          alignSelf: 'center',
                          textAlign:'center', 
                          fontWeight: 'bolder', 
                          fontSize: '25px', 
                          border: 'none', 
                          borderRadius: '16px', 
                          backgroundColor: 'rgb(255, 215, 3)'}}
                  onClick={resetGame}>돌아가기</button>
          }
        </div>
      )
    }
  }

  return (
    renderGugudan()
  );
};

export default Gugudan;
