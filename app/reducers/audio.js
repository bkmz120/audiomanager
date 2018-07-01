import * as constants from "../constants/audio"

const initialState = {
  tracks:[
    // {
    //   id:0,
    //   title:"track1",
    //   artist:"artist1",
    // },
    // {
    //   id:1,
    //   title:"track2",
    //   artist:"artist2",
    // }
  ],
  getTracksProcess: false,
  addTrackPocess:false,
  toTracksList:false,
}

export default function update(state = initialState, action) {
  switch(action.type) {
    case constants.GET_TRACKS:
      return {...state, getTracksProcess:true}
    case constants.GET_TRACKS_SUCCESS:
      return {...state, getTracksProcess:false, tracks:action.payload.tracks}
    case constants.ADD_TRACK:
      return {...state, tracks:[...state.tracks, action.payload.track] }
    case constants.ADD_TRACK_PROCESS:
      return {...state, addTrackPocess:true}
    case constants.ADD_TRACK_SUCCESS:
      return {...state, addTrackPocess:false, toTracksList:true}
    case constants.INIT_EDIT_FORM:
      return {...state,addTrackPocess:false, toTracksList:false}
    default:
      return state;
  }
}