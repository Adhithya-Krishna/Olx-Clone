import React, { useContext, useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import FirebaseContext from '../../store/FirebaseContext';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { db } from '../../firebase/config';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('')
  const { app: firebase } = useContext(FirebaseContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(firebase);

    try {
      // Create user with email and password
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Update user profile with provided username
      await updateProfile(auth.currentUser, { displayName: username });

      console.log('entered');
      // Create a reference to the 'users' collection
      const userRef = collection(db, 'users');

      // Set user document in the 'users' collection
      await setDoc(doc(userRef), {
        id: result.user.uid,
        username: username,
        phone: number,
      });
      console.log('Details updated in fireStore')
      navigate('/login');
    } catch (err) {
      console.log(err);
    };

  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='Olx-logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
            id="fname"
            name="name" />
          <br />
          <label htmlFor="emailId">Email</label>
          <br />
          <input
            className="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            type="email"
            id="emailId"
            name="email" />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={number}
            onChange={(e) => { setNumber(e.target.value) }}
            id="lname"
            name="phone" />
          <br />
          <label htmlFor="password  ">Password</label>
          <br />
          <input
            className="input"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            type="password"
            id="password"
            name="password" />
          <br />
          <br />
          <button>Signup</button>
        </form>
        {/* eslint-disable-next-line */}
        <a>Login</a>
      </div>
    </div>
  );
}