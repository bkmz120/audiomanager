import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import {Link } from 'react-router-dom';
import {connect} from "react-redux";

import MainWrapper from '../MainWrapper';
import {TrackList} from '../../components/TrackList';
import {
  initPlaylistEdit,
  openPlaylistEdit,
  changePlaylistOrder,
  addTrackToPlaylist,
  deleteTrackFromPlaylist,
  changeFormField,
  savePlaylist
} from '../../actions/playlist';
import {getTracks} from '../../actions/audio';
import "./style.css";

class PlaylistEdit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playlist:{},
    }

    if (this.props.match.params.id !== undefined) {
      this.state.newPlaylist = false;
    }
    else {
      this.state.newPlaylist = true;
    }
  }

  componentDidMount() {
    if (this.props.match.params.id !== undefined) {
      this.props.openPlaylistEdit(this.props.match.params.id);
    }
    this.props.getTracks();

  }

  componentWillUnmount() {
    this.props.initPlaylistEdit();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //using state for storing playlist for prevent changes playlist tracks in props after dragging
    return {
      playlist:{...nextProps.playlistEditable, tracks:nextProps.playlistEditable.tracks.slice()}
    };
  }

  handleChange = (name) => event => {
    // this.props.changeEditForm(name,event.target.value)
    this.props.changeFormField(name,event.target.value);
  };

  render() {
    let allTrackListBtns = {
      addToPlaylist:true,
      edit:false,
      delete:false,
    }

    let playlistTrackListBtns = {
      addToPlaylist:false,
      edit:false,
      delete:true,
    }

    let tracks = [
      {
        id:1,
        title:"track1",
      },
      {
        id:2,
        title:"track2",
      }
    ];

    let saveBtn;
    if (this.props.saveBtnVisible) {
      saveBtn = (
        <Button
          variant="contained"
          color="primary"
          className="playlistEdit__saveBtn"
          onClick={ () => {this.props.savePlaylist(this.state.newPlaylist) } }
        >
          Save
        </Button>
      );   }


    let tracksLists;
    if (this.state.playlist.id !== undefined) {
      tracksLists= (
        <div className="playlistEdit__lists">
          <div className="playlistEdit__playlistTracks">
            <div className="playlistEdit__listTitle">Playlist tracks</div>

            <div className="playlistEdit__listContainer">
              <TrackList
                tracks={this.state.playlist.tracks}
                btns={playlistTrackListBtns}
                draggable={true}
                deleteCallback= {(trackId,idInPlaylist) => {this.props.deleteTrackFromPlaylist(this.state.playlist,idInPlaylist) }}
                orderChangeCallback = { (oldIndex,newIndex) => {this.props.changePlaylistOrder(this.state.playlist,oldIndex,newIndex)} }
              />
            </div>
          </div>

          <div className="playlistEdit__allTracks">
            <div className="playlistEdit__listTitle">All tracks</div>
            <div className="playlistEdit__listContainer">
              <TrackList
                tracks={this.props.allTracks}
                btns={allTrackListBtns}
                draggable={false}
                addToPlaylistCallback = { (track) =>  {this.props.addTrackToPlaylist(this.state.playlist, track)} }
                addToPlaylistBlock = {this.props.addTrackProcess}
              />
            </div>
          </div>
        </div>
      );
    }


    return (
      <MainWrapper>
        <div className="playlistEdit">
          <Button className="playlistEdit__backBtn" component={Link} to="/playlist" ><Icon>arrow_back_ios</Icon> Back to list</Button>

          <div className="playlistEdit__inputs">
            <TextField
              error={(!this.props.playlistEditableValid && !this.props.playlistEditableValidProps.title ? true : undefined)}
              id="title"
              label="Title"
              required
              margin="normal"
              value={this.props.playlistEditable.title}
              onChange={this.handleChange('title')}
            />

            {saveBtn}
          </div>

          {tracksLists}

        </div>
      </MainWrapper>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
    return {
        allTracks : state.audio.tracks,
        playlistEditable: state.playlist.playlistEditable,
        addTrackProcess:state.playlist.addTrackProcess,
        saveBtnVisible: state.playlist.saveBtnVisible,
        playlistEditableValid:state.playlist.playlistEditableValid,
        playlistEditableValidProps:state.playlist.playlistEditableValidProps,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getTracks : () => dispatch(getTracks()),
      initPlaylistEdit: () => dispatch(initPlaylistEdit()),
      openPlaylistEdit: (playlistId) => dispatch(openPlaylistEdit(playlistId)),
      changePlaylistOrder: (playlist,oldIndex,newIndex) => dispatch(changePlaylistOrder(playlist,oldIndex,newIndex)),
      addTrackToPlaylist: (playlist, track) => dispatch(addTrackToPlaylist(playlist, track)),
      deleteTrackFromPlaylist: (playlist, idInPlaylist) => dispatch(deleteTrackFromPlaylist(playlist, idInPlaylist)),
      changeFormField: (key,value) => dispatch(changeFormField(key,value)),
      savePlaylist: (newPlaylist) => dispatch(savePlaylist(newPlaylist)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlaylistEdit);