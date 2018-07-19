import React, { Component } from 'react';

import PlaylistItem from 'Pages/playlist/components/PlaylistItem';
import "./style.scss";

export default class PlaylistList extends Component {
  render() {
    let processOverlay;
    if (this.props.getTracksProcess) {
      processOverlay = <div className="playlistList__processOverlay"></div>;
    }

    return (
      <div className="playlistList">
        {this.props.playlists.map((playlist, i) => {
          return (
            <PlaylistItem
              key={playlist.id}
              playlist={playlist}
              deletePlaylist={this.props.deletePlaylist}
              setCurrent={this.props.setCurrent}
            />
          )
        })}
        {processOverlay}
      </div>
    );
  }
}
