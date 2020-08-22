import React from 'react';
import MaterialTable from 'material-table';
import {connect} from "react-redux";
import SideBarComponent from "../../components/SideBarComponent";

class UpdateArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {title: 'Name', field: 'name'},
        {title: 'Surname', field: 'surname'},
        {title: 'Birth Year', field: 'birthYear', type: 'numeric'},
        {
          title: 'Birth Place',
          field: 'birthCity',
          lookup: {34: 'İstanbul', 63: 'Şanlıurfa'},
        },
      ],
      data: [
        {name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63},
        {
          name: 'Zerya Betül',
          surname: 'Baran',
          birthYear: 2017,
          birthCity: 34,
        },
      ],
    };
    console.log(this.props);
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
              <div className="col-12 grid-margin">
                <MaterialTable
                  title="Editable Example"
                  columns={this.state.columns}
                  data={this.state.data}
                  editable={{
                    onRowAdd: (newData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                          this.setState((prevState) => {
                            const data = [...prevState.data];
                            data.push(newData);
                            return {...prevState, data};
                          });
                        }, 600);
                      }),
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                          if (oldData) {
                            this.setState((prevState) => {
                              const data = [...prevState.data];
                              data[data.indexOf(oldData)] = newData;
                              return {...prevState, data};
                            });
                          }
                        }, 600);
                      }),
                    onRowDelete: (oldData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                          this.setState((prevState) => {
                            const data = [...prevState.data];
                            data.splice(data.indexOf(oldData), 1);
                            return {...prevState, data};
                          });
                        }, 600);
                      }),
                  }}
                />
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateArea);