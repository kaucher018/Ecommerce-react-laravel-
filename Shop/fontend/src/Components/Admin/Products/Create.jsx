import DashbordSidebar from "../../Common/DashbordSidebar";
import Navbar from "../../Navbar/Navbar";
import { useForm } from "react-hook-form";
import { API_URL } from "../../Common/Http";

import { token } from "../../Common/Admintoken";
import { toast } from "react-toastify";
import { useState, useRef, useMemo } from "react";
import { useEffect } from "react";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";



const Create = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const nvagate = useNavigate();

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();




  const savedata = async (data) => {
    
    const formdata = {
      ...data,
      "description": content
    }
    console.log(formdata);
    await fetch(`${API_URL}products`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify(formdata),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          nvagate("/products");
          toast.success(result.message);
        } else {
          console.log("Error");
        }
      });
  };

  const [categories, setcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const fetchCategories = async () => {
    await fetch(`${API_URL}categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setcategories(result.categories);
        } else {
          console.log("Error");
        }
      });
  };

  const fetchbrands = async () => {
    await fetch(`${API_URL}brands`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "Application/json",
        Authorization: `Bearer ${token()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setBrands(result.brands);
        } else {
          console.log("errosr");
        }
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchbrands();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex bg-gray-100">
        <DashbordSidebar />

        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <h2 className="text-2xl font-semibold">Create New Product</h2>

            <div className="p-6 bg-gray-50 flex justify-center items-center ">
              <div className="flex justify-between items-center mb-4">

     {/* product details */}
                <div className="w-150">
                  <form onSubmit={handleSubmit(savedata)}>
                    <div className="form-group ">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Name:</label>
                      <input
                        {...register("title", { required: "title is required" })}
                        type="text"
                        placeholder="Enter product title"
                      />
                      {errors.title && (
                        <span className="text-red-500">
                          {errors.title.message}
                        </span>
                      )}
                    </div>

      {/* product catagory  and band */}
                    <div className="flex gap-5">
                      <div className="form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Category:
                        </label>
                        <select
                          className="border border-black p-1 rounded w-45"
                          {...register("category_id", {
                            required: "category is required",
                          })}
                        
                        >
                          <option value=""> Select a Category </option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        {errors.category_id && (
                          <span className="text-red-500">
                            {errors.category_id.message}
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Brand:
                        </label>
                        <select
                          className="border border-black p-1 rounded w-45"
                          {...register("brand_id", {
                            required: "brand is required",
                          })}
                         
                        >
                          <option value=""> Select a Brand</option>
                          {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                              {brand.name}
                            </option>
                          ))}
                        </select>
                        {errors.brand_id && (
                          <span className="text-red-500">
                            {errors.brand_id.message}
                          </span>
                        )}
                      </div>
                    </div>

          {/* product short description */}
                    <div>
                      <label
                        htmlFor=""
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                      
                        Short description
                      </label>
                      <textarea
                        className="from-group border border-black p-1 rounded w-full"
                        {
                          ...register("Short_description"
                           
                          )
                        }
                       
                        placeholder="Enter short description"
                        rows={3}
                      ></textarea>
                    </div>
                    
           {/* product description */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 mt-4">
                        Description
                      </label>
                      <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      />
                    </div>

              {/* product price */}
              <span className="block mb-2 text-xl font-medium text-gray-900 mt-8">Pricing</span>
                    <div className="flex gap-40 mt-4">
                      <div className="form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Price:
                        </label>
                        <input
                          className="border border-black p-1 rounded w-45"
                          {...register("price", {
                            required: "price is required",
                          })}
                          type="number"
                          name="price"
                          placeholder="Enter price"
                        />
                        {errors.price && (
                          <span className="text-red-500">
                            {errors.price.message}
                          </span>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Discount Price:
                        </label>
                        <input
                          className="border border-black p-1 rounded w-45"
                          {
                            ...register("compare_price", 
                              
                            )
                          }
                          type="number"
                         
                          placeholder="Enter Discount Price"
                        />
                      </div>
                    </div>
{/* product inventory */}
                    
 <span className="block mb-2 text-xl font-medium text-gray-900 mt-4">Inventory </span>
                    <div className="flex gap-5 mt-4 mb-4">
                     
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Quantity:
                        </label>
                        <input
                          className="border border-black p-1 rounded w-45"
                          {...register("quantity", {
                            required: "quantity is required",
                          })}
                          type="number"
                          name="quantity"
                          placeholder="Enter quantity"
                        />
                        {errors.quantity && (
                          <span className="text-red-500">
                            {errors.quantity.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">      
                          Bracode
                        </label>
                        <input
                          className="border border-black p-1 rounded w-45"
                          {...register("barcode", 
                            
                          )}
                          type="text"
                        
                          placeholder="Enter bracode"
                        />
                       
                      </div>
                    </div>

                    <div className="flex gap-5 mt-4 mb-4">
                      <div className="form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Status:
                        </label>
                        <select
                          className="border border-black p-1 rounded w-45"
                          {...register("status", {
                            required: "status is required",
                          })}
                        
                        >
                          <option value=""> Set a status</option>
                          <option value="1">Active</option>
                          <option value="0">Block</option>
                        </select>
                        {errors.status && (
                          <span className="text-red-500">
                            {errors.status.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor=""
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >       
                          SKU
                        </label>
                        <input

                          className="from-group border border-black p-1 rounded w-45"
                          {
                            ...register("sku", {
                              required: "sku is required",
                            })
                          }
                     
                          placeholder="Enter sku"
                        />
                      </div>
                    </div>

                    {/* {product imges} */}

                    <div className="flex gap-5 mt-4 mb-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Product Image:
                        </label>
                        <input
                          className="from-group border border-black p-1 rounded w-150"
                          {...register("image" )}
                          type="file"
                      
                        />
                        {errors.image && (
                          <span className="text-red-500">
                            {errors.image.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <button type="submit">Create Product</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
