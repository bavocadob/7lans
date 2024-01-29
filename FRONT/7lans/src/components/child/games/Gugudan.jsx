import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeDan } from '../../../store/gugudanSlice';

const Gugudan = () => {
  const [dan, setDan] = useState('none');
  const [multipleNum, setMultipleNum] =useState('')
  const [nowAns, setNowAns] = useState('')
  const [correct, setCorrect] = useState('')
  const gugudanState = useSelector((state) => state.gugudan.value)

  const dispatch = useDispatch()

  useEffect(() => {
    if (multipleNum === Number(10)) {
      resetGame()
    }
    if (correct !== '') {
      const timeoutId = setTimeout(() => {
        setCorrect('')
      }, 3000)
      return () => clearTimeout(timeoutId)
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
        <div style={{display: 'flex'}}>
          <h1 style={{width: '100%', alignSelf: 'center', marginTop: '4%', fontWeight: 'bolder', color: 'rgb(255, 215, 3)', textShadow: '2px 2px 2px black' }}>{dan} X {multipleNum} = ?</h1>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <h2>정답을 입렵해 주세요</h2>
            <input type="text" onKeyUp={handleEnter} onChange={(e) => setNowAns(e.target.value)} value={nowAns} />
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
  }

  const resetGame = () => {
    dispatch(changeDan('none'))
    setDan('none')
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
        <div>
          {renderGugudanGame(gugudanState)}
          <button onClick={resetGame}>돌아가기</button>
        </div>
      )
    }
  }

  return (
    renderGugudan()
  );
};

export default Gugudan;
