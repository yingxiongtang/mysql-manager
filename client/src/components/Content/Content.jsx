import React, { Component } from "react";
import './Content.css';
class Content extends Component {
  render() {
    return (
      <div id="content" className="disable-select col-xl-10 col-lg-9 offset-xl-2 offset-lg-3">

        {/* default state */}
        {this.props.loadingItems === 2 && <p className="text-center pt-3">Select a table in the sidebar.</p>}
        {/* loading */}
        {this.props.loadingItems === 1 &&
          <div className="center max p-0 m-0  ">
            <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <p className="pt-3">Loading table items...</p>
          </div>
        }
        {/* loaded */}
        {this.props.loadingItems === 0 &&
          <div>
            {/* top options bar */}
            <div className="contentOptions">
              <button onClick={() => this.props.showModal("CREATE_ROW", this.props.selectedTable)} className="btn btn-primary">Add Row</button>
              <button onClick={() => this.props.showModal("DELETE_TABLE")} className="btn btn-danger">Delete Table</button>
            </div>
            <table className="table table-sm table-hover">
              <thead>
                <tr>
                  {/* this loops through the headings for the table. tableItems is an array of objects*/}
                  {this.props.tableItems[0] != null &&
                    Object.keys(this.props.tableItems[0]).map(item => (
                      <th scope="col" key={item}>{item}</th>
                    ))}

                  {/*  nothing's here */}
                  {this.props.tableItems[0] == null &&
                    <th> <p className="max center pt-3">Table has no contents</p></th>
                  }
                </tr>
              </thead>
              <tbody>
                {/* for each item in tableItems (array of objects), make a row for it */}
                {this.props.tableItems.map(item => (
                  <tr key={this.props.tableItems.indexOf(item)}>
                    {/* for each item in that item, make tds for them */}
                    {Object.keys(item).map(value => {
                      // this is for adding the delete row button on the last td 
                      // basicallly if the current 'value' key:val pair is the last one in 'item'
                      if (Object.keys(item).indexOf(value) === Object.keys(item).length - 1) {
                        return (
                          <td className="last-td" key={value}>
                            <p className="m-0">{item[value]}</p>
                            <div>
                              {/* the first array value in the showModal second argument is the value of the first field,
                               and the second array value is the name of the first field.
                              this is because the backend deletes using the first field in that row */}
                              <i onClick={() => this.props.showModal("DELETE_ROW", [item[Object.keys(item)[0]], Object.keys(item)[0]])} className="far fa-trash-alt mr-1"></i>
                            </div>
                          </td>
                        )
                      } else {
                        return <td key={value}>{item[value]}</td>
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        }
      </div>
    )
  }
}

export default Content;
