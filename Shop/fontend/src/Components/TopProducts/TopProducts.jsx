import React from "react";
import Img1 from "../../assets/shirt/shirt.png";
import Img2 from "../../assets/shirt/shirt2.png";
import Img3 from "../../assets/shirt/shirt3.png";
import { FaStar } from "react-icons/fa";
import { API_URL } from "../Common/Http";
import { useState } from "react";
import { token } from "../Common/Admintoken";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const TopProducts = ({ handleOrderPopup }) => {
const navigate = useNavigate();

    const [ProductsData, setProductsData] =useState([]);
  
  const fetchproducts = async() =>{
    await fetch(`${API_URL}bestproducts`,{
        method:'GET',
        headers :{
            'Content-type': 'application/json',
        'Accept': 'Application/json',
        'Authorization':`Bearer ${token()}`
        }
    }).then(res=> res.json())
    .then(result =>  {
        if(result.status == 200){
          console.log(result.products)
            setProductsData(result.products);
            
          
        }else{
            console.log("errosr")
        }
  }) 
  }
  
  useEffect(() => {
    fetchproducts();
  }, []);
  return (
    <div>
      <div >
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Rated Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Best Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            asperiores modi Sit asperiores modi
          </p>
        </div>
        {/* Body section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-5 mb-50 place-items-center" style={{marginTop:"150px"}}>
          {ProductsData.map((data) => (
            <div
            onClick={() => navigate(`/ProductDetail/${data.id}`)}
              data-aos="zoom-in"
              className="rounded-2xl w-full bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[300px]"
            >
              {/* image section */}
              <div className="h-[100px]">
                <img
                  src={data.image_url}
                  alt=""
                  className=" border-2 border-primary rounded-2xl max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                />
              </div>
              {/* details section */}
              <div className="p-4 text-center">
                {/* star rating */}
                <div className="w-full flex items-center justify-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold text-white group-hover:text-white">{data.title}</h1>
                <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                  {data.description}
                </p>
                <button
                  className="bg-primary bg-blue-500 hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary group-hover:text-black"
                  onClick={handleOrderPopup}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;