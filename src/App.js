import React, { Component } from 'react';
import axios from 'axios';
import {HashRouter, Route, Link} from 'react-router-dom';
import UsersTable from './UsersTable';


export default class App extends Component {
  constructor() {
    super();
    this.state = { users: [], count: 0, currentPg: 0, currentUsers: [] };
  }

  componentDidMount() {
    axios
      .get('https://acme-users-api.herokuapp.com/api/users')
      .then(response => response.data)
      .then(({ users, count }) => this.setState({ users, count }))
      .then(() => console.log(this.state))
  }
  render() {
    const {users, count, currentPg, currentUsers} = this.state;

    return (
      <div className="container">
      <h1>Users</h1>
      <h5>{`You are viewing page 1 out of ${Math.floor(count/50)}`}</h5>


      <HashRouter>
      <div className="btn-group my-3">
      <Link to='/' className="btn btn-primary">Prev</Link>
      <Link to='/' className="btn btn-primary">First</Link>
      <Link to={`/${currentPg}`} className="btn btn-primary">Next</Link>
      <Link to='/' className="btn btn-primary">Last</Link>
      </div>

      <Route path='/' render={() => <UsersTable users={users} />} />
      <Route path='/:pg' render={() => <UsersTable users={users} />} />
      </HashRouter>

      </div>
    );
  }
}
