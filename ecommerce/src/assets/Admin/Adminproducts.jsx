import React, { useContext, useEffect, useState } from 'react';
import Adminnavbar from './Adminnavbar';
import { Admincontext } from '../Context/Admincontxt';
import { HiFolderAdd } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { productvalidationschema } from '../Schema/Validationschema';

function Adminproducts() {
  const { product, categories, addProduct, deleteProduct, editProduct } = useContext(Admincontext);
  const [addproduct, setaddproduct] = useState(false);
  const [editproduct, seteditproduct] = useState(null);
  const [filterproduct, setfilterproduct] = useState([]);
  const [filtercategories, setfiltercategories] = useState([]);
  const [selectedcategory, setselectedcategory] = useState('All');

  useEffect(() => {
    setfiltercategories(['All', ...categories]);
    setfilterproduct(product);
  }, [product]);

  const handlecategory = (e) => {
    const value = e.target.value;
    setselectedcategory(value);
    if (value === 'All') {
      setfilterproduct(product);
    } else {
      setfilterproduct(product.filter((item) => item.category === value));
    }
  };

  return (
    <div className="flex h-screen">
     
      <Adminnavbar />

    
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <select onChange={handlecategory} value={selectedcategory} className="p-2 rounded">
            {filtercategories.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <HiFolderAdd className="text-4xl cursor-pointer" onClick={() => setaddproduct(true)} />
        </div>

        
        <table className="w-full border border-gray-200">
          <thead className="text-center bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-md">PRODUCT NAME</th>
              <th className="px-4 py-2 text-md">QUANTITY</th>
              <th className="px-4 py-2 text-md">PRICE</th>
              <th className="px-4 py-2 text-md">CATEGORY</th>
              <th className="px-4 py-2 text-md">IMAGE</th>
              <th className="px-4 py-2 text-md">EDIT/DELETE</th>
            </tr>
          </thead>
          <tbody>
            {filterproduct.slice().reverse().map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-300">
                <td className="px-6 py-2 text-md text-center">{product.name}</td>
                <td className="px-6 py-2 text-md text-center">{product.quantity}</td>
                <td className="px-6 py-2 text-md text-center">₹ {product.price}</td>
                <td className="px-6 py-2 text-md text-center">{product.category}</td>
                <td className="px-6 py-2 text-md text-center">
                  <div className="flex justify-center">
                    <img
                      src={product.url}
                      alt={product.name}
                      className="w-20 h-20 md:w-32 md:h-32 object-cover rounded"
                    />
                  </div>
                </td>
                <td className="px-6 py-2 text-md text-center">
                  <div className="space-y-4">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-2 rounded text-xs md:text-sm w-20"
                      onClick={() => seteditproduct(product)}
                    >
                      Edit
                    </button>
                    <br />
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded text-xs md:text-sm w-20"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Adminproducts;
