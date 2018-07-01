import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

import "./style.css";

export const AudioEditForm = () => {
  return (
    <div className="AudioEditForm">
      <form noValidate autoComplete="off" className="AudioEditForm__form">
          <div>
            <TextField
              id="title"
              label="Title"
              margin="normal"
            />
          </div>
          <div>
            <TextField
              id="artist"
              label="Artist"
              margin="normal"
            />
          </div>
          <div>
            <TextField
              id="description"
              label="Description"
              margin="normal"
            />
          </div>
        </form>
    </div>
  );
}