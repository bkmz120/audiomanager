import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';
import {connect} from "react-redux";

import MainWrapper from '../MainWrapper';
import {HistoryList} from '../../components/HistoryList';
import {getHistory} from '../../actions/history';

import "./style.css";

class HistoryManager extends Component {

  componentDidMount() {
      this.props.getHistory();
  }

  render() {
    let {historyItems} = this.props;
    return (
      <MainWrapper className="historyManager">
        <HistoryList historyItems={historyItems} />
      </MainWrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      historyItems : state.history.historyItems
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHistory : () => dispatch(getHistory()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HistoryManager);