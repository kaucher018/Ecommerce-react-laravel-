
import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaTachometerAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Cart/Cart";



const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "Shop",
    link: "/Shop",
  },
  {
    id: 3,
    name: "Top Rated",
    link: "/#",
  },
  {
    id: 4,
    name: "Discount Product",
    link: "/#",
  },
  {
    id: 5,
    name: "About US",
    link: "/#",
  },
];

const DropdownLinks = [
  {
    id: 1,
    name: "Trending Products",
    link: "/#",
  },
  {
    id: 2,
    name: "Best Selling",
    link: "/#",
  },
  {
    id: 3,
    name: "Top Rated",
    link: "/#",
  },
];

const Navbar = ({ handleOrderPopup}) => {
  const navigate = useNavigate();
  const { getquantity } = useContext(CartContext);

  const handleLoginPopup = () => {
    
    navigate("/login");
  }

  function logoutuser() {
    localStorage.removeItem("userinfo");
    navigate("/");
  }


  function handleSingUpPopup() {
    navigate("/signup");
  }
  
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 duration-200 relative z-40">
      {/* upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={Logo} alt="Logo" className="w-10" />
             <span className="text-white">LogeAchi.com</span> 
            </a>
          </div>

          {/* search bar */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="search"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800 dark:text-white  "
              />
              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>

          
            
       { localStorage.getItem("Admininfo") ? (
  <>

<button
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full flex items-center gap-3 group">
              <span className="text-green-600 cursor-pointer group-hover:block hidden transition-all duration-200" >
             <Link to="/dashboard"> {JSON.parse(localStorage.getItem("Admininfo")).name}'s Dashboard   </Link> 
              </span>
              <FaTachometerAlt className="text-2xl text-green-600 hover:text-primary cursor-pointer" />

            </button>
    <button
      className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
    >
       Welcome Boss!
      <FaUserCircle className="text-2xl text-gray-600 hover:text-primary cursor-pointer" /> 
    </button>
   <div className="relative cursor-pointer" onClick={() => navigate("/Cart")}>
      <FaCartShopping className="text-xl text-white drop-shadow-sm" />
      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
        {getquantity()}
      </span>
    </div>
  </>
) :
       
       localStorage.getItem("userinfo")  ?  ( 
        
        <>
         <button
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Welcome!  {JSON.parse(localStorage.getItem("userinfo")).name} .
              </span>
              <FaUserCircle className="text-2xl text-gray-600 hover:text-primary cursor-pointer" />

            </button>

        <button
              onClick={() => handleOrderPopup()}
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Order
              </span>
              <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>
            <button onClick={()=>logoutuser()}>
              LogOut
            </button> 
            </>) :
            

            (
            <><button
              onClick={() => handleLoginPopup()}
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full flex items-center gap-3 group"
            >   
             LOGIN
            </button>
OR
            <button
              onClick={() => handleSingUpPopup()}
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full flex items-center gap-3 group"
            >
             SINGUP
            </button>
            
</>
            ) 

            }
           
          </div>
        </div>
      </div>
      {/* lower Navbar */}
      <div data-aos="zoom-in" className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4 text-green-600">
          {Menu.map((data) => (
            <li key={data.id}>
              <a
                href={data.link}
                className="inline-block px-4 hover:text-primary duration-200"
              >
                {data.name}
              </a>
            </li>
          ))}
          {/* Simple Dropdown and Links */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2">
              Trending Products
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;