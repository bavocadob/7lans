import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import PropTypes from "prop-types";
import {Session} from "openvidu-browser";
import {gameChange} from '../../../store/isPlayGameNow'
import WordsInput from "./WordsInput";
import WordsForm from "./WordsForm";

const Words = ({session}) => {
  // const [nowWord, setNowWord] = useState('')
  // const word = useSelector((state) => state.words.value)

  const [currentInputWord, setCurrentInputWord] = useState("")
  const [submittedWord, setSubmittedWord] = useState("")

  const dispatch = useDispatch()

  const [word1, setWord1] = useState('')
  const [word2, setWord2] = useState('')
  const [word3, setWord3] = useState('')
  const [word4, setWord4] = useState('')


  useEffect(() => {
    if (submittedWord !== '') {
      dispatch(gameChange(false))
    } else {
      dispatch(gameChange(true))
    }
  }, [submittedWord])


  // 세션 관련 메소드들

  // 시그널 송신 메소드
  // 문제 만들기 송신 메소드
  // const submitWord = (() => {
  //   if (currentInputWord && currentInputWord.trim().length > 0) {
  //     const inputWord = currentInputWord.trim();
  //     setCurrentInputWord('');
  //
  //     session.signal({
  //       type: 'submitWord', data: inputWord,
  //     })
  //       .then(() => console.log(`단어 제시 : ${inputWord}`))
  //       .catch(err => console.log(err))
  //   } else {
  //     window.alert('입력 없음')
  //   }
  // })


  // 시그널 수신 메소드
  // 문제 변경 설정 수신
  // const changeProblem = (submittedData) => {
  //   setProblem(submittedData.problem);
  //   setAns(submittedData.answer);
  //   // dispatch(addProblem(giveProblem));
  //   dispatch(gameChange(false));
  // }

  // const receiveWord = ((event) => {
  //   const inputWord = event.data;
  //   setSubmittedWord(inputWord);
  // })
  //
  //
  // useEffect(() => {
  //   session.on('signal:submitWord', receiveWord);
  //
  //   return () => {
  //     session.off('signal:submitWord', receiveWord);
  //   }
  // }, [session]);


  const reset = () => {
    setSubmittedWord('')
    setCurrentInputWord('')
    setWord1('')
    setWord2('')
    setWord3('')
    setWord4('')
  }


  if (submittedWord === '') {
    return (
      <WordsInput
        currentInputWord={currentInputWord}
        setCurrentInputWord={setCurrentInputWord}
        submitWord={submitWord}
      />
    )
  } else {
    return (
      <WordsForm
        submittedWord={submittedWord}
        setWord1={setWord1}
        setWord2={setWord2}
        setWord3={setWord3}
        setWord4={setWord4}
        word1={word1}
        word2={word2}
        word3={word3}
        word4={word4}
        reset={reset}
      />
    )
  }
}

Words.propTypes = {
  session: PropTypes.instanceOf(Session).isRequired, // session이 Session의 인스턴스인지 확인
};

export default Words