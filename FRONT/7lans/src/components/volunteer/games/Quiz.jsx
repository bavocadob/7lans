import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Session} from "openvidu-browser";
import PropTypes from "prop-types";
import {addProblem} from '../../../store/quizSlice'
import {gameChange} from '../../../store/isPlayGameNow'
import QuizResult from "./QuizResult.jsx";
import QuizProblemDisplay from "./QuizProblemDisplay.jsx";
import QuizProblemSetup from "./QuizProblemSetup.jsx";

const Quiz = ({
    session
              }) => {
    const userInfo = useSelector((state) => state.user.value)
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

    useEffect(() => {


    }, [session]);

    const changeProblem = () => {
        if (ans !== '' && nowProblem !== '') {
            const giveProblem = nowProblem;
            setNowProblem('');
            dispatch(addProblem(giveProblem));
            dispatch(gameChange(false));
        }
    }

    if (problem === 'none') {
        return (
            <QuizProblemSetup
                ans={ans}
                setAns={setAns}
                nowProblem={nowProblem}
                setNowProblem={setNowProblem}
                changeProblem={changeProblem}
            />
        );
    } else if (ansCorrect !== '') {
        return (
            <QuizResult
                ansCorrect={ansCorrect}
                ans={ans}
                userInfo={userInfo}
            />
        );
    } else {
        return (
            <QuizProblemDisplay
                setAnsCorrect={setAnsCorrect}
                dispatch={dispatch}
                problem={problem}
                gameChange={gameChange}
            />
        );
    }
}


Quiz.propTypes = {
    session: PropTypes.instanceOf(Session).isRequired, // session이 Session의 인스턴스인지 확인
};
export default Quiz