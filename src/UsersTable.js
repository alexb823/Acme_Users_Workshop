import React from 'react';

const UsersTable = ({ users }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>First</th>
          <th>Middle</th>
          <th>Last</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.middleName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
