import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWord } from '../../../store/wordsSlice'

const Words = () => {
  const [nowWord, setNowWord] = useState('')
  const word = useSelector((state) => state.words.value)
  const dispatch = useDispatch()


  useEffect(() => {

  }, [nowWord])


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

        <input type="text" placeholder='문장을 만들어 보세요' />
        <input type="text" placeholder='문장을 만들어 보세요' />
        <input type="text" placeholder='문장을 만들어 보세요' />
        <input type="text" placeholder='문장을 만들어 보세요' />
      </div>
    )
  }

  return (
    <div></div>
  )
}

export default Words