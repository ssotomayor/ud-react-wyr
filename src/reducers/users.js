import { USER_VOTE, ADD_POLL, RECEIVE_USERS } from "../actions/actionTypes"

const users = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case USER_VOTE:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    },
                    
                }
            }
        case ADD_POLL:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    questions: state[action.authedUser].questions.concat(action.question.id)
                }
            }            
        default:
            return state
    }
}

export default users