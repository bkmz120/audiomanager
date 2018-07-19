import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';
import {connect} from "react-redux";

import Layout from 'Common/components/Layout';
import HistoryList from 'Pages/history/components/HistoryList';
import {getHistory,clearHistory} from 'Actions/history';

import "./style.scss";

class HistoryManager extends Component {

  componentDidMount() {
      this.props.getHistory();
  }

  render() {
    let {historyItems} = this.props;
    return (
      <Layout>
        <div className="historyManager">
          <div className="historyManager__btns">
            <Button
              variant="contained"
              color="primary"
              className="historyManager__clearBtn"
              onClick={() => {this.props.clearHistory() } }
            >
              Purge history
            </Button>

            <Button
              variant="contained"
              color="primary"
              className="historyManager__csvBtn"
              target="_blank"
              href="/api/logs/csv"
            >Download CSV</Button>
          </div>
          <HistoryList historyItems={historyItems} />
        </div>
      </Layout>
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
    clearHistory : () => dispatch(clearHistory()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HistoryManager);