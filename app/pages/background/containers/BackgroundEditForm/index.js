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
  uploadBackground,
  saveBackground,
  initEditForm,
  openBackgroundEdit
} from "Actions/background"
import "./style.scss";


class BackgroundEditForm extends Component {

  constructor(props) {
    super(props);

    if (this.props.backgroundId === undefined) {
      this.state = { newBackground: true };
    }
    else {
      this.state = { newBackground: false };
    }
  }

  componentDidMount() {
    if (this.props.backgroundId !== undefined) {
      this.props.openBackgroundEdit(this.props.backgroundId);
    }
  }

  componentWillUnmount() {
    this.props.initEditForm();
  }

  handleChange = (name) => event => {
    this.props.changeEditForm(name,event.target.value)
  };

  render() {
    console.log(this.props);
    if (this.props.toBackgroundsList) {
      return <Redirect to="/background" />
    }

    let addBackgroundPocessAnimation;
    if (this.props.addBackgroundPocess) {
      addBackgroundPocessAnimation = <CircularProgress className="backgroundEditForm__saveProgress" />
    }

    let fileName;
    if (typeof this.props.backgroundEditForm.fileName === 'string' && this.props.backgroundEditForm.fileName.length>0) {
      fileName = this.props.backgroundEditForm.fileName;
    }
    else {
      fileName = "Choose background file* :";
    }


    let uploadProgressAnimation;
    if (this.props.uploadBackgroundProgress) {
      uploadProgressAnimation = <CircularProgress className="backgroundEditForm__uploadProgress" />;
    }

    return (
      <div className="backgroundEditForm">
        <div className="backgroundEditForm__fileLine">
          <div className={"backgroundEditForm__trackFileName " + (!this.props.backgroundEditFormValid && !this.props.backgroundEditFormValidProps.fileName ? 'backgroundEditForm__trackFileName_error' : '')}>
            {fileName}
          </div>
          <FileUpload upload={this.props.uploadBackground}></FileUpload>
          {uploadProgressAnimation}
          <div className="backgroundEditForm__fileError">{this.props.backgroundFileErrorMessage}</div>
        </div>
        <form noValidate autoComplete="off" className="backgroundEditForm__form">
            <div>

              <TextField
                error={(!this.props.backgroundEditFormValid && !this.props.backgroundEditFormValidProps.title ? true : undefined)}
                id="title"
                label="Title"
                required
                margin="normal"
                value={this.props.backgroundEditForm.title}
                onChange={this.handleChange('title')}
              />
            </div>

            <div className="backgroundEditForm__saveLine">
              <Button
                variant="contained"
                color="primary"
                className="backgroundEditForm__addBtn"
                onClick={() => {this.props.saveBackground(this.state.newBackground) } }
              >
                Save
              </Button>
              {addBackgroundPocessAnimation}
            </div>
          </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    backgrounds:state.background.backgrounds,
    addBackgroundPocess:state.background.addBackgroundPocess,
    toBackgroundsList:state.background.toBackgroundsList,
    backgroundEditForm:state.background.backgroundEditForm,
    backgroundEditFormValidProps:state.background.backgroundEditFormValidProps,
    backgroundEditFormValid:state.background.backgroundEditFormValid,
    backgroundFileErrorMessage:state.background.backgroundFileErrorMessage,
    uploadBackgroundProgress:state.background.uploadBackgroundProgress,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveBackground : (newBackground) => dispatch(saveBackground(newBackground)),
    initEditForm: () => dispatch(initEditForm()),
    changeEditForm: (key, value) => dispatch(changeEditForm(key,value)),
    uploadBackground: (file) => dispatch(uploadBackground(file)),
    openBackgroundEdit: (background) => dispatch(openBackgroundEdit(background)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BackgroundEditForm);


