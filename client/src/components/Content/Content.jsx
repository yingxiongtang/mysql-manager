import React, { Component } from "react";
import './Content.css';
class Content extends Component {
  render() {
    return (
      <div id="content" className="col-xl-10 col-lg-9 offset-xl-2 offset-lg-3">

        {this.props.loadingItems === 2 && <p className="text-center pt-3">Select a table in the sidebar.</p>}
        {this.props.loadingItems === 1 &&
          <div className="center max p-0 m-0  ">
            <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <p className="pt-3">Loading table items...</p>
          </div>
        }
        {this.props.loadingItems === 0 &&
          <table className="table table-striped table-sm table-hover">
            <thead>
              <tr>
                {this.props.tableItems[0] != null &&
                  Object.keys(this.props.tableItems[0]).map(item => (
                    <th scope="col" key={item}>{item}</th>
                  ))}

                {this.props.tableItems[0] == null &&
                  <th> <p className="max center pt-3">Table has no contents</p></th>
                }
              </tr>
            </thead>
            <tbody>
              {this.props.tableItems.map(item => (
                <tr key={this.props.tableItems.indexOf(item)}>
                  {Object.keys(item).map(value => {
                    if (Object.keys(item).indexOf(value) === Object.keys(item).length - 1) {
                      return (
                        <td className="last-td" key={value}>
                          <p className="m-0">{item[value]}</p>
                          <div>
                            <i className="far fa-edit mr-3"></i>
                            <i className="far fa-trash-alt mr-1"></i>
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

        }
      </div>
    )
  }
}

export default Content;
