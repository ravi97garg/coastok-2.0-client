import React from 'react';
import SideBarComponent from "../../components/SideBarComponent";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {loginUserFailed, loginUserSuccess, logoutUser} from "../../actions/user";
import {connect} from "react-redux";
import {createAreaFailed, createAreaStarted, createAreaSuccess} from "../../actions/area";

class CreateArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [{
        userId: '123',
        name: 'Jaya Vaman Dev Das'
      }, {
        userId: '456',
        name: 'Shachi Suta Sevak Das'
      }, {
        userId: '356',
        name: 'Deepak Vehnival'
      }, {
        userId: '453',
        name: 'Ravi Garg'
      }],
      payload: {},
      errors: [],
    };
  }

  componentDidMount() {
    //get All the Directors
    //get All Users

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.state);
  }

  handleDataUpdate = (event, field, value) => {
    console.log('hi', event, field, value);
    if (event) {
      event.persist();
      this.setState((state) => ({
        payload: {
          ...state.payload,
          [event.target.name]: event.target.value,
        }
      }));
    } else {
      this.setState((state) => ({
        payload: {
          ...state.payload,
          [field]: value,
        }
      }));
    }
  }

  handleSubmit = () => {
    const {
      createAreaStarted,
      createAreaSuccess,
      createAreaFailed,
    } = this.props;
    console.log(this.state.payload);
    if(this.state.payload
      && this.state.payload.areaName
      && this.state.payload.areaLeader
      && this.state.payload.asstDirector
      && this.state.payload.facilitators
    ){
      console.log(this.state.payload);
      createAreaStarted();
      createAreaSuccess(this.state.payload);
    } else {
      // validate for errors
    }
  }

  render() {
    return (
      <div className="container-fluid page-body-wrapper">
        {/*partial:partials/_sidebar.html*/}
        <SideBarComponent/>
        {/*partial*/}
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Create Area</h4>
                    <p className="card-description">
                      Only Admin can create it
                    </p>
                    <div className="forms-sample">
                      <div className="form-group">
                      <FormControl style={{minWidth: '100%'}}>
                        <TextField
                          required
                          label="Area Name"
                          variant="outlined"
                          onChange={(e) => this.handleDataUpdate(undefined, 'areaName', e.target.value)}
                        />
                      </FormControl>
                      </div>
                      <div className="form-group">
                        <FormControl style={{minWidth: '100%'}} variant="outlined" >
                          <Autocomplete
                            onChange={(e, newValue) => {this.handleDataUpdate(undefined, 'areaLeader', newValue)}}
                            options={this.state.users}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField required {...params} label="Area Leader" variant="outlined" />}
                          />
                        </FormControl>
                      </div>
                      <div className="form-group">
                        <FormControl style={{minWidth: '100%'}} variant="outlined" >
                          <Autocomplete
                            onChange={(e, newValue) => {this.handleDataUpdate(undefined, 'asstDirector', newValue)}}
                            options={this.state.users}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField required {...params} label="Assistant Director" variant="outlined" />}
                          />
                        </FormControl>
                      </div>
                      <div className="form-group">
                        <FormControl style={{minWidth: '100%'}} variant="outlined" >
                          <Autocomplete
                            multiple
                            limitTags={2}
                            options={this.state.users}
                            onChange={(e, newValue) => {this.handleDataUpdate(undefined, 'facilitators', newValue)}}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField required {...params} label="Facilitators" variant="outlined" />}
                          />
                        </FormControl>
                      </div>
                      <button onClick={this.handleSubmit} type="submit" className="btn btn-primary mr-2">Submit</button>
                      {/*<button className="btn btn-light">Cancel</button>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer,
  area: state.areaReducer,
});

const mapDispatchToProps = {
  createAreaStarted,
  createAreaSuccess,
  createAreaFailed,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArea);