import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';
import Layout from 'Common/components/Layout';
import TrackEditForm from 'Pages/audio/containers/TrackEditForm';

import "./style.scss";

export default class AudioEdit extends Component {
  render() {

    return (
      <Layout>
        <div className="audioEdit">
          <Button className="audioEdit__backBtn" component={Link} to="/audio" ><Icon>arrow_back_ios</Icon> Back to list</Button>
          <div className="audioEdit__form">
            <TrackEditForm trackId = {this.props.match.params.id} ></TrackEditForm>
          </div>
        </div>
      </Layout>
    );
  }

}