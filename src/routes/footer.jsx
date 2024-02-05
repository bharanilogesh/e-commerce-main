import { useState } from 'react';
import {
  AiFillInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { MdFastfood, MdAttachEmail } from 'react-icons/md';
import { ImLocation2, ImPhone } from 'react-icons/im';
import { BsFillClockFill } from 'react-icons/bs';
const Footer = () => {
  const [users, setUsers] = useState({ name: '', email: '' });
  const { name, email } = users;

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUsers({ ...users, [name]: value });
  };

  return (
    <footer className='footer' id='footer'>
      <div className='top-footer'>
        <h2 className='sayings'>Just click and get your products</h2>
      </div>
      <div className='footer-container'>
        <div className='contact'>
          <form
            className='form'
            action='https://formsubmit.co/manojbharathi00@gmail.com'
            method='POST'
            onChange={(event) => handleOnChange(event)}
          >
            <div>
              <h2> Send an email</h2>

              <input
                type='text'
                placeholder='Your Name'
                name='name'
                onChange={(event) => handleOnChange(event)}
                value={name}
                required
              />
            </div>
            <div>
              <input
                type='email'
                name='email'
                value={email}
                placeholder='Your mail id'
                onChange={(event) => handleOnChange(event)}
                required
              />
            </div>

            <div>
              <button className='btn-submit' type='submit'>
                send
              </button>
            </div>
          </form>
          <div className='aside'>
            <div className='contact-id'>
              <h2 className='red-clr'>Contact us</h2>
              <a className='navlink' href='/products'>
                <MdAttachEmail className='footer-icon' />
                email
              </a>
              <a className='navlink' href='/products'>
                <ImLocation2 className='footer-icon' /> Location
              </a>
              <a className='navlink' href='/products'>
                <ImPhone className='footer-icon' /> Phone
              </a>
              <a className='navlink'>
                <BsFillClockFill className='footer-icon' /> 8.00am - 9.00 pm
              </a>
            </div>
            <div className='quick-link'>
              <h2 className='red-clr'>Quick links</h2>
              <div className='links'>
                <a href='/products' className='navlink'>
                  Home
                </a>
                <Link className='navlink' to='/cart'>
                  <MdFastfood className='footer-icon' />
                </Link>
                <Link className='navlink' to='/faq'>
                  Faq's
                </Link>
              </div>
            </div>
            <div className='social-icons'>
              <h2 className='red-clr'>Follow us</h2>
              <a className='navlink' href='/products'>
                <AiFillInstagram className='footer-icon' /> Instagram
              </a>
              <a className='navlink' href='/products'>
                <AiOutlineFacebook className='footer-icon' /> Facebook
              </a>
              <a className='navlink' href='/products'>
                <AiOutlineTwitter className='footer-icon' /> Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
