import * as constants from "../constants/playlist"

const initialState = {
  playlists:[],
  playlistEditable:{
    title:"",
    tracks:[],
    tracks_order:[],
  },
  getPlaylistsProcess:false,
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
    default:
      return state;
  }
}