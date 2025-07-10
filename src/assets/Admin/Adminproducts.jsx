import React, { useContext, useEffect, useState } from 'react';
import Adminnavbar from './Adminnavbar';
import { productvalidationschema } from '../Schema/Validationschema';
import { Admincontext } from '../Context/Admincontxt';
import { HiFolderAdd } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Adminproducts() {
  const { product, categories, AddProduct, DeleteProduct, EditProduct } = useContext(Admincontext);
  const [addproduct, setaddproduct] = useState(false);
  const [editproduct, seteditproduct] = useState(null);
  const [filterproduct, setfilterproduct] = useState([]);
  const [selectedcategory, setselectedcategory] = useState('All');

  const initialValues = {
    productName: "",
    price: "",
    quantity: "",
    description: "",
    categoryId: "",
    image: null
  };

  useEffect(() => {
    setfilterproduct(product);
  }, [product]);

  const handlecategory = (e) => {
    const value = e.target.value;
    setselectedcategory(value);
    if (value === 'All') {
      setfilterproduct(product);
    } else {
      setfilterproduct(product.filter((item) => item.categoryName === value));
    }
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("ProductName", values.productName);
      formData.append("Price", values.price);
      formData.append("Quantity", values.quantity);
      formData.append("Description", values.description);
      formData.append("CategoryId", values.categoryId);
      formData.append("Image", values.image);
      await AddProduct(formData);
      toast.success('✅ Product added successfully!');
      resetForm();
      setaddproduct(false);
    } catch {
      toast.error('❌ Failed to add product');
    }
  };

  const editSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("ProductId", values.productId);
      formData.append("ProductName", values.productName);
      formData.append("Price", values.price);
      formData.append("Quantity", values.quantity);
      formData.append("Description", values.description);
      formData.append("CategoryId", values.categoryId);
      if (values.image instanceof File) {
        formData.append("Image", values.image);
      }
      await EditProduct(formData);
      toast.success('✅ Product updated successfully!');
      resetForm();
      seteditproduct(null);
    } catch {
      toast.error('❌ Failed to update product');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ToastContainer position="top-center" autoClose={2500} />
      <div className="w-64 bg-white shadow-md fixed h-full overflow-y-auto">
        <Adminnavbar />
      </div>
      <div className="ml-64 w-full p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

        <div className="mb-6 flex justify-between items-center">
          <select onChange={handlecategory} value={selectedcategory}
            className="p-2 border rounded w-48">
            <option value="All">All</option>
            {categories.map((c, idx) => (
              <option key={idx} value={c}>{c}</option>
            ))}
          </select>
          <HiFolderAdd className="text-5xl cursor-pointer hover:text-blue-800" onClick={() => setaddproduct(true)} />
        </div>

        <div className="overflow-x-auto bg-white shadow rounded mb-10">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 text-left text-sm font-semibold">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterproduct.map((p) => (
                <tr key={p.productId} className="border-b">
                  <td className="px-6 py-4">{p.productName}</td>
                  <td className="px-6 py-4">{p.quantity}</td>
                  <td className="px-6 py-4">₹ {p.price}</td>
                  <td className="px-6 py-4">{p.description}</td>
                  <td className="px-6 py-4">{p.categoryName}</td>
                  <td className="py-4"><img className="w-20 h-20 object-cover" src={p.imageUrl} alt="" /></td>
                  <td className="px-6 py-2 flex flex-col items-center gap-2">
                    <button className="bg-green-500 text-white px-4 py-1 rounded" onClick={() => seteditproduct(p)}>Edit</button>
                    <button className="bg-red-500 text-white px-4 py-1 rounded" onClick={() => DeleteProduct(p.productId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Product Modal - Updated Form Style */}
        {addproduct && (
          <Modal title="Add New Product" close={() => setaddproduct(false)}>
            <Formik initialValues={initialValues} validationSchema={productvalidationschema} onSubmit={onSubmit}>
              {({ setFieldValue, isSubmitting }) => (
               <Form className="space-y-5">
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
    <Field 
      name="productName"
      placeholder="Enter product name"
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <ErrorMessage name="productName" component="div" className="text-red-500 text-xs mt-1" />
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹)</label>
      <Field 
        name="price"
        type="number"
        placeholder="0.00"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ErrorMessage name="price" component="div" className="text-red-500 text-xs mt-1" />
    </div>
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">Quantity</label>
      <Field 
        name="quantity"
        type="number"
        placeholder="0"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ErrorMessage name="quantity" component="div" className="text-red-500 text-xs mt-1" />
    </div>
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
    <Field 
      as="textarea"
      name="description"
      placeholder="Enter product description"
      rows={3}
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
    <Field 
      as="select"
      name="categoryId"
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select Category</option>
      {categories.map((c, idx) => (
        <option key={idx} value={c.categoryId}>{c}</option>
      ))}
    </Field>
    <ErrorMessage name="categoryId" component="div" className="text-red-500 text-xs mt-1" />
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">Product Image</label>
    <input 
      type="file"
      onChange={(e) => setFieldValue("image", e.target.files[0])}
      className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        hover:file:bg-blue-100"
    />
  </div>

  <div className="flex justify-end gap-3 pt-2">
    <button
      type="button"
      onClick={() => setaddproduct(false)}
      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={isSubmitting}
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {isSubmitting ? 'Adding...' : 'Add Product'}
    </button>
  </div>
</Form>

              )}
            </Formik>
          </Modal>
        )}

        {/* Edit Product Modal - Updated Form Style */}
        {editproduct && (
          <Modal title="Edit Product" close={() => seteditproduct(null)}>
            <Formik 
              initialValues={editproduct} 
              validationSchema={productvalidationschema} 
              onSubmit={editSubmit}
              enableReinitialize
            >
              {({ setFieldValue, isSubmitting, values }) => (
                <Form className="space-y-5">
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
    <Field 
      name="productName"
      placeholder="Enter product name"
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <ErrorMessage name="productName" component="div" className="text-red-500 text-xs mt-1" />
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹)</label>
      <Field 
        name="price"
        type="number"
        placeholder="0.00"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ErrorMessage name="price" component="div" className="text-red-500 text-xs mt-1" />
    </div>
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">Quantity</label>
      <Field 
        name="quantity"
        type="number"
        placeholder="0"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ErrorMessage name="quantity" component="div" className="text-red-500 text-xs mt-1" />
    </div>
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
    <Field 
      as="textarea"
      name="description"
      placeholder="Enter product description"
      rows={3}
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
    <Field 
      as="select"
      name="categoryId"
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select Category</option>
      {categories.map((c, idx) => (
        <option key={idx} value={c.categoryId}>{c}</option>
      ))}
    </Field>
    <ErrorMessage name="categoryId" component="div" className="text-red-500 text-xs mt-1" />
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">Product Image</label>
    <div className="flex flex-col sm:flex-row items-start gap-4">
      {values.imageUrl && (
        <img 
          src={values.imageUrl} 
          alt="Current" 
          className="w-28 h-28 object-contain border rounded"
        />
      )}
      <input 
        type="file"
        onChange={(e) => setFieldValue("image", e.target.files[0])}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
    </div>
    <p className="text-xs text-gray-500 mt-1">Leave blank to keep current image</p>
  </div>

  <div className="flex justify-end gap-3 pt-2">
    <button
      type="button"
      onClick={() => seteditproduct(null)}
      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={isSubmitting}
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {isSubmitting ? 'Updating...' : 'Update Product'}
    </button>
  </div>
</Form>

              )}
            </Formik>
          </Modal>
        )}
      </div>
    </div>
  );
}

// Modal component remains the same as original
const Modal = ({ title, children, close }) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded w-full max-w-md">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold">{title}</h2>
        <IoMdClose className="text-2xl cursor-pointer" onClick={close} />
      </div>
      {children}
    </div>
  </div>
);

export default Adminproducts;