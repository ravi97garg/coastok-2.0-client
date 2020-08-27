import React from 'react';
import SideBarComponent from "../../components/SideBarComponent";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {connect} from "react-redux";
import {createAreaFailed, createAreaStarted, createAreaSuccess} from "../../actions/area";
import {USER_CONSTANT} from "../../constants";

class CreateArea extends React.Component {
  constructor(props) {
    super(props);
    this.resetObj = {
      areaName: '',
      areaLeader: '',
      asstDirector: '',
    };
    this.state = {
      users: USER_CONSTANT,
      payload: {
        ...this.resetObj
      },
      errors: [],
    };
  }

  componentDidMount() {
    //get All the Directors
    //get All Users

  }

  handleDataUpdate = (event, field, value) => {
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
    if (this.state.payload
      && this.state.payload.areaName
    ) {
      createAreaStarted();
      createAreaSuccess(this.state.payload);
      this.setState({
        payload: {
          ...this.resetObj,
        },
      });
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
                            value={this.state.payload.areaName}
                            onChange={(e) => this.handleDataUpdate(undefined, 'areaName', e.target.value)}
                          />
                        </FormControl>
                      </div>
                      <div className="form-group">
                        <FormControl style={{minWidth: '100%'}} variant="outlined">
                          <Autocomplete
                            onChange={(e, newValue) => {
                              this.handleDataUpdate(undefined, 'areaLeader', newValue)
                            }}
                            options={this.state.users}
                            getOptionLabel={(option) => option.name}
                            value={this.state.payload.areaLeader}
                            renderInput={(params) => <TextField {...params} label="Area Leader"
                                                                variant="outlined"/>}
                          />
                        </FormControl>
                      </div>
                      <div className="form-group">
                        <FormControl style={{minWidth: '100%'}} variant="outlined">
                          <Autocomplete
                            onChange={(e, newValue) => {
                              this.handleDataUpdate(undefined, 'asstDirector', newValue)
                            }}
                            options={this.state.users}
                            getOptionLabel={(option) => option.name}
                            value={this.state.payload.asstDirector}
                            renderInput={(params) => <TextField {...params} label="Assistant Director"
                                                                variant="outlined"/>}
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