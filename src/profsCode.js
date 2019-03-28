
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import axios from 'axios';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      users: [],
      count: 0
    };
    this.load();
  }
  componentDidUpdate(prevProps){
    if(prevProps.match.params.idx !== this.props.match.params.idx){
      this.load();
    }
  }
  load = () => {
    axios.get(`https://acme-users-api.herokuapp.com/api/users/${this.props.match.params.idx || ''}`)
      .then( response => response.data)
      .then( ({users, count}) => this.setState({ users, count }));
  }
  render(){
    const { users, count } = this.state;
    const current = this.props.match.params.idx ? this.props.match.params.idx*1 : 0;
    const pageCount = Math.floor(count/50);
    const last = current === pageCount;
    const first = current === 0;
    return (
      <div>
        <h1>Users</h1>
        <div>
          You are viewing page { current + 1 } out of { pageCount + 1 }
        </div>
        <div className='btn-group'>
          <Link className={`btn btn-primary${first ? ' disabled': ''}`} to='/'>First</Link>
          <Link className={`btn btn-primary${first ? ' disabled': ''}`}  to={`/${current - 1}`}>Prev</Link>
          <Link className={`btn btn-primary${last ? ' disabled': ''}`} to={`/${current + 1 }`}>Next</Link>
          <Link className={`btn btn-primary${last ? ' disabled': ''}`}  to={`/${pageCount}`}>Last</Link>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>First</th>
              <th>Middle</th>
              <th>Last</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
          {
            users.map( user => (
              <tr key={ user.id }>
                <td>{ user.firstName }</td>
                <td>{ user.middleName }</td>
                <td>{ user.lastName }</td>
                <td>{ user.email }</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    );
  }
}
const root = document.querySelector('#root');
ReactDOM.render(<Router><Route path='/:idx?' component={ App } /></Router>, root);
