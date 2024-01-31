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

  const renderSpan = (danValue, key) => {
    return (
      <span
        key={key}
        style={{
          width: '10%',
          cursor: 'pointer',
          margin: '5%',
          fontSize: '30px',
          fontWeight: 'bold',
          transition: 'color 0.3s', // Added transition for a smooth effect
          color: dan === danValue ? 'blue' : 'black', // Highlight the selected dan
        }}
        onClick={() => setDan(danValue)}
      >
        {danValue}단
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
  const renderGugudanGame = (dan) => {
    if (dan !== 'none' && correct === '') {
      return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '80%', width: '50vw'}}>
          <h1 style={{marginTop: '10%', fontWeight: 'bolder', color: 'rgb(255, 215, 3)', textShadow: '2px 2px 2px black', height: '30%' }}>{dan} X {multipleNum} = ?</h1>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '70%'}}>
            <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', height: '30%', width: '100%', border: '5px solid black', borderBottom: 'none', borderRadius: '20px 20px 0 0', backgroundColor: 'rgb(255, 237, 170)'}}>
              <h2>정답을 입력해 주세요</h2>
            </div>
            <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', border: '5px solid black', borderRadius: '0 0 20px 20px'}}>
              <input ref={inputRef} style={{backgroundColor: 'rgb(255, 215, 3)', borderRadius: '0 0 15px 15px', border: 'none', width: '100%', height: '100%', textAlign: 'center'}} type="text" onKeyUp={handleEnter} onChange={(e) => setNowAns(e.target.value)} value={nowAns} />
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
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
        <h1 style={{ marginTop: '4%', fontWeight: 'bolder', color: 'rgb(255, 215, 3)', textShadow: '2px 2px 2px black' }}>
          몇 단을 출제하실 건가요??
        </h1>
        <div
          className='shadow'
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '5px solid black',
            borderRadius: '20px',
            width: '90%',
            flex: 1,
            margin: '2rem',
            backgroundColor: 'rgb(255, 250, 233)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: 'rgb(251, 243, 212)',
              height: '70%',
              margin: '3%',
              borderRadius: '10px',
              border: '5px solid black',
            }}
          >
            {danArray.map((danValue) => renderSpan(danValue, danValue))}
          </div>
          <button className='shadow' style={{width: '150px', alignSelf: 'center', fontWeight: 'bolder', fontSize: '20px', border: 'none', borderRadius: '20px', backgroundColor: 'rgb(255, 215, 3)'}} onClick={() => startGame(dan)}>선택 완료</button>
        </div>
      </div>
      )
    }
    else {
      return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          {renderGugudanGame(gugudanState)}
          {!correct && 
          <button className='shadow' style={{marginTop: '30px', width: '150px', alignSelf: 'center', fontWeight: 'bolder', fontSize: '20px', border: 'none', borderRadius: '20px', backgroundColor: 'rgb(255, 215, 3)'}} onClick={resetGame}>돌아가기</button>
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
