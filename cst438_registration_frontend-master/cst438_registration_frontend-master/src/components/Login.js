import React, { useState, useEffect } from 'react';
import AdminHome from './AdminHome';
import StudentHome from './StudentHome';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [isAuthenticated, setAuth] = useState(false);
  const [userRole, setUserRole] = useState('');
  const jwtToken = res.headers.get('Authorization');

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const login = () => {
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    .then((res) => {
        if (jwtToken !== null) {
          sessionStorage.setItem('jwt', jwtToken);
          setAuth(true);
          const decodedToken = jwtToken.split('.')[1];
          const decodedData = JSON.parse(atob(decodedToken));
          setUserRole(decodedData.role);
        }
    })
    .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        userRole === 'STUDENT' ? ( <StudentHome /> ) : userRole === 'ADMIN' ? ( <AdminHome /> ) : ( <p>Unknown user role</p> )) : (
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="email">Email</label>
                  </td>
                  <td>
                    <input type="text" name="email" value={user.email} onChange={onChange} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="password">Password</label>
                  </td>
                  <td>
                    <input type="password" name="password" value={user.password} onChange={onChange} />
                  </td>
                </tr>
              </tbody>
            </table>
            <br/> <button id="submit" onClick={login}> Login </button>
          </div>
        )}
    </div>
  );
}

export default Login;