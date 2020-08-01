import React from "react";

export default class TableComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    const id = Math.floor(Math.random() * 10000);
    this.state = {
      tableId: props.tableId || `table-${id}`,
      searching: props.searching || false,
      paging: props.paging || false,
      info: props.info || false,
    }
  }

  componentDidMount() {
    (function ($, opts) {
      'use strict';
      $(function () {
        $(`#${opts.tableId}`).DataTable({
          "aLengthMenu": [
            [5, 10, 15, -1],
            [5, 10, 15, "All"]
          ],
          "iDisplayLength": 10,
          "language": {
            search: ""
          },
          searching: opts.searching,
          paging: opts.paging,
          info: opts.info,
        });
      })
    })(window.jQuery, this.state);
  }

  render() {
    const headings = [
      {title: 'Name', accessKey: 'name'},
      {title: 'Status report', accessKey: 'status'},
      {title: 'Office', accessKey: 'office'},
      {title: 'Price', accessKey: 'price'},
      {title: 'Date', accessKey: 'date'},
      {title: 'Gross amount', accessKey: 'amount'},
    ];
    const rowData = [{
      name: 'Jeremy Ortega',
      status: 'Levelled up',
      office: 'Catalinaborough',
      price: '$790',
      date: '06 Jan 2018',
      amount: '$2274253',
    }, {
      name: 'Alvin Fisher',
      status: 'Ui design completed',
      office: 'East Mayra',
      price: '$23230',
      date: '18 Jul 2018',
      amount: '$83127',
    }, {
      name: 'Emily Cunningham',
      status: 'support',
      office: 'Makennaton',
      price: '$939',
      date: '16 Jul 2018',
      amount: '$29177',
    }, {
      name: 'Minnie Farmer',
      status: 'support',
      office: 'Agustinaborough',
      price: '$30',
      date: '30 Apr 2018',
      amount: '$44617',
    }, {
      name: 'Betty Hunt',
      status: 'Ui design not completed',
      office: 'Lake Sandrafort',
      price: '$571',
      date: '25 Jun 2018',
      amount: '$78952',
    }, {
      name: 'Myrtie Lambert',
      status: 'Ui design completed',
      office: 'Cassinbury',
      price: '$36',
      date: '05 Nov 2018',
      amount: '$36422',
    }, {
      name: 'Jacob Kennedy',
      status: 'New project',
      office: 'Cletaborough',
      price: '$314',
      date: '12 Jul 2018',
      amount: '$34167',
    }, {
      name: 'Ernest Wade',
      status: 'Levelled up',
      office: 'West Fidelmouth',
      price: '$484',
      date: '08 Sep 2018',
      amount: '$50862',
    }];
    return (
      <div className="table-responsive">
        <table id={this.state.tableId} className="table">
          <thead>
          <tr>
            {headings.map(heading => {
              return <th key={heading.accessKey}>{heading.title}</th>
            })}
          </tr>
          </thead>
          <tbody>
          {
            rowData.map((row) => {
              return <tr key={JSON.stringify(row)}>
                {
                  headings.map((heading) => (
                    <td key={row[heading.accessKey]}>{row[heading.accessKey]}</td>
                  ))
                }
              </tr>
            })
          }
          </tbody>
        </table>
      </div>
    )
  }
}