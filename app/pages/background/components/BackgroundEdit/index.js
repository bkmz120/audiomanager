import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';

import Layout from 'Common/components/Layout';
import BackgroundEditForm from 'Pages/background/containers/BackgroundEditForm';

import "./style.scss";

export default class BackgroundEdit extends Component {
  render() {

    return (
      <Layout>
        <div className="backgroundEdit">
          <Button className="backgroundEdit__backBtn" component={Link} to="/background" ><Icon>arrow_back_ios</Icon> Back to list</Button>
          <div className="backgroundEdit__form">
            <BackgroundEditForm backgroundId = {this.props.match.params.id} ></BackgroundEditForm>
          </div>
        </div>
      </Layout>
    );
  }

}