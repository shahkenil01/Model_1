import Header from "../Components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/users`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header />

      <div
        style={{
          width: "90%",
          margin: "30px auto",
          padding: "20px",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Registered Users</h1>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#4f46e5", color: "white" }}>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                No.
              </th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Name
              </th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Email
              </th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Password
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {index + 1}
                </td>

                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {user.name}
                </td>

                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {user.email}
                </td>

                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {user.password}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;