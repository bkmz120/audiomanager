import * as constants from "../constants/audio"

const initialState = {
  tracks:[],
  trackEditForm: {
    title:"",
    artist:"",
    description:"",
    fileName:"",
  },
  trackEditFormValidProps: {
    title:true,
    fileName:true,
  },
  trackEditFormValid:true,
  getTracksProcess: false,
  uploadTrackProgress:false,
  addTrackPocess:false,
  toTracksList:false,
}

export default function update(state = initialState, action) {
  switch(action.type) {
    case constants.GET_TRACKS:
      return {...state, getTracksProcess:true}
    case constants.GET_TRACKS_SUCCESS:
      return {...state, getTracksProcess:false, tracks:action.payload.tracks}
    case constants.UPLOAD_TRACK:
      return {...state, uploadTrackProgress:true}
    case constants.UPLOAD_TRACK_SUCCESS:
      return {
        ...state,
        uploadTrackProgress:false,
        trackEditForm: {
          ...state.trackEditForm,
          fileName:action.payload.fileName
        }
      }
    case constants.CHANGE_FORM_FIELD:
      return {
        ...state,
        trackEditForm:{
          ...state.trackEditForm,
          [action.payload.key]:action.payload.value
        }
      }
    case constants.ADD_TRACK:
      return {...state, addTrackPocess:true}
    case constants.ADD_TRACK_SUCCESS:
      return {
        ...state,
        addTrackPocess:false,
        toTracksList:true,
        trackEditFormValidProps:{},
        trackEditFormValid:true,
      }
    case constants.VALIDATION_ERROR:
      return {
        ...state,
        trackEditFormValidProps:action.payload.trackEditFormValidProps,
        trackEditFormValid:false,
      }
    case constants.INIT_EDIT_FORM:
      return {
        ...state,
        addTrackPocess:false,
        toTracksList:false,
        trackEditForm:{
          title:"",
          artist:"",
          description:"",
        },
        trackEditFormValidProps:{},
        trackEditFormValid:true,
      }
    case constants.OPEN_TRACK_EDIT:
      return {
        ...state,
        trackEditForm:action.payload.track
      }
    default:
      return state;
  }
}