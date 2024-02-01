import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWord } from '../../../store/wordsSlice'
import { gameChange } from '../../../store/isPlayGameNow'

const Words = () => {
  const [nowWord, setNowWord] = useState('')
  const word = useSelector((state) => state.words.value)
  const dispatch = useDispatch()
  const [word1, setWord1] = useState('')
  const [word2, setWord2] = useState('')
  const [word3, setWord3] = useState('')
  const [word4, setWord4] = useState('')

  useEffect(() => {
    if (word !== '') {
      dispatch(gameChange(false))
    }
    else {
      dispatch(gameChange(true))
    }
  }, [word])

  const reset = () => {
    dispatch(addWord(''))
    setNowWord('')
    setWord1('')
    setWord2('')
    setWord3('')
    setWord4('')
  }


  if (word === '') {
    return(
      <div style={{height:'98%',
                  width: '95%'
                }}>
      <div
        className='shadow'
        style={{display: 'flex',
                flexDirection: 'column',
                border: '5px solid rgb(45, 45, 45)',
                borderRadius: '20px',
                // width:'95%'
                height: '94%',
                flex: 1,
                margin: '1.5rem',
                backgroundColor: 'rgb(255, 250, 233)',
        }}>
          
          <h1 
          style={{marginTop: '4%', 
                  fontWeight: 'bolder', 
                  color: 'rgb(45, 45, 45)', 
                  textShadow: '2px 2px 2px rgb(255, 215, 3)',
                  textAlign:'center'
              }}> 단어를 제시해 주세요.
          </h1>
            <div
              style={{ display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      backgroundColor: 'rgb(251, 243, 212)',
                      height: '70%',
                      width: '80%',
                      margin: '3%',
                      marginLeft: '10%',
                      borderRadius: '20px',
                      border: '5px solid rgb(45, 45, 45)',
              }}
            >
            <input style={{border: 'none',
                            height: '100%', 
                            width: '100%', 
                            borderRadius: '20px', 
                            textAlign: 'center', 
                            fontSize: '100px', 
                            backgroundColor: 'rgb(251, 243, 212)'}} 
                            type="text" 
                    onChange={(e) => setNowWord(e.target.value)} 
                    value={nowWord} />
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
                            marginBottom: '20px'
                           }}
                    onClick={() => dispatch(addWord(nowWord))}> 제출
            </button>
          </div>
          </div>
      )
    }
  else {
    return(
      <div style={{ display: 'flex', 
                    flexDirection: 'column',
                    width: '100%', 
                    alignItems: 'center' }}>
        <h1 style={{ marginTop: '4%', 
                    fontWeight: 'bolder', 
                    color: 'rgb(255, 215, 3)', 
                    textShadow: '2px 2px 2px rgb(45, 45, 45)' }}>
          "{word}"을 포함한 문장을 만들어 보아요
        </h1>
        <div
          className='shadow'
          style={{display: 'flex',
                  flexDirection: 'column',
                  border: '5px solid rgb(45, 45, 45)',
                  borderRadius: '20px',
                  width: '90%',
                  flex: 1,
                  margin: '2rem',
                  backgroundColor: 'rgb(255, 250, 233)',
          }}
        >
          <div
            style={{ display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    backgroundColor: 'rgb(251, 243, 212)',
                    margin: '3%',
                    borderRadius: '10px',
                    border: '5px solid rgb(45, 45, 45)',
            }}
          >
            <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '1rem', justifyContent: 'center'}}>
              <input style={{border: '5px solid rgb(45, 45, 45)', borderRadius: '10px', padding: '5px', margin: '0.5rem', fontSize: '20px'}} type="text" placeholder={word1? '': '문장을 완성해 주세요'} value={word1} onChange={(e) => setWord1(e.target.value)}/>
              <input style={{border: '5px solid rgb(45, 45, 45)', borderRadius: '10px', padding: '5px', margin: '0.5rem', fontSize: '20px'}} type="text" placeholder={word2? '': '문장을 완성해 주세요'} value={word2} onChange={(e) => setWord2(e.target.value)}/>
              <input style={{border: '5px solid rgb(45, 45, 45)', borderRadius: '10px', padding: '5px', margin: '0.5rem', fontSize: '20px'}} type="text" placeholder={word3? '': '문장을 완성해 주세요'} value={word3} onChange={(e) => setWord3(e.target.value)}/>
              <input style={{border: '5px solid rgb(45, 45, 45)', borderRadius: '10px', padding: '5px', margin: '0.5rem', fontSize: '20px'}} type="text" placeholder={word4? '': '문장을 완성해 주세요'} value={word4} onChange={(e) => setWord4(e.target.value)}/>
            </div>
          </div>
          <button className='shadow' style={{width: '150px', alignSelf: 'center', fontWeight: 'bolder', fontSize: '20px', border: 'none', borderRadius: '20px', backgroundColor: 'rgb(255, 215, 3)'}} onClick={reset}>제출</button>
        </div>
      </div>
    )
  }
}

export default Words