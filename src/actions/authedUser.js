import { SET_AUTHED_USER } from './actionTypes'

export function setAuthedUser(id){
    return {
        id,
        type: SET_AUTHED_USER
    }
}