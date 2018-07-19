import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';
import {connect} from "react-redux";

import Layout from 'Common/components/Layout';
import PlaylistList from 'Pages/playlist/components/PlaylistList';
import {getPlaylists,deletePlaylist, setCurrentPlaylist} from 'Actions/playlist';
import "./style.scss";


export class PlaylistManager extends Component {

  componentDidMount() {
    this.props.getPlaylists();
  }

  render() {
    let {playlists} = this.props;

    return (
      <Layout>
        <div className="playlistManager">
          <div className="playlistManager__list">
            <PlaylistList
              playlists={playlists}
              deletePlaylist={this.props.deletePlaylist}
              setCurrent={this.props.setCurrentPlaylist}
            />
          </div>
          <Button variant="contained" component={Link} to="/playlist/new" color="primary" className="playlistManager__addBtn">
            <Icon>add</Icon>Add playlist
          </Button>
        </div>
      </Layout>
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
      getPlaylists : () => dispatch(getPlaylists()),
      deletePlaylist: (playlistId) => dispatch(deletePlaylist(playlistId)),
      setCurrentPlaylist: (playlistId) => dispatch(setCurrentPlaylist(playlistId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlaylistManager);