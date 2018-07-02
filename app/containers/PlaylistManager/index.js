import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';
import MainWrapper from '../MainWrapper';
import {connect} from "react-redux";

import {PlaylistList} from '../../components/PlaylistList';


export class PlaylistManager extends Component {

  componentDidMount() {
    // this.props.getTracks();
  }

  render() {
    let {playlists} = this.props;

    return (
      <MainWrapper className="playlistManager">
        <div className="playlistManager__list">
          <PlaylistList playlists={playlists}></PlaylistList>
        </div>
        <Button variant="contained" component={Link} to="/playlist/new" color="primary" className="playlistManager__addBtn">
          <Icon>add</Icon>Add playlist
        </Button>
      </MainWrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    playlists : state.playlist.playlists
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      getTracks : () => dispatch(getTracks()),
      deleteTrack: (trackId) => dispatch(deleteTrack(trackId)),
  }
}

export default connect(mapStateToProps)(PlaylistManager);