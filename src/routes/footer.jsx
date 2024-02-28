import { useState } from 'react';
import {
  AiFillInstagram,
  AiOutlineFacebook,
  AiOutlineGithub,
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
      <div className='footer-container'>
        <div className='contact'>
          <div className='aside'>
            <div className='contact-id'>
              <h2 className='red-clr'>Contact us</h2>
              <a className='navlink' >
                <MdAttachEmail className='footer-icon' />
                Email: bharanilogesh2001@gmail.com
              </a>
              <a className='navlink' href='/products'>
                <ImLocation2 className='footer-icon' /> Location: Coimbatore
              </a>
              <a className='navlink' href='/products'>
                <ImPhone className='footer-icon' /> Phone: 7550381410
              </a>
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
                <AiOutlineGithub className='footer-icon' /> GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
