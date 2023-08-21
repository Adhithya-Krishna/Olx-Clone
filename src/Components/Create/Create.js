import React, { Fragment, useContext, useEffect, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../firebase/config'
import { AuthContext } from '../../store/FirebaseContext'
import { collection, setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null)
  const { authUser, setAuthUser } = useContext(AuthContext);
  const date = new Date();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authUser) {
      try {
        const imageRef = await ref(storage, `image/${image.name}`);
        const uploadedImage = await uploadBytes(imageRef, image);
        const url = await getDownloadURL(ref(storage, `image/${image.name}`));
        // console.log(downloadedURL);
        const prodRef = collection(db, 'products');
        await setDoc(doc(prodRef), {
          name,
          category,
          price,
          url,
          userId: authUser.uid,
          createdAt: date.toDateString()
        })
        navigate('/')
      } catch (error) {
        console.error(error)
      }

    } else {
      console.log('user  not found')
    }

  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)} />
            <br />
            {/* </form> */}
            <br />
            <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : null}></img>
            {/* <form> */}
            <br />
            <input onChange={(e) => {
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
