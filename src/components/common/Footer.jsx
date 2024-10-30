import { FaTelegramPlane, FaTwitter, FaDiscord, FaGithub, FaFacebook, FaReddit, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import './Footer.css'

const Footer = () => {
  return (
    <footer className="text-gray-300 mt-12 p-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-700">

      {/* Left Side */}
      <div className="flex gap-8 mb-4 md:mb-0">
        <button className='hover:text-cyan-300' >Brand Assets</button>
        <button className='hover:text-cyan-300' >Support</button>
      </div>



      {/* Right Side */}
      <div className="flex flex-col gap-3 ">

        {/* Icons */}
        <div className="icons flex gap-3 justify-center md:justify-end">
          {/* Telegram */}
          <a href="https://t.me/" target="_blank" rel="noopener noreferrer" >
            <FaTelegramPlane className='reactIcon' />
          </a>

          {/* Twitter */}
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" >
            <FaXTwitter className='reactIcon' />
          </a>

          {/* Discord */}
          <a href="https://discord.com/" target="_blank" rel="noopener noreferrer" >
            <FaDiscord className='reactIcon' />
          </a>

          {/* GitHub */}
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" >
            <FaGithub className='reactIcon' />
          </a>

          {/* Facebook */}
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" >
            <FaFacebook className='reactIcon' />
          </a>

          {/* Reddit */}
          <a href="https://reddit.com/" target="_blank" rel="noopener noreferrer" >
            <FaReddit className='reactIcon' />
          </a>

          {/* LinkedIn */}
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" >
            <FaLinkedin className='reactIcon' />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm">&copy; 2024 Your Company. All rights reserved.</p>

      </div>
    </footer>
  );
};


export default Footer;
