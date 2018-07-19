import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom';

import FileUpload from "Common/components/FileUpload";
import {
  changeEditForm,
  uploadTrack,
  saveTrack,
  initEditForm,
  openTrackEdit
} from "Actions/audio"
import "./style.scss";


class TrackEditForm extends Component {

  constructor(props) {
    super(props);

    if (this.props.trackId === undefined) {
      this.state = { newTrack: true };
    }
    else {
      this.state = { newTrack: false };
    }

  }

  componentDidMount() {
    if (this.props.trackId !== undefined) {
      this.props.openTrackEdit(this.props.trackId);
    }
  }

  componentWillUnmount() {
    this.props.initEditForm();
  }

  handleChange = (name) => event => {
    this.props.changeEditForm(name,event.target.value)
  };

  render() {

    if (this.props.toTracksList) {
      return <Redirect to="/audio" />
    }

    let addTrackPocessAnimation;
    if (this.props.addTrackPocess) {
      addTrackPocessAnimation = <CircularProgress className="trackEditForm__saveProgress" />
    }

    let fileName;
    if (typeof this.props.trackEditForm.fileName === 'string' && this.props.trackEditForm.fileName.length>0) {
      fileName = this.props.trackEditForm.fileName;
    }
    else {
      fileName = "Choose track file* :";
    }


    let uploadProgressAnimation;
    if (this.props.uploadTrackProgress) {
      uploadProgressAnimation = <CircularProgress className="trackEditForm__uploadProgress" />;
    }

    return (
      <div className="trackEditForm">
        <div className="trackEditForm__fileLine">
          <div className={"trackEditForm__trackFileName " + (!this.props.trackEditFormValid && !this.props.trackEditFormValidProps.fileName ? 'AudioEditForm__trackFileName_error' : '')}>
            {fileName}
          </div>
          <FileUpload upload={this.props.uploadTrack}></FileUpload>
          {uploadProgressAnimation}
        </div>
        <form noValidate autoComplete="off" className="trackEditForm__form">
            <div>

              <TextField
                error={(!this.props.trackEditFormValid && !this.props.trackEditFormValidProps.title ? true : undefined)}
                id="title"
                label="Title"
                required
                margin="normal"
                value={this.props.trackEditForm.title}
                onChange={this.handleChange('title')}
              />
            </div>
            <div>
              <TextField
                id="artist"
                label="Artist"
                margin="normal"
                value={this.props.trackEditForm.artist}
                onChange={this.handleChange('artist')}
              />
            </div>
            <div>
              <TextField
                id="description"
                label="Description"
                multiline
                rows="4"
                margin="normal"
                value={this.props.trackEditForm.description}
                onChange={this.handleChange('description')}
              />
            </div>

            <div className="trackEditForm__saveLine">
              <Button
                variant="contained"
                color="primary"
                className="trackEditForm__addBtn"
                onClick={() => {this.props.saveTrack(this.state.newTrack) } }
              >
                Save
              </Button>
              {addTrackPocessAnimation}
            </div>
          </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tracks:state.audio.tracks,
    addTrackPocess:state.audio.addTrackPocess,
    toTracksList:state.audio.toTracksList,
    trackEditForm:state.audio.trackEditForm,
    trackEditFormValidProps:state.audio.trackEditFormValidProps,
    trackEditFormValid:state.audio.trackEditFormValid,
    uploadTrackProgress:state.audio.uploadTrackProgress,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveTrack : (newTrack) => dispatch(saveTrack(newTrack)),
    initEditForm: () => dispatch(initEditForm()),
    changeEditForm: (key, value) => dispatch(changeEditForm(key,value)),
    uploadTrack: (file) => dispatch(uploadTrack(file)),
    openTrackEdit: (track) => dispatch(openTrackEdit(track)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TrackEditForm);


