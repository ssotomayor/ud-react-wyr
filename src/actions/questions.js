import { savePoll } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_POLL = 'ADD_POLL'

export const receiveQuestions = (questions) => ({
    type: RECEIVE_QUESTIONS,
    questions
})

export const addQuestion = (question) => ({
    type: ADD_POLL,
    question
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
            dispatch(addQuestion(question))
            dispatch(hideLoading())
        }).catch((e) => {
            console.warn(e)
            alert("There was an error saving the poll. Try again.")
        })
    }
}