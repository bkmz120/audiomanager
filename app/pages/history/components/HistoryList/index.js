import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import "./style.scss";

export default class HistoryList extends Component {
  render() {
    let {historyItems} = this.props;

    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Playlist</TableCell>
              <TableCell>Track</TableCell>
              <TableCell>Background</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyItems.map((item, i) => {
              return (
                <TableRow key={item.id}>
                  {item.log.map((field,i) => {
                    return <TableCell key={i}>{field}</TableCell>
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>


      </Paper>
    );
  }
}