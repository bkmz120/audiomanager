import * as constants from "../constants/playlist"

const initialState = {
  playlists:[],
  playlistEditable:{
    title:"",
    tracks:[],
    tracks_order:[],
  },
  playlistEditableValidProps: {
    title:true,
  },
  playlistEditableValid:true,
  getPlaylistsProcess:false,
  savePlaylistProcess:false,
  addTrackProcess:false,
  saveBtnVisible:false,
}

export default function update(state = initialState, action) {
  switch(action.type) {
    case constants.GET_PLAYLISTS:
      return {...state, getPlaylistsProcess:true}
    case constants.GET_PLAYLISTS_SUCCESS:
      return {...state, getPlaylistsProcess:false, playlists:action.payload.playlists}
    case constants.OPEN_PLAYLIST_EDIT:
      return {
        ...state,
        playlistEditable:action.payload.playlist
      }
    case constants.CHANGE_PLAYLIST_ORDER:
      return {
        ...state,
        playlistEditable:{
          ...state.playlistEditable,
          tracks_order:action.payload.tracks_order
        }
      }
    case constants.ADD_TRACK_TO_PLAYLIST:
      return {
        ...state,
        addTrackProcess:true,
      }
    case constants.ADD_TRACK_TO_PLAYLIST_SUCCESS:
      return {
        ...state,
        addTrackProcess:false,
        playlistEditable:{
          ...state.playlistEditable,
          tracks:[...state.playlistEditable.tracks,action.payload.track],
          tracks_order:action.payload.tracks_order
        }
      }
    case constants.DELETE_TRACK_FROM_PLAYLIST:
      return {
        ...state,
        playlistEditable:{
          ...state.playlistEditable,
          tracks:action.payload.tracks,
          tracks_order:action.payload.tracks_order
        }
      }
    case constants.CHANGE_FORM_FIELD:
      return {
        ...state,
        playlistEditable:{
          ...state.playlistEditable,
          [action.payload.key]:action.payload.value
        },
        saveBtnVisible:true,
      }
    case constants.VALIDATION_ERROR:
      return {
        ...state,
        playlistEditableValidProps:action.payload.validProps,
        playlistEditableValid:false,
      }
    case constants.SAVE_PLAYLIST:
      return {
        ...state,
        savePlaylistProcess:true,
      }
    case constants.SAVE_PLAYLIST_SUCCESS:
      return {
        ...state,
        savePlaylistProcess:false,
        saveBtnVisible:false,
        playlistEditable:{
          ...state.playlistEditable,
          id:action.payload.id,
        },
        playlistEditableValid:true,
        playlistEditableValidProps:{
          title:true,
        }
      }
    case constants.INIT_PLAYLIST_EDIT:
      return {
        ...state,
        playlistEditable:{
          title:"",
          tracks:[],
          tracks_order:[],
        },
        getPlaylistsProcess:false,
        savePlaylistProcess:false,
        saveBtnVisible:false,
        playlistEditableValid:true,
        playlistEditableValidProps:{
          title:true,
        }
      }
    case constants.DELETE_PLAYLIST_SUCCESS:
        return {
          ...state,
          playlists:state.playlists.filter(p => p.id !== action.payload.playlistId)
        }
    default:
      return state;
  }
}