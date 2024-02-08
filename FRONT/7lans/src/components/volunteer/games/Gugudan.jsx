import React, {useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {gameChange} from '../../../store/isPlayGameNow';
import GugudanSetup from "./GugudanSetup";
import QuizResult from "./QuizResult.jsx";
import GugudanPrompt from "./GugudanPrompt.jsx";

const Gugudan = () => {
  const [currDan, setCurrDan] = useState();  // 선택된 현재 단
  const [multipleNum, setMultipleNum] = useState()  // 현재 배수
  const [submittedAns, setSubmittedAns] = useState()  // 제출된 답
  const [isCorrect, setIsCorrect] = useState()    //  정답 여부
  const [isGugudanStarted, setIsGugudanStarted] = useState(false);  // 구구단 게임 시작 여부

  const inputRef = useRef(null)

  const dispatch = useDispatch()


  /**
   * 주어진 단에 대한 구구단 게임을 시작합니다.
   * @function
   * @param {number} dan - 구구단 게임을 시작할 단의 수
   */
  const startGame = (dan) => {
    setIsGugudanStarted(true)
    setCurrDan(dan);
    setMultipleNum(1)
    dispatch(gameChange(false))
  }


  /**
   * 구구단 게임을 초기 상태로 리셋합니다.
   * @function
   */
  const resetGame = () => {
    setIsGugudanStarted(false)
    setCurrDan(undefined)
    setIsCorrect(undefined)
    dispatch(gameChange(true))
  }


  /**
   * useEffect hook을 사용하여 게임의 상태에 따른 동작을 핸들링합니다.
   * 구구단 문제의 답을 모두 맞혔을 때 게임을 리셋하고,
   * 틀린 답을 제출했을 경우 다시 풀 수 있도록 합니다.
   * @function
   */
  useEffect(() => {
    let gameHandleTimeout;
    if (multipleNum === 10) {  // 구구단을 모두 풀었을 경우 게임을 리셋
      gameHandleTimeout = setTimeout(() => {
        resetGame()
      }, 500);
    } else if (isCorrect !== undefined) {  // 오답을 제출했을 경우 다시 풀도록 돌아가기
      gameHandleTimeout = setTimeout(() => {
        setIsCorrect(undefined)
      }, 500);
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
    return () => clearTimeout(gameHandleTimeout);
  }, [multipleNum, isCorrect])


  /**
   * "Enter" 키 입력을 처리합니다.
   * 제출된 답을 검증하고, 정답일 경우 다음 문제로 넘어가며,
   * 오답일 경우 오답을 핸들링합니다.
   * @function
   * @param {object} e - 이벤트 객체
   */
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (currDan * multipleNum === submittedAns) {
        setIsCorrect(true);
        setMultipleNum(multipleNum + 1);
      } else {
        setIsCorrect(false);
      }

      setSubmittedAns(undefined);
    }
  }

  // 구구단 문제 출제되는 것
  const renderGugudanGame = () => {
    if (currDan !== undefined && isCorrect === undefined) {
      return (
        <GugudanPrompt
          currDan={currDan}
          multipleNum={multipleNum}
          inputRef={inputRef}
          handleEnter={handleEnter}
          setSubmittedAns={setSubmittedAns}
          submittedAns={submittedAns}
          resetGame={resetGame}
        />
      )
    }
    return (
      <QuizResult
        ansCorrect={isCorrect}
        ans
      />
    )


  }

  const renderGugudan = () => {
    if (isGugudanStarted === false) {
      return (
        <GugudanSetup
          currDan={currDan}
          setCurrDan={setCurrDan}
          onClickStart={() => startGame(currDan)}
        />
      )
    }
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '0'}}>
        {renderGugudanGame(isGugudanStarted)}
      </div>
    )

  }

  return (
    renderGugudan()
  );
};

export default Gugudan;
