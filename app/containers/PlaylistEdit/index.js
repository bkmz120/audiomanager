import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';
import MainWrapper from '../MainWrapper';

import {TrackList} from '../../components/TrackList';
import "./style.css";

export class PlaylistEdit extends Component {
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
          <div className="playlistEdit__lists">
            <div className="playlistEdit__allTracks">
              <div className="playlistEdit__listTitle">All tracks</div>
              <TrackList
                tracks={tracks}
                btns={allTrackListBtns}
                draggable={false}
              >
              </TrackList>
            </div>
            <div className="playlistEdit__playlistTracks">
              <div className="playlistEdit__listTitle">Playlist tracks</div>
              <TrackList
                tracks={tracks}
                btns={playlistTrackListBtns}
                draggable={true}
              >
              </TrackList>
            </div>
          </div>
        </div>
      </MainWrapper>
    );
  }

}