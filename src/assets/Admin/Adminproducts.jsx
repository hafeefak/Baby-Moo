import React, { useContext, useEffect, useState } from 'react'
import Adminnavbar from './Adminnavbar'
import { productvalidationschema } from '../Schema/Validationschema'
import { Admincontext } from '../Context/Admincontxt'
import { HiFolderAdd } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { Formik, Field, Form, ErrorMessage } from 'formik'

function Adminproducts() {
  console.log("product")
  const { product, categories, AddProduct, DeleteProduct, EditProduct } = useContext(Admincontext)
  const [addproduct, setaddproduct] = useState(false)
  const [editproduct, seteditproduct] = useState(null)
  const [filterproduct, setfilterproduct] = useState([])
  const [filtercategories, setfiltercategories] = useState([])
  const [selectedcategory, setselectedcategory] = useState('All')

  const initialValues = {
    name: "",
    price: "",
    quantity: "",
    category: "",
    url: ""
  }

  const onSubmit = (values, { resetForm }) => {
    AddProduct(values)
    resetForm()
    setaddproduct(false)
  }

  const editSubmit = (values, { resetForm }) => {
    console.log(values)
    EditProduct(values)
    resetForm()
    seteditproduct(null)
  }

  useEffect(() => {
    setfiltercategories(['All', ...categories]);
    setfilterproduct(product);
  }, [product, categories]);

  const handlecategory = (e) => {
    const value = e.target.value;
    setselectedcategory(value)
    if (value === 'All') {
      setfilterproduct(product)
    }
    else {
      setfilterproduct(product.filter((item) => item.category === value))
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      <div className="w-64 bg-white shadow-md fixed h-full overflow-y-auto">
        <Adminnavbar />
      </div>


      <div className="ml-64 w-full p-6 overflow-x-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left lg:text-4xl">
          Products
        </h1>


        <div className="mb-6 flex justify-between items-center space-x-4">
          <select
            onChange={handlecategory}
            value={selectedcategory}
            className="p-2 rounded-md border border-gray-300 bg-white shadow-sm text-gray-700 focus:outline-none w-48"
          >
            {filtercategories.map((item, index) => (
              <option key={index} value={item} className="bg-white text-gray-700 hover:bg-blue-100">
                {item}
              </option>
            ))}
          </select>
          <HiFolderAdd
            className="text-5xl cursor-pointer hover:text-blue-800 transition duration-200"
            onClick={() => setaddproduct(true)}
          />
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg w-full mb-10">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left text-sm font-semibold text-gray-700">
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterproduct.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm text-gray-800">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{product.quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">₹ {product.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{product.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{product.category}</td>
                  <td className="py-4">
                    <img className="w-24 h-24 object-cover rounded" src={product.url} alt={product.name} />
                  </td>
                  <td className="px-6 py-2 text-md text-center">
                    <div className='flex flex-col items-center space-y-2'>
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded w-20"
                        onClick={() => seteditproduct(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded w-20"
                        onClick={() => DeleteProduct(product.id)}
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





        {addproduct && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-xl w-full  sm:max-w-md mx-4 max-h-[90%] sm:max-wd-md overflow-y-auto ">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-semibold">Add New Product</h2>
                <IoMdClose
                  className="text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
                  onClick={() => setaddproduct(false)}
                />
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={productvalidationschema}
                onSubmit={onSubmit}
              >
                <Form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Product Name
                    </label>
                    <Field
                      name="name"
                      type="text"
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <Field
                      name="price"
                      type="number"
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <Field
                      name="quantity"
                      type="number"
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <Field
                      name="description"
                      type="text"
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <Field
                      name="category"
                      type="text"
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <Field
                      name="url"
                      type="text"
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="url" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        )}


        {editproduct && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-xl w-full  sm:max-w-md mx-4 max-h-[90%] sm:max-wd-md overflow-y-auto ">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Edit Product</h2>
                <IoMdClose
                  className="text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
                  onClick={() => seteditproduct(null)}
                />
              </div>

              <Formik
                initialValues={{
                  id: editproduct.id,
                  name: editproduct.name,
                  price: editproduct.price,
                  quantity: editproduct.quantity,
                  description: editproduct.description,
                  category: editproduct.category,
                  url: editproduct.url
                }}
                validationSchema={productvalidationschema}
                onSubmit={editSubmit}
              >
                <Form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Product Name
                    </label>
                    <Field name="name" type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <Field name="price" type="number" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                    <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <Field name="quantity" type="number" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                    <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <Field name="description" type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <Field name="category" type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                    <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <Field name="url" type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                    <ErrorMessage name="url" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="flex justify-center">
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600">
                      Submit
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Adminproducts;
