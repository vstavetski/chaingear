import React, { Component } from 'react';

import { Link } from 'react-router';

var moment = require('moment');

import * as cyber from '../../utils/cyber'

class Home extends Component {
    constructor(props) {
      super(props)

      this.state = {
        registries: [],
        account: '0xf2492533f7d89dbfed69757156c4b746839e59e8'
      }
    }

    componentDidMount() {
      cyber.getRegistry().then(registries => {
        this.setState({
        registries
      })
      })
    }

  render() {
    const { registries, account } = this.state;
    console.log(registries);

    const rows = registries.map(register => (
                <tr key={register.name}>
                    <td>
                        {
                            register.status === 'pending' ? (
                              <span>
                                <span>{register.name}</span>
                                (<Link to={`/wait/${register.txHash}`}>pending</Link>)
                              </span>
                            ) : (
                              <Link 
                                to={`/registers/${register.address}`} 
                              >{register.name}</Link>
                            )
                          }
                    </td>
                        ????
                    <td>
                    </td>
                    <td>
                        {register.creator}
                    </td>
                    <td>
                        {moment(new Date(register.registrationTimestamp.toNumber() * 1000)).format('DD-MM-YYYY')}
                    </td>
                    <td></td>
                </tr>
          ));

    const myRows = registries.filter(x => x.creator === account).map(register => (
                <tr key={register.name}>
                    <td>
                        {
                            register.status === 'pending' ? (
                              <span>
                                <span>{register.name}</span>
                                (<Link to={`/wait/${register.txHash}`}>pending</Link>)
                              </span>
                            ) : (
                              <Link 
                                to={`/registers/${register.address}`} 
                              >{register.name}</Link>
                            )
                          }
                    </td>
                        ????
                    <td>
                    </td>
                    <td>
                        {register.creator}
                    </td>
                    <td>
                        {moment(new Date(register.registrationTimestamp.toNumber() * 1000)).format('DD-MM-YYYY')}
                    </td>
                    <td>
                        <Link 
                                to={`/registers/${register.address}/edit`} 
                              >edit</Link>
                    </td>
                </tr>
          ))

    let content = (
        <div>
            <Link to='/new'>create new register</Link>
        </div>
    );

    if (myRows.length > 0 ){
        content = (
            <div>
                <h2>My registries:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>symbol</th>
                            <th>owner</th>
                            <th>created date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myRows}
                    </tbody>
                </table>
                  <Link to='/new'>create new register</Link>
            </div>
        )        
    }

    return (
      <div>
        <div>
            {content}
        </div>

        <h2>Existing registries:</h2>
        <table>
            <thead>
                <tr>
                    <th>name</th>
                    <th>symbol</th>
                    <th>owner</th>
                    <th>created date</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
      </div>
    );
  }
}


export default Home;
