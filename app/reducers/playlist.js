import * as constants from "../constants/playlist"

const initialState = {
  playlists:[],
  getPlaylistsProcess:false,
}

export default function update(state = initialState, action) {
  switch(action.type) {
    case constants.GET_PLAYLISTS:
      return {...state, getPlaylistsProcess:true}
    case constants.GET_PLAYLISTS_SUCCESS:
      return {...state, getPlaylistsProcess:false, playlists:action.payload.playlists}
    default:
      return state;
  }
}