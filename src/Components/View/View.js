import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext)

  useEffect(() => {
    const fetchData = async () => {
      const { userId } = postDetails;
      const collRef = collection(db, 'users');
      const q = query(collRef, where('id', '==', userId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setUserDetails(doc.data());
        // console.log(userDetails);
        // console.log(postDetails)
      });
    };
    fetchData();
  }, []);


  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt={postDetails.name}
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.name}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          {userDetails ? (
            <>
              <p>{userDetails.username}</p>
              <p>{userDetails.phone}</p>
            </>
          ) : (
            <p>Loading seller details...</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default View;
