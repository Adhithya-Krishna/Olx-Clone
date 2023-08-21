import React, { useContext, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import Logo from '../../olx-logo.png';
import './Login.css';
import FirebaseContext from '../../store/FirebaseContext';
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { app: firebase } = useContext(FirebaseContext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(firebase);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // console.log(userCredential.user);
      // alert('Login Sucess')
      navigate('/')
    } catch (error) {
      alert('Login Failed' + error.message)
      // console.log(error.message)
    }

  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="emailId"
            name="email"
            onChange={(e) => { setEmail(e.target.value) }}
            defaultValue={email}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e) => { setPassword(e.target.value) }}
            defaultValue={password}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={() => {
          navigate('/signup')
        }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
