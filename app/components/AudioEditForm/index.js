import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom';

import {addTrack, initEditForm} from "../../actions/audio"

import "./style.css";


var FormUpload = React.createClass({
    uploadFile: function (e) {
        var fd = new FormData();
        fd.append('file', this.refs.file.getDOMNode().files[0]);

        $.ajax({
            url: 'http://localhost:51218/api/Values/UploadFile',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                alert(data);
            }
        });
        e.preventDefault()
    },
    render: function() {
        return (
            <div>
               <form ref="uploadForm" className="uploader" encType="multipart/form-data" >
                   <input ref="file" type="file" name="file" className="upload-file"/>
                   <input type="button" ref="button" value="Upload" onClick={this.uploadFile} />
               </form>
            </div>
        );
    }
});

class AudioEditForm extends Component {

  state = {
    title:"",
    artist:"",
    description:""
  }

  handleChange = (name) => event => {
    this.setState({
        [name]: event.target.value
    });
  };

  render() {

    if (this.props.toTracksList) {
      this.props.initEditForm();
      return <Redirect to="/audio" />
    }

    let processAnimation;
    if (this.props.addTrackPocess) {
      processAnimation = <CircularProgress className="AudioEditForm__progress" />
    }

    return (
      <div className="AudioEditForm">
        <form noValidate autoComplete="off" className="AudioEditForm__form">
            <div>
              <TextField
                id="title"
                label="Title"
                margin="normal"
                value={this.state.title}
                onChange={this.handleChange('title')}
              />
            </div>
            <div>
              <TextField
                id="artist"
                label="Artist"
                margin="normal"
                value={this.state.artist}
                onChange={this.handleChange('artist')}
              />
            </div>
            <div>
              <TextField
                id="description"
                label="Description"
                margin="normal"
                value={this.state.description}
                onChange={this.handleChange('description')}
              />
            </div>

            <Button
              variant="contained"
              color="primary"
              className="AudioEditForm__addBtn"
              onClick={() => {this.props.addTrack(this.state); } }
            >
              Save
            </Button>
            {processAnimation}

            <FormUpload></FormUpload>
          </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    addTrackPocess:state.audio.addTrackPocess,
    toTracksList:state.audio.toTracksList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTrack : (track) => dispatch(addTrack(track)),
    initEditForm: () => dispatch(initEditForm()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AudioEditForm);


