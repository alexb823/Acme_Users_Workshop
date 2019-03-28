import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UsersTable from './UsersTable';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], count: 0 };
    this.load();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.idx !== this.props.match.params.idx) {
      this.load();
    }
  }

  load = () => {
    axios
      .get(
        `https://acme-users-api.herokuapp.com/api/users/${this.props.match
          .params.idx || ''}`
      )
      .then(response => response.data)
      .then(({ users, count }) => this.setState({ users, count }));
  };

  render() {
    const { users, count } = this.state;

    const current = this.props.match.params.idx
      ? this.props.match.params.idx * 1
      : 0;
    const pageCount = Math.floor(count / 50);
    const last = current === pageCount;
    const first = current === 0;

    return (
      <div className="container">
        <h1>Users</h1>
        <h5>
          You are viewing page {current + 1} out of {pageCount + 1}
        </h5>

        <div className="btn-group my-3">
          <Link className={`btn btn-primary${first ? ' disabled' : ''}`} to="/">
            First
          </Link>
          <Link
            className={`btn btn-primary${first ? ' disabled' : ''}`}
            to={`/${current - 1}`}
          >
            Prev
          </Link>
          <Link
            className={`btn btn-primary${last ? ' disabled' : ''}`}
            to={`/${current + 1}`}
          >
            Next
          </Link>
          <Link
            className={`btn btn-primary${last ? ' disabled' : ''}`}
            to={`/${pageCount}`}
          >
            Last
          </Link>
        </div>

        <UsersTable users={users} />
      </div>
    );
  }
}
