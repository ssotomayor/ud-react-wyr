import { RECEIVE_QUESTIONS } from './actionTypes'

export const receiveQuestions = (questions) => ({
    type: RECEIVE_QUESTIONS,
    questions
})