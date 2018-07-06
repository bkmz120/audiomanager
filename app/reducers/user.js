import * as constants from "../constants/user"

const initialState = {
  isAuthenticated:(localStorage.getItem('isAuthenticated') === 'true' ? true : false),
  loginForm:{
    username:"",
    password:"",
  },
  loginFormValidProps:{
    username:true,
    password:true,
  },
  loginFormValid:true,
  errorMessage:"",
  redirectToReferrer: false,
}

export default function update(state = initialState, action) {
  switch(action.type) {
    case constants.CHANGE_FORM_FIELD:
      return {
        ...state,
        loginForm:{
          ...state.loginForm,
          [action.payload.key]:action.payload.value
        }
      }
    case constants.VALIDATION_ERROR:
      return {
        ...state,
        loginFormValidProps:action.payload.validProps,
        loginFormValid:false,
      }
    case constants.LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated:action.payload.status,
          errorMessage:action.payload.message,
          redirectToReferrer:true,
        }
    case constants.LOGOUT:
        return {
          ...state,
          isAuthenticated:false,
        }
    case constants.INIT_FORM:
      return {
        ...state,
        redirectToReferrer:false,
        loginForm:Object.assign({},initialState.loginForm),
        loginFormValidProps:Object.assign({},initialState.loginFormValidProps),
        loginFormValid:true,
        errorMessage:"",
      }
    default:
      return state;
  }
}