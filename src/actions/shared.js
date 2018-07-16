import { getInitialData, saveQuestionAnswer } from "../utils/api"
import { receiveQuestions } from './questions'
import { receiveUsers } from "./users"
import { setAuthedUser } from './authedUser'
import { savePoll } from '../utils/api'
import { showLoading, hideLoading } from "react-redux-loading"
import { USER_VOTE, ADD_POLL} from './actionTypes'

export function handleInitialData(){
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData().then(({questions, users}) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(setAuthedUser(null))
            dispatch(hideLoading())
        })
    }
}

const answer = ({authedUser, answer, qid}) => ({
    type: USER_VOTE,
    answer,
    authedUser,
    qid
})

export function handleUserAnswer(answerData){
    return (dispatch) => {
        dispatch(answer(answerData))
        return saveQuestionAnswer(answerData).catch((e) => {
            console.warn('handleAnswer error: ', e)
            dispatch(answer(answerData))
            alert('There was an error voting for this option. Try again.')            
        })
    }
}

export const addQuestion = (question, authedUser) => ({
    type: ADD_POLL,
    question,
    authedUser
})

export const handleAddQuestion = ({optionOneText, optionTwoText}) => {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return savePoll({
            optionOneText,
            optionTwoText,
            author: authedUser
        }).then((question) => {
            dispatch(addQuestion(question, authedUser))
            dispatch(hideLoading())
        }).catch((e) => {
            console.warn(e)
            alert("There was an error saving the poll. Try again.")
        })
    }
}