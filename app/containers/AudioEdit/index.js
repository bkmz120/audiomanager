import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import MainWrapper from '../MainWrapper';
import AudioEditForm from '../../components/AudioEditForm';

import "./style.css";

export class AudioEdit extends Component {
  render() {
    return (
      <MainWrapper className="audioManager">
        <AudioEditForm history={this.props.history}></AudioEditForm>
      </MainWrapper>
    );
  }

}