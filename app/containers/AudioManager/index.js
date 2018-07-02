import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';
import {connect} from "react-redux";

import MainWrapper from '../MainWrapper';
import {AudioList} from '../../components/AudioList';
import {getTracks, deleteTrack} from '../../actions/audio';

import "./style.css";

class AudioManager extends Component {

  componentDidMount() {
      this.props.getTracks();
  }

  render() {
    let {tracks} = this.props;

    return (
      <MainWrapper className="audioManager">
        <div className="audioManager__list">
          <AudioList tracks={tracks} deleteTrack={this.props.deleteTrack}></AudioList>
        </div>
        <Button variant="contained" component={Link} to="/audio/new" color="primary" className="audioManager__addBtn">
          <Icon>add</Icon>Add track
        </Button>

      </MainWrapper>
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