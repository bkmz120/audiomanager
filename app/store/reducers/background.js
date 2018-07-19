import * as constants from "Constants/background"

const initialState = {
  backgrounds:[],
  backgroundEditForm: {
    title:"",
    fileName:"",
  },
  backgroundEditFormValidProps: {
    title:true,
    fileName:true,
  },
  useDefaultBackground:false,
  enableUseDefaultCheckbox:false,
  backgroundEditFormValid:true,
  getBackgroundsProcess: false,
  uploadBackgroundProgress:false,
  backgroundFileErrorMessage:"",
  addBackgroundPocess:false,
  toBackgroundsList:false,
}

export default function update(state = initialState, action) {
  switch(action.type) {
    case constants.GET_BACKGROUNDS:
      return {...state, getBackgroundsProcess:true}
    case constants.GET_BACKGROUNDS_SUCCESS:
      return {...state, getBackgroundsProcess:false, backgrounds:action.payload.backgrounds}
    case constants.UPLOAD_BACKGROUND:
      return {
        ...state,
        uploadBackgroundProgress:true,
        backgroundEditFormValidProps: {
          ...state.backgroundEditFormValidProps,
          fileName:true,
        },
        backgroundFileErrorMessage:'',
      }
    case constants.UPLOAD_BACKGROUND_SUCCESS:
      return {
        ...state,
        uploadBackgroundProgress:false,
        backgroundEditForm: {
          ...state.backgroundEditForm,
          fileName:action.payload.fileName
        },
        backgroundFileErrorMessage:'',
      }
    case constants.UPLOAD_BACKGROUND_ERROR:
      return {
        ...state,
        uploadBackgroundProgress:false,
        backgroundFileErrorMessage:action.payload.message,
        backgroundEditForm: {
          ...state.backgroundEditForm,
          fileName:"",
        },
      }
    case constants.CHANGE_FORM_FIELD:
      return {
        ...state,
        backgroundEditForm:{
          ...state.backgroundEditForm,
          [action.payload.key]:action.payload.value
        }
      }
    case constants.SAVE_BACKGROUND:
      return {...state, addBackgroundPocess:true}
    case constants.SAVE_BACKGROUND_SUCCESS:
      return {
        ...state,
        addBackgroundPocess:false,
        toBackgroundsList:true,
        backgroundEditFormValidProps:{},
        backgroundEditFormValid:true,

      }
    case constants.VALIDATION_ERROR:
      return {
        ...state,
        backgroundEditFormValidProps:action.payload.backgroundEditFormValidProps,
        backgroundEditFormValid:false,
      }
    case constants.INIT_EDIT_FORM:
      return {
        ...state,
        addBackgroundPocess:false,
        toBackgroundsList:false,
        backgroundEditForm:{
          title:"",
          fileName:"",
        },
        backgroundEditFormValidProps:{},
        backgroundEditFormValid:true,
      }
    case constants.OPEN_BACKGROUND_EDIT:
      return {
        ...state,
        backgroundEditForm:action.payload.background
      }
    case constants.DELETE_BACKGROUND:
      return {
        ...state,
        backgrounds:state.backgrounds.filter(t => t.id !== action.payload.backgroundId)
      }
    case constants.CHANGE_USE_DEFAULT:
      return {
        ...state,
        useDefaultBackground:action.payload.useDefaultBackground,
        enableUseDefaultCheckbox:action.payload.enableUseDefaultCheckbox,
      }
    default:
      return state;
  }
}