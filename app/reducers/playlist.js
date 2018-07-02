import * as constants from "../constants/playlist"

const initialState = {
  playlists:[
    {
      id:1,
      name:"playlist1",
    },
    {
      id:2,
      name:"playlist2",
    },
  ],
  getPlaylistsProcess:false,
}

export default function update(state = initialState, action) {
  switch(action.type) {

    default:
      return state;
  }
}