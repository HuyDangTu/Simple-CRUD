import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    STORE_REGISTER_INFO,
    GET_ALL_USERS,
    GET_USER,
    UPDATE_IMG,
    UPDATE_PRO,
} from '../actions/types';

export default function(state={},action){
    switch(action.type){
        case LOGIN_USER: {
            return {...state, loginSuccess: action.payload}
        }
        case REGISTER_USER: {
            return { ...state, registerSuccess: action.payload }
        }
        case AUTH_USER: {
            return {...state,userData: action.payload}
        } 
        case LOGOUT_USER: {
            return { ...state}
        } 
        case ADD_TO_CART: {
            return { ...state,
                userData:{
                    ...state.userData,
                    cart: action.payload
            }}
        } 
        case STORE_REGISTER_INFO: {
            return {
                ...state,
                RegisterInfo: {
                    ... action.payload
                }
            }
        } 
        case GET_ALL_USERS:{
            return {
                ...state,
                accounts: action.payload
            }
        }
        case GET_USER:{
            return{
                ...state,
                userProfile: action.payload
            }
        }
        case UPDATE_IMG:
            {
                return{
                    ...state,
                    img: action.payload
                }
            }
        case UPDATE_PRO:
            {
                return{
                    ...state,
                    userProfile: action.payload
                }
            }
        default: return state;
    }
}