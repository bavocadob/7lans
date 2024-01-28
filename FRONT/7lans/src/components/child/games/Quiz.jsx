import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { addProblem } from '../../../store/quizSlice'

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
      if (ans !== '') {
        const giveProblem = nowProblem
        setNowProblem('')
        dispatch(addProblem(giveProblem))
      }
    }

    if (problem === 'none') {
      return(
        <div>
          <p>
            문제를 출제해 주세요
          </p>
          <input type="text" onChange={(e) => setNowProblem(e.target.value)} value={nowProblem}/>
          <button onClick={() => setAns('O')} style={{backgroundColor: ans === 'O'? 'red':'blue'}}>O</button>
          <button onClick={() => setAns('X')} style={{backgroundColor: ans === 'X'? 'red':'blue'}}>X</button>
          <button onClick={() => changeProblem()}>제출</button>
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
        <div>
          <p>문제: {problem}</p>
          <button onClick={() => setAnsCorrect('O')}>O</button>
          <button onClick={() => setAnsCorrect('X')}>X</button>
        </div>
      )
    }
  }

  return (
    renderQuiz()
  )
}

export default Quiz