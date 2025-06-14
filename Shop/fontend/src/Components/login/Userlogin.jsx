import React, { useContext, useState } from 'react';
import Navbar from '../Navbar/Navbar'

import Products from '../Products/Products'
import TopProducts from '../TopProducts/TopProducts'
import Banner from '../Banner/Banner'
import Subscribe from '../Subscribe/Subscribe'
import Footer from '../Footer/Footer'
import { API_URL } from '../Common/Http';
import {  toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';




const Userlogin = ( ) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${API_URL}userLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status === 200) {
        const userinfo = {
          status: data.status,
          message: data.message,
          id: data.userID,
          name: data.name,
          token: data.token
        };
        localStorage.setItem('userinfo', JSON.stringify(userinfo));
        login(userinfo);
        window.location.href = '/user/dashboard';
        
      }else{
        toast.error(data.message);
      }
      if(data.status === 201){
        const userinfo = {
          status: data.status,
          message: data.message,
          id: data.userID,
          name: data.name,
        };
        localStorage.setItem('userinfo', JSON.stringify(userinfo));
        window.location.href = '/';
       
        
      }
      if(data.status === 400){
        toast.error(data.message);
      }
    })
    .catch((error) => {
      setError(error.message);
    });
  };

  return (
<>
    <Navbar/>
    

    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
     <Products/>
    <TopProducts/>
    <Banner/>
    <Subscribe/>
    <Footer/></>
  );
};

export default Userlogin;

