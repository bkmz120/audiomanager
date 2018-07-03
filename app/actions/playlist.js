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

export function openPlayListEdit(playListId) {
  return function(dispatch) {
    axios.get('/api/playlists')
      .then(function (response) {
        dispatch({
          type:constants.OPEN_PLAYLIST_EDIT,
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