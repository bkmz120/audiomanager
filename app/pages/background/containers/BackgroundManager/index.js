import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';
import {connect} from "react-redux";

import Layout from 'Common/components/Layout';
import BackgroundList from 'Pages/background/components/BackgroundList';
import {
  getBackgrounds,
  deleteBackground,
  checkUseDefault,
  setUseDefault
} from 'Actions/background';

import "./style.scss";

class BackgroundManager extends Component {

  componentDidMount() {
      this.props.getBackgrounds();
      this.props.checkUseDefault();
  }

  render() {
    let {backgrounds} = this.props;
    let usedefault;
    if (this.props.enableUseDefaultCheckbox) {
      usedefault = (
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                color="default"
                checked={this.props.useDefaultBackground}
                onChange={(event) =>{this.props.setUseDefault(event.target.checked)}}
                value="checkedA"
              />
            }
            label="Use default background"
            className="backgroundManager__useDefault-check"
          />
        </FormGroup>
      );
    }
    else {
      usedefault = (
        <div className="backgroundManager__useDefault-message">
          For use option "Use default background" you should set default playlist.
        </div>
      );
    }

    return (
      <Layout className="backgroundManager">
        <div className="backgroundManager__useDefault">
          {usedefault}
        </div>
        <div className="backgroundManager__list">
          <BackgroundList backgrounds={backgrounds} deleteBackground={this.props.deleteBackground}></BackgroundList>
        </div>
        <Button variant="contained" component={Link} to="/background/new" color="primary" className="backgroundManager__addBtn">
          <Icon>add</Icon>Add background
        </Button>

      </Layout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    backgrounds : state.background.backgrounds,
    useDefaultBackground : state.background.useDefaultBackground,
    enableUseDefaultCheckbox : state.background.enableUseDefaultCheckbox,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBackgrounds : () => dispatch(getBackgrounds()),
    deleteBackground: (backgroundId) => dispatch(deleteBackground(backgroundId)),
    checkUseDefault : () => dispatch(checkUseDefault()),
    setUseDefault : (usedefault) => dispatch(setUseDefault(usedefault)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BackgroundManager);