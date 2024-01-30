import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { addProblem } from '../../../store/quizSlice'
import { gameChange } from '../../../store/isPlayGameNow'

const Quiz = () => {

  const [ans, setAns] = useState('')
  const [ansCorrect, setAnsCorrect] = useState('')
  const [nowProblem, setNowProblem] = useState('')
  const problem = useSelector((state) => state.quiz.value)
  const dispatch = useDispatch()

  useEffect(() => {
    if (ansCorrect !== '') {
      const timeoutId = setTimeout(() => {
        dispatch(addProblem('none'))
        setAns('')
        setAnsCorrect('')
      }, 3000)
      return () => clearTimeout(timeoutId)
    }
  }, [ansCorrect, problem])

  const renderQuiz = () => {
    
    const changeProblem = () => {
      if (ans !== '' && nowProblem !== '') {
        const giveProblem = nowProblem
        setNowProblem('')
        dispatch(addProblem(giveProblem))
        dispatch(gameChange(false))
      }
    }

    if (problem === 'none') {
      return(
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgb(255, 250, 231)', width: '90%', height: '70%', borderRadius: '20px', border: '5px solid black'}}>
            <div style={{display: 'flex', flexDirection: 'column', width: '90%', height: '70%', backgroundColor: 'rgb(251, 243, 212)', border: '5px solid black', borderRadius: '10px', marginTop: '2%'}}>
              <div style={{display: 'flex', justifyContent: 'center', marginTop: '7%', marginBottom: '2%'}}>
                <span style={{ fontSize: '30px', fontWeight: 'bolder', color: 'rgb(255, 215, 3)', textShadow: '2px 2px 2px black', marginRight: '10px' }} >문제 :</span>
                <input style={{padding: '0 10px 0 10px ', width: '300px', border: 'none', borderRadius: '10px', backgroundColor: 'rgb(255, 215, 3)'}} type="text" onChange={(e) => setNowProblem(e.target.value)} value={nowProblem}/>
              </div>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2%', marginBottom: '2%'}}>
                <span style={{ fontSize: '30px', fontWeight: 'bolder', color: 'rgb(255, 215, 3)', textShadow: '2px 2px 2px black', marginRight: '10px' }}>정답 :</span>
                <button onClick={() => setAns('O')} style={{fontSize: '60px', margin: '0 45px 0 45px', border: 'none',  fontWeight: 'bolder', backgroundColor: 'rgb(251, 243, 212)', color: ans === 'O'? 'red':'blue'}}>O</button>
                <button onClick={() => setAns('X')} style={{fontSize: '60px', margin: '0 45px 0 45px', border: 'none',  fontWeight: 'bolder', backgroundColor: 'rgb(251, 243, 212)', color: ans === 'X'? 'red':'blue'}}>X</button>
              </div>
            </div>
            <button className='shadow' style={{marginTop: '2rem', width: '150px', alignSelf: 'center', fontWeight: 'bolder', fontSize: '20px', border: 'none', borderRadius: '20px', backgroundColor: 'rgb(255, 215, 3)'}} onClick={() => changeProblem()}>제출</button>
          </div>
        </div>
      )
    }
    else if (ansCorrect !== '') {
      if (ansCorrect === ans) {
        return (
          <div>정답</div>
        )
      }
      else {
        return (
          <div>오답</div>
        )
      }
    }
    else {
      return(
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <h1 style={{fontSize: '50px', fontWeight: 'bolder', color: 'rgb(255, 215, 3)', textShadow: '2px 2px 2px black' }}>{'[ '}문제{' ]'}</h1>
          <h1 style={{fontSize: '50px', fontWeight: 'bolder', color: 'rgb(255, 215, 3)', textShadow: '2px 2px 2px black' }}>{problem}</h1>
          <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
            <button style={{fontSize: '100px', margin: '0 60px 0 60px', border: 'none',  fontWeight: 'bolder', backgroundColor: 'rgb(255, 233, 156)', color: 'rgb(58, 188, 214)' }} onClick={() => {setAnsCorrect('O'); dispatch(gameChange(true))}}>O</button>
            <button style={{fontSize: '100px', margin: '0 60px 0 60px', border: 'none',  fontWeight: 'bolder', backgroundColor: 'rgb(255, 233, 156)', color: 'rgb(255, 187, 191)' }} onClick={() => {setAnsCorrect('X'); dispatch(gameChange(true))}}>X</button>
          </div>
        </div>
      )
    }
  }

  return (
    renderQuiz()
  )
}

export default Quiz