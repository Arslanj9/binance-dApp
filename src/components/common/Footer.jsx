

const Footer = () => {
  return (
    <footer className="text-gray-300 p-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-700">
      
      {/* Left Side */}
      <div className="mb-4 md:mb-0">
        <p className="text-sm">&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    
      {/* Optional: Social Media Icons */}
      <div className="flex space-x-4 mt-4 md:mt-0">
        <a href="https://twitter.com/yourcompany" aria-label="Twitter">
          <p  className="hover:text-blue-400">Instagram</p>
        </a>
        <a href="https://facebook.com/yourcompany" className="hover:text-blue-600" aria-label="Facebook">
          <p>Facebook<p>Instagram</p></p>
        </a>
        <a href="https://instagram.com/yourcompany" className="hover:text-pink-500" aria-label="Instagram">
          <p>Facebook</p>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
