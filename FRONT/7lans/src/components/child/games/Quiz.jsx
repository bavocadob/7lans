import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { addProblem } from '../../../store/quizSlice'
import { gameChange } from '../../../store/isPlayGameNow'



const problem = styled.div`
  
`

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
        <div style={{display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: '100%', 
                    height: '100%'}}>
          <div style={{display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      backgroundColor: 'rgb(255, 250, 231)', 
                      width: '90%', 
                      height: '95%',
                      borderRadius: '20px', 
                      border: '5px solid rgb(45, 45, 45)'}}>
          <div style={{display: 'flex', 
                      justifyContent: 'center', 
                      marginTop: '4%', 
                      // marginBottom: '2%'
                    }}>
            <span style={{ fontSize: '50px',
                          fontWeight: 'bolder', 
                          color: 'rgb(45, 45, 45)', 
                          textShadow: '2px 2px 2px rgb(255, 215, 3)',
                          marginRight: '10px', 
                          marginTop: '10px'
                          }} > 문제 :
            </span>
            <input style={{padding: '0 10px 0 10px ', 
                          width: '500px', 
                          border: 'none', 
                          borderRadius: '10px', 
                          backgroundColor: 'rgb(255, 250, 231)',
                          marginTop: '12px'
                          }} 
                          type="text" 
                          placeholder='문제를 입력하고 답을 선택해주세요'
                    onChange={(e) => setNowProblem(e.target.value)} 
                    value={nowProblem}/>
           </div>

          {/* 정답 선택박스 전체 감싸는 div*/}
          <div style={{display: 'flex', 
                          flexDirection: 'row',
                          alignItems:'center',
                          textAlign:'center', 
                          justifyContent:'center',
                          height: '65%',
                          width:'100%'
                      }}>
          {/* O 선택하는 div */}
          <div style={{display: 'flex', 
                          flexDirection: 'row',
                          textAlign:'center', 
                          justifyContent:'center',
                          width: '50%', 
                          height: '90%', 
                          backgroundColor: 'rgb(251, 243, 212)', 
                          border: '5px solid rgb(45, 45, 45)', 
                          borderRadius: '10px', 
                          // marginTop: '2%',
                          margin: '30px'
                          }}>
              
              <div style={{display: 'flex', 
                          justifyContent: 'center', 
                          alignItems: 'center', 
                          marginTop: '2%', 
                          marginBottom: '2%'}}>
                
                <button onClick={() => setAns('O')} 
                        style={{fontSize: '250px', 
                                margin: '0 45px 0 45px', 
                                border: 'none',  
                                fontWeight: 'bolder', 
                                backgroundColor: 'rgb(251, 243, 212)', 
                                color: ans === 'O'? 'rgb(240, 165, 8)':'rgb(45, 45, 45)'}}>O
                </button>
              </div>
            </div>
            {/* X 선택하는 div */}
            <div style={{display: 'flex', 
                          flexDirection: 'row',
                          textAlign:'center', 
                          justifyContent:'center',
                          width: '50%', 
                          height: '90%', 
                          backgroundColor: 'rgb(251, 243, 212)', 
                          border: '5px solid rgb(45, 45, 45)', 
                          borderRadius: '10px', 
                          // marginTop: '2%'
                          margin: '30px'
                          }}>
              
                <button onClick={() => setAns('X')} 
                        style={{fontSize: '250px', 
                                margin: '0 45px 0 45px', 
                                border: 'none',  
                                fontWeight: 'bolder',
                                backgroundColor: 'rgb(251, 243, 212)', 
                                color: ans === 'X'? 'rgb(240, 165, 8)':'rgb(62, 62, 62)'}}>X
                </button>
              </div>
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
                            marginTop: '20px'
                          }}
                    onClick={() => changeProblem()}>입력 완료</button>
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
        <div style={{width: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    // justifyContent: 'center', 
                    marginTop:'20px',
                    alignItems: 'center'}}>
          <div className='shadow' 
              style={{width: '90%',
                      height: '25%',
                      borderRadius: '20px',
                      backgroundColor:'rgb(255, 242, 176)',
                      // boxShadow:'30px',
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'center', 
                      alignItems: 'center',
                      marginBottom:'50px'
                      }}>
          <h1 style={{fontSize: '40px', 
                      fontWeight: 'bolder', 
                      color: 'black', 
                      textShadow: '2px 2px 2px rgb(255, 215, 3)' }}>{'[ '}문제{' ]'}</h1>
          <h1 style={{fontSize: '80px', 
                      fontWeight: 'bolder', 
                      color: 'black', 
                      textShadow: '2px 2px 2px rgb(255, 215, 3)' }}>{problem}</h1>
         </div>
          <div style={{width: '100%', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center'}} >
            <button style={{fontSize: '100px', 
                            margin: '0 60px 0 60px', 
                            border: 'none', 
                            fontWeight: 'bolder', 
                            backgroundColor: 'rgb(255, 233, 156)', 
                            color: 'rgb(58, 188, 214)' }} 
                    onClick={() => {setAnsCorrect('O'); dispatch(gameChange(true))}}> O
            </button>
            <button style={{fontSize: '100px',
                            margin: '0 60px 0 60px', 
                            border: 'none',  
                            fontWeight: 'bolder', 
                            backgroundColor: 'rgb(255, 233, 156)',
                            color: 'rgb(255, 187, 191)' }} 
                    onClick={() => {setAnsCorrect('X'); dispatch(gameChange(true))}}>X
            </button>
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