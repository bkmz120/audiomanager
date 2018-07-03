import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';
import {connect} from "react-redux";

import MainWrapper from '../MainWrapper';
import {BackgroundList} from '../../components/BackgroundList';
import {getBackgrounds, deleteBackground} from '../../actions/background';

import "./style.css";

class BackgroundManager extends Component {

  componentDidMount() {
      this.props.getBackgrounds();
  }

  render() {
    let {backgrounds} = this.props;

    return (
      <MainWrapper className="backgroundManager">
        <div className="backgroundManager__list">
          <BackgroundList backgrounds={backgrounds} deleteBackground={this.props.deleteBackground}></BackgroundList>
        </div>
        <Button variant="contained" component={Link} to="/background/new" color="primary" className="backgroundManager__addBtn">
          <Icon>add</Icon>Add background
        </Button>

      </MainWrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        backgrounds : state.background.backgrounds
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
      getBackgrounds : () => dispatch(getBackgrounds()),
      deleteBackground: (backgroundId) => dispatch(deleteBackground(backgroundId)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BackgroundManager);