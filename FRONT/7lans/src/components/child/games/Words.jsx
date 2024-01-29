import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWord } from '../../../store/wordsSlice'

const Words = () => {
  const [nowWord, setNowWord] = useState('')
  const word = useSelector((state) => state.words.value)
  const dispatch = useDispatch()
  const [word1, setWord1] = useState('')
  const [word2, setWord2] = useState('')
  const [word3, setWord3] = useState('')
  const [word4, setWord4] = useState('')

  const reset = () => {
    dispatch(addWord(''))
    setNowWord('')
  }


  if (word === '') {
    return(
      <div>
        <p>단어를 제시해 주세요</p>
        <input type="text" onChange={(e) => setNowWord(e.target.value)} value={nowWord} />
        <button onClick={() => dispatch(addWord(nowWord))}>제출</button>
      </div>
    )
  }
  else {
    return (
      <div>
        <p>"{word}"을 포함한 문장을 만들어 보아요</p>

        <input type="text" value={word1} readOnly />
        <input type="text" value={word2} readOnly/>
        <input type="text" value={word3} readOnly/>
        <input type="text" value={word4} readOnly/>
        <button onClick={reset}>돌아가기</button>
      </div>
    )
  }
}

export default Words