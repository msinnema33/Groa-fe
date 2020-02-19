import constants from '../constants'

const initialState = {
    isPostingUser: false, 
    isPostingUserError: null, 
    USER_ID: "", 

}

export const backendUserReducer = (state=initialState, {type, payload}) =>  { 
    switch(type){
        case constants.USER_LOGIN: 
            return {
                ...state, 
                USER_ID: payload
            }
        default: 
            return state
    }
}