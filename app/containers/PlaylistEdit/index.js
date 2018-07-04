import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import {Link } from 'react-router-dom';
import {connect} from "react-redux";

import MainWrapper from '../MainWrapper';
import {TrackList} from '../../components/TrackList';
import {openPlaylistEdit} from '../../actions/playlist';
import {getTracks} from '../../actions/audio';
import "./style.css";

class PlaylistEdit extends Component {
  componentDidMount() {
    if (this.props.match.params.id !== undefined) {
      this.props.openPlaylistEdit(this.props.match.params.id);
    }
    this.props.getTracks();
  }

  componentWillUnmount() {

  }

  handleChange = (name) => event => {
    // this.props.changeEditForm(name,event.target.value)
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

    return (
      <MainWrapper>
        <div className="playlistEdit">
          <Button className="playlistEdit__backBtn" component={Link} to="/playlist" ><Icon>arrow_back_ios</Icon> Back to list</Button>

          <div className="playlistEdit__inputs">
            <TextField
              id="title"
              label="Title"
              required
              margin="normal"
              value={this.props.playlistEditable.title}
              onChange={this.handleChange('title')}
            />
          </div>

          <div className="playlistEdit__lists">
            <div className="playlistEdit__playlistTracks">
              <div className="playlistEdit__listTitle">Playlist tracks</div>
              <TrackList
                tracks={this.props.playlistEditable.tracks}
                btns={playlistTrackListBtns}
                draggable={true}
              >
              </TrackList>
            </div>

            <div className="playlistEdit__allTracks">
              <div className="playlistEdit__listTitle">All tracks</div>
              <TrackList
                tracks={this.props.allTracks}
                btns={allTrackListBtns}
                draggable={false}
              >
              </TrackList>
            </div>
          </div>
        </div>
      </MainWrapper>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
    return {
        allTracks : state.audio.tracks,
        playlistEditable: state.playlist.playlistEditable,
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
      getTracks : () => dispatch(getTracks()),
      openPlaylistEdit: (playlistId) => dispatch(openPlaylistEdit(playlistId)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlaylistEdit);