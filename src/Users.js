import React, { useEffect } from 'react';
import { data } from 'react-router-dom';

export default function Users() {
const [users, setUsers] = React.useState([]);

useEffect(() => {
    fetch('http://127.0.0.1:8000/api/user/show')
    .then(response => response.json())
    .then(data => {
      setUsers(data);
    })
}, []);

 const datashow = users.map((user, index) => (
    <tr key={index}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
    </tr>
  ));

  return (
    <div style={{ padding: '20px', marginLeft: '400px' }}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
         {datashow}
        </tbody>
      </table>
    </div>
  )
}
