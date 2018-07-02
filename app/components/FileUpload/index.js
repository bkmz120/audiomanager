import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

import "./style.css";

export default class FileUpload extends Component {

  openFileDialog = () => {
    this.refs.file.value = "";
    this.refs.file.click();
  }

  uploadFile = () => {
    this.props.upload(this.refs.file.files[0]);
  }

  render() {
    return (
      <div className="fileUpload">
        <Button
          variant="contained"
          className="fileUpload__btn"
          onClick={this.openFileDialog}
        >
          Select file
        </Button>
        <form ref="uploadForm" className="fileUpload__form" encType="multipart/form-data" >
            <input
              ref="file"
              type="file"
              name="file"
              className=""
              onChange={this.uploadFile}
            />
        </form>
      </div>
    )
  }
}