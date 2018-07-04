import axios from "axios";
import * as constants from "../constants/playlist";

export function getPlaylists() {
  return function(dispatch) {
     axios.get('/api/playlists')
      .then(function (response) {
        dispatch({
          type:constants.GET_PLAYLISTS_SUCCESS,
          payload:{
            playlists:response.data
          }
        });
      })
      .catch(function (error) {
         //TODO: add error processing
        console.log(error);
      });
  }
}

export function openPlaylistEdit(playListId) {
  return function(dispatch) {
    axios.get('/api/playlists/' + playListId + '?expand=tracks')
      .then(function (response) {
        let playlist = response.data;

        playlist.tracks.sort(function(a, b){
          return playlist.tracks_order.indexOf(a.id) - playlist.tracks_order.indexOf(b.id);
        });

        dispatch({
          type:constants.OPEN_PLAYLIST_EDIT,
          payload:{playlist:response.data}
        });
      })
      .catch(function (error) {
         //TODO: add error processing
        console.log(error);
      });


  }
}