import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';
import {connect} from "react-redux";

import Layout from 'Common/components/Layout';
import TrackList from 'Common/components/TrackList';
import {getTracks, deleteTrack} from 'Actions/audio';

import "./style.scss";

class AudioManager extends Component {

  componentDidMount() {
      this.props.getTracks();
  }

  render() {
    let {tracks} = this.props;
    let trackListBtns = {
      addToPlaylist:false,
      edit:true,
      delete:true,
    }

    return (
      <Layout>
        <div className="audioManager">
          <div className="audioManager__list">
            <TrackList
              tracks={tracks}
              btns={trackListBtns}
              deleteCallback={this.props.deleteTrack}
              draggable={false}
            >
            </TrackList>
          </div>
          <Button variant="contained" component={Link} to="/audio/new" color="primary" className="audioManager__addBtn">
            <Icon>add</Icon>Add track
          </Button>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        tracks : state.audio.tracks
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
      getTracks : () => dispatch(getTracks()),
      deleteTrack: (trackId) => dispatch(deleteTrack(trackId)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AudioManager);