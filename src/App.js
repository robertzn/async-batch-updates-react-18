import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import "./styles.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);

  function getTodos() {
    fetch(`https://jsonplaceholder.typicode.com/users`, {
      method: "GET"
    }).then((res) => {
      res.json().then((data) => {
        setLoading(false);
        setUsers(data);
        setTotal(data.length);
      });
    });
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <div className="add" onClick={getTodos}>Refetch</div>
      {console.log(
        `Rendering with values Loading : ${loading} and users : ${
          users.length > 0 ? "loaded" : "fetching"
        } and total : ${total}`
      )}
      {loading ? <div>Loading....</div> : <UsersList users={users} />}
      <div style={{ marginTop: "2rem", fontWeight: "bold" }}>
        Total Users : {total}
      </div>
    </div>
  );
}

function UsersList({ users }) {
  return (
    <table cellPadding="5">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Website</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.website}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
