import { getInitialData, saveQuestionAnswer } from "../utils/api"
import { receiveQuestions } from './questions'
import { receiveUsers } from "./users"
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from "react-redux-loading"
export const USER_VOTE = 'USER_VOTE'

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