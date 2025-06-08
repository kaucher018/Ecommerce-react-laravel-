import React, { useEffect } from 'react'
import { useState } from "react";
import { API_URL } from "../../Common/Http";
import { token } from "../../Common/Admintoken";
import DashbordSidebar from "../../Common/DashbordSidebar";
import Navbar from "../../Navbar/Navbar";
import Loader from "../../Common/Loader";
import NotFound from "../../Common/NotFound";
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Products = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [products, setProducts] = useState([]);



const deleteCategory = async(id) => {
  if(window.confirm("Are you sure you want to delete this Product?")){
   await fetch(`${API_URL}products/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token()}`
        }
    }).then(res => res.json())
    .then(result => {
        if(result.status == 200){
          const newproducts = products.filter(product => product.id !== id);
            setProducts(newproducts);
            // fetchproducts();
            toast.success(result.message);
        }else{
            console.log("Error");
        }   
    })
  }
}




  const fetchproducts = async() =>{
    setLoading(true);
    await fetch(`${API_URL}products`,{
        method:'GET',
        headers :{
            'Content-type': 'application/json',
        'Accept': 'Application/json',
        'Authorization':`Bearer ${token()}`
        }
    }).then(res=> res.json())
    .then(result =>  {
        if(result.status == 200){
            setLoading(false)
            setProducts(result.products);
            // console.log(result.products);
          
        }else{
            console.log("errosr")
        }
  }) 
}   
useEffect(() => {
    fetchproducts();
}, [])


  return (
   
<>
    <Navbar/>
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
     <DashbordSidebar/>
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
         

<div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">products</h2>
    <button className="bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded"  onClick={() => navigate("/products/create")} >
          Create
        </button>
      </div>
      

      <div className="bg-white shadow rounded overflow-x-auto">
        {
          loading == true && <Loader/>
        }
        {
          products.length == 0 && !loading && <NotFound/>
        }

        {
          products && products.length > 0 &&
          <table className="min-w-full text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">image</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">price</th>
             
              <th className="py-3 px-4">Quantity</th>
             
              <th className="py-3 px-4">Sku </th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
          {   products.map(cat => 
              <tr className="border-t">
                <td className="py-3 px-4">{cat.id}</td>
                <td className="py-3 px-4">
                    <img src={cat.image_url} alt="" width={70} />
                </td>
                <td className="py-3 px-4">{cat.title}</td>
                <td className="py-3 px-4">
                {
                  cat.status == 1 ? (
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                    Active
                  </span>
                  ) : (
                    <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm">
                   Block
                  </span>
                  )
                }     
                </td>
                <td className="py-3 px-4">{cat.price}</td>
               
                <td className="py-3 px-4">{cat.quantity}</td>
              
                <td className="py-3 px-4">{cat.sku}</td>
                <td className="py-3 px-4 space-x-3">
                  <button    
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => navigate(`/products/edit/${cat.id}`)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteCategory(cat.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        }
      
      </div>
    </div>
        </div>
      </div>
    </div>
    </>
  
  )
}

export default Products
