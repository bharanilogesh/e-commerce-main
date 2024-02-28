import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../nav-bar/navbarStyle.css';
import { IoMdContact } from 'react-icons/io';
import { useCartGLobalContext } from '../../context/context';
import { SiShopify } from 'react-icons/si';
import { IoMdLogOut } from 'react-icons/io';
import { signOut } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import User from '../../routes/user';
import logo from '../../assets/logo.png';
const Navbar = ({ updateSearchQuery }) => {
  const { totalQuantity } = useCartGLobalContext();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('user'); // Track the selected option

  const handleSearchChange = (e) => {
    updateSearchQuery(e.target.value);
  };

  const handleDropdownChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedOption(selectedOption); // Update the selected option state
    if (selectedOption === 'user') {
      handleUser();
    } else if (selectedOption === 'logout') {
      logout();
    } else {
      User;
    }
  };

  const handleUser = () => {
    navigate('/user');
  };

  const logout = async () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((err) => console.log('error'));
  };

  return (
    <div className='nav'>
      <div className='navbar'>
        <Link to='/products'>
          <div className='profile'>
            <img className='logo' src="https://1.bp.blogspot.com/-Fwuggr2xF6I/YDtm3tW-IUI/AAAAAAAAAic/jgefuhGVsTEMhAqeex55eRjxmA0cg1T1QCLcBGAsYHQ/s3454/Flipkart-logo.png" alt='' />
          </div>
        </Link>
        <div className='border-none outline-none'>
          <input
            className=''
            type='text'
            placeholder='Search'
            onChange={handleSearchChange}
          />
        </div>
        <Link to='/cart'>
            <div className='add-cart'>
              {' '}
              🛒 <span className='cart-count'>{totalQuantity}</span>
            </div>
          </Link>
        <div className='profile'>
        <div className='nav-content'>
          <button onClick={handleUser}>
            <span className='pro'>Profile</span>
          </button>
          <button onClick={logout}>
          <span className='logout'>Logout</span> 
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
