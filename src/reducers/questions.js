import { RECEIVE_QUESTIONS, ADD_POLL } from '../actions/questions'
import { USER_VOTE } from '../actions/shared'

const questions = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case USER_VOTE:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: { 
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            }
        case ADD_POLL:
            return {
                ...state,
                [action.question.id]: action.question
            }            
        default:
            return state
    }
}

export default questions