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

export function initPlaylistEdit() {
  return {
    type:constants.INIT_PLAYLIST_EDIT,
  }
}

export function openPlaylistEdit(playListId) {
  return function(dispatch) {
    axios.get('/api/playlists/' + playListId )
      .then(function (response) {
        let playlist = response.data;
        playlist.tracks_order = JSON.parse(playlist.tracks_order);

        playlist.tracks.sort(function(a, b){
         return playlist.tracks_order.indexOf(parseInt(a.idInPlaylist)) - playlist.tracks_order.indexOf(parseInt(b.idInPlaylist));
        });

        dispatch({
          type:constants.OPEN_PLAYLIST_EDIT,
          payload:{playlist:playlist}
        });
      })
      .catch(function (error) {
         //TODO: add error processing
        console.log(error);
      });
  }
}

export function changePlaylistOrder(playlist,oldIndex,newIndex) {
  return function(dispatch) {
    let tracks_order = [...playlist.tracks_order];
    Array.prototype.splice.call(tracks_order, newIndex, 0,
      Array.prototype.splice.call(tracks_order, oldIndex, 1)[0]
    );

    axios.put('/api/playlists/' + playlist.id,{tracks_order:JSON.stringify(tracks_order)})
      .then(function (response) {
        dispatch({
          type:constants.CHANGE_PLAYLIST_ORDER,
          payload:{tracks_order}
        });
      })
      .catch(function (error) {
         //TODO: add error processing
        console.log(error);
      });
  }
}

export function addTrackToPlaylist(playlist,track) {
  return function(dispatch) {
    let newTrack = Object.assign({},track);
    dispatch({
      type:constants.ADD_TRACK_TO_PLAYLIST
    });
    axios.post('/api/playlisttracks',{playlist_id:playlist.id, track_id: newTrack.id})
      .then(function (response) {

        let tracks_order = playlist.tracks_order.slice();
        tracks_order.push(response.data.id);
        newTrack.idInPlaylist = response.data.id;

        axios.put('/api/playlists/' + playlist.id,{tracks_order:JSON.stringify(tracks_order)})
          .then(function (response) {
            dispatch({
              type:constants.ADD_TRACK_TO_PLAYLIST_SUCCESS,
              payload:{track:newTrack,tracks_order}
            });
          })
          .catch(function (error) {
             //TODO: add error processing
            console.log(error);
          });
      })
      .catch(function (error) {
         //TODO: add error processing
        console.log(error);
      });
  }
}

export function deleteTrackFromPlaylist(playlist,idInPlaylist) {
  return function(dispatch) {

    idInPlaylist = parseInt(idInPlaylist);

    axios.delete('/api/playlisttracks/' + idInPlaylist)
      .then(function (response) {
        let indexInOrder = playlist.tracks_order.indexOf(idInPlaylist);
        let tracks_order = playlist.tracks_order.slice(0,indexInOrder).concat(playlist.tracks_order.slice(indexInOrder+1));

        let indexOfTrack;
        for (let i=0;i<playlist.tracks.length;i++) {
          if (parseInt(playlist.tracks[i].idInPlaylist)===idInPlaylist) {
            indexOfTrack = i;
            break;
          }
        }

        let tracks = playlist.tracks.slice(0,indexOfTrack).concat(playlist.tracks.slice(indexOfTrack+1));

        axios.put('/api/playlists/' + playlist.id,{tracks_order:JSON.stringify(tracks_order)})
          .then(function (response) {
            dispatch({
              type:constants.DELETE_TRACK_FROM_PLAYLIST,
              payload:{tracks,tracks_order}
            });
          })
          .catch(function (error) {
             //TODO: add error processing
            console.log(error);
          });
      })
      .catch(function (error) {
         //TODO: add error processing
        console.log(error);
      });
  }
}

export function changeFormField(key,value) {
  return {
    type:constants.CHANGE_FORM_FIELD,
    payload:{key,value}
  }
}

export function savePlaylist(newPlaylist) {
  return function(dispatch,getState) {
    let state = getState();
    let playlist = state.playlist.playlistEditable;

    let valid = true;
    let validProps = {
      title:true,
    }

    if (playlist.title === undefined || playlist.title === "") {
      validProps.title = false;
      valid = false;
    }

    if (!valid) {
      dispatch({
        type:constants.VALIDATION_ERROR,
        payload:{validProps}
      });
    }
    else {
      dispatch({
        type:constants.SAVE_PLAYLIST,
      });

      if (newPlaylist) {
        axios.post('/api/playlists',{...playlist, tracks_order: JSON.stringify(playlist.tracks_order)})
        .then(function (response) {
          if (response.data.id !== undefined) {
            dispatch({
              type:constants.SAVE_PLAYLIST_SUCCESS,
              payload:{
                id:response.data.id,
              }
            });
          }
        })
        .catch(function (error) {
          //TODO: add error processing
          console.log(error);
        });
      }
      else {
        axios.patch('/api/playlists/'+playlist.id,{...playlist, tracks_order: JSON.stringify(playlist.tracks_order)})
        .then(function (response) {
          if (response.data.id !== undefined) {
            dispatch({
              type:constants.SAVE_PLAYLIST_SUCCESS,
              payload:{
                id:response.data.id,
              }
            });
          }
        })
        .catch(function (error) {
          //TODO: add error processing
          console.log(error);
        });
      }
    }
  }
}

export function deletePlaylist(playlistId) {
  return function(dispatch){
    axios.delete('/api/playlists/'+playlistId)
      .then(function (response) {
        dispatch({
          type:constants.DELETE_PLAYLIST_SUCCESS,
          payload:{playlistId}
        });
      })
      .catch(function (error) {
         //TODO: add error processing
        console.log(error);
      })
  }
}

export function setCurrentPlaylist(playlistId) {
  return function(dispatch) {
    axios.put('/api/playlists/'+playlistId,{current:1})
      .then(function (response) {
        dispatch({
          type:constants.SET_CURRENT_PLAYLIST,
          payload:{playlistId}
        });
      })
      .catch(function (error) {
         //TODO: add error processing
        console.log(error);
      })
  }
}