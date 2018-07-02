import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';
import MainWrapper from '../MainWrapper';
import TrackEditForm from '../../components/TrackEditForm';

import "./style.css";

export class AudioEdit extends Component {
  render() {

    return (
      <MainWrapper>
        <div className="audioEdit">
          <Button className="audioEdit__backBtn" component={Link} to="/audio" ><Icon>arrow_back_ios</Icon> Back to list</Button>
          <div className="audioEdit__form">
            <TrackEditForm trackId = {this.props.match.params.id} ></TrackEditForm>
          </div>
        </div>
      </MainWrapper>
    );
  }

}