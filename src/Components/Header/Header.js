import React, { useEffect, useContext } from 'react';
import { getAuth, signOut } from 'firebase/auth'
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/FirebaseContext'

function Header() {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const auth = getAuth()
  // const [user, setUser] = useState('');
  const navigate = useNavigate();

  const signOutUser = () => {
    signOut(auth).then(() => {
      // alert('Sign Out');
      setAuthUser(null)
      navigate('/login')
    }).catch((err) => {
      alert(err)
    })
  }
  const handleWelcomeClick = () => {
    if (authUser) {
      navigate('/')
    } else {
      navigate('/login')
    }
  }
  useEffect(() => {
    setAuthUser(auth.currentUser);
  })
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={handleWelcomeClick}>{authUser ? `Welcome ${authUser.displayName}` : 'Login'}</span>
          <hr />
        </div>
        <span onClick={signOutUser}>{authUser && 'Log Out'}</span>

        <div className="sellMenu" onClick={() => {
          navigate('/create')
        }}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
