import React, { useContext, useEffect, useState } from 'react';
import { Admincontext } from '../Context/Admincontxt';
import { productvalidationschema } from '../Schema/Validationschema';
import { HiFolderAdd } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Adminnavbar from './Adminnavbar';

const initialValues = {
  productName: "",
  price: "",
  quantity: "",
  description: "",
  categoryName: "",
  image: null
};

function Adminproducts() {
  const { product, categories, AddProduct, EditProduct, DeleteProduct, AddCategory } = useContext(Admincontext);
  const [addproduct, setaddproduct] = useState(false);
  const [editproduct, seteditproduct] = useState(null);
  const [filterproduct, setfilterproduct] = useState([]);
  const [selectedcategory, setselectedcategory] = useState('All');
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    setfilterproduct(product);
  }, [product]);

  // Filter by category name
  const handlecategory = (e) => {
    const value = e.target.value;
    setselectedcategory(value);
    if (value === 'All') {
      setfilterproduct(product);
    } else {
      setfilterproduct(product.filter((p) => p.categoryName === value));
    }
  };

  // Submit handlers
  const handleAddSubmit = async (values, { resetForm }) => {
    await AddProduct(values);
    resetForm();
    setaddproduct(false);
  };

  const handleEditSubmit = async (values, { resetForm }) => {
    await EditProduct(values);
    resetForm();
    seteditproduct(null);
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
          <select onChange={handlecategory} value={selectedcategory} className="p-2 border rounded w-48">
            <option value="All">All</option>
            {categories.map((c) => (
              <option key={c.categoryId} value={c.categoryName}>{c.categoryName}</option>
            ))}
          </select>
          <div className="flex items-center gap-3">
            <HiFolderAdd className="text-5xl cursor-pointer hover:text-blue-800" onClick={() => setaddproduct(true)} />
            <button onClick={() => setAddCategoryModal(true)} className="bg-blue-500 text-white px-3 py-1 rounded">+ Add Category</button>
          </div>
        </div>

        {/* Product Table */}
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
                  <td className="py-4">
                    <img className="w-20 h-20 object-cover" src={p.imageUrl} alt="" />
                  </td>
                  <td className="px-6 py-2 flex flex-col items-center gap-2">
                    <button className="bg-green-500 text-white px-4 py-1 rounded" onClick={() => seteditproduct(p)}>Edit</button>
                    <button className="bg-red-500 text-white px-4 py-1 rounded" onClick={() => DeleteProduct(p.productId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Product Modal */}
        {addproduct && (
          <Modal title="Add Product" close={() => setaddproduct(false)}>
            <Formik initialValues={initialValues} validationSchema={productvalidationschema} onSubmit={handleAddSubmit}>
              {({ setFieldValue }) => (
                <Form className="space-y-2">
                  <FieldBlock name="productName" label="Product Name" />
                  <FieldRow>
                    <FieldBlock name="price" label="Price (₹)" type="number" />
                    <FieldBlock name="quantity" label="Quantity" type="number" />
                  </FieldRow>
                  <FieldBlock as="textarea" name="description" label="Description" rows={3} />
                  <div>
                    <label className="block mb-1 font-medium">Category</label>
                    <Field as="select" name="categoryName" className="w-full border p-2 rounded">
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c.categoryId} value={c.categoryName}>{c.categoryName}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="categoryName" component="div" className="text-red-500 text-xs" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Product Image</label>
                    <input type="file" onChange={(e) => setFieldValue("image", e.target.files[0])} />
                  </div>
                  <ModalActions submitText="Add Product" onCancel={() => setaddproduct(false)} />
                </Form>
              )}
            </Formik>
          </Modal>
        )}

        {/* Edit Product Modal */}
        {editproduct && (
          <Modal title="Edit Product" close={() => seteditproduct(null)}>
            <Formik initialValues={editproduct} validationSchema={productvalidationschema} onSubmit={handleEditSubmit} enableReinitialize>
              {({ setFieldValue, values }) => (
                <Form className="space-y-2">
                  <FieldBlock name="productName" label="Product Name" />
                  <FieldRow>
                    <FieldBlock name="price" label="Price (₹)" type="number" />
                    <FieldBlock name="quantity" label="Quantity" type="number" />
                  </FieldRow>
                  <FieldBlock as="textarea" name="description" label="Description" rows={3} />
                  <div>
                    <label className="block mb-1 font-medium">Category</label>
                    <Field as="select" name="categoryName" className="w-full border p-2 rounded">
               <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.categoryId} value={c.categoryName}>{c.categoryName}</option>
              ))}
              </Field>

                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Product Image</label>
                    <div className="flex items-center gap-3">
                      {values.imageUrl && <img src={values.imageUrl} alt="" className="w-20 h-20 object-cover rounded" />}
                      <input type="file" onChange={(e) => setFieldValue("image", e.target.files[0])} />
                    </div>
                  </div>
                  <ModalActions submitText="Update Product" onCancel={() => seteditproduct(null)} />
                </Form>
              )}
            </Formik>
          </Modal>
        )}

        {/* Add Category Modal */}
        {addCategoryModal && (
          <Modal title="Add New Category" close={() => setAddCategoryModal(false)}>
            <div className="space-y-4">
              <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Category name" className="w-full border p-2 rounded" />
              <ModalActions submitText="Add Category" onCancel={() => setAddCategoryModal(false)} onSubmit={async () => {
                if (!newCategory.trim()) return toast.error("Category name required");
                await AddCategory(newCategory.trim());
                setNewCategory("");
                setAddCategoryModal(false);
              }} />
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

// ✅ Helper components
const Modal = ({ title, children, close }) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded w-full max-w-md">
      <div className="flex justify-between mb-2">
        <h2 className="font-semibold">{title}</h2>
        <IoMdClose onClick={close} className="cursor-pointer text-xl" />
      </div>
      {children}
    </div>
  </div>
);

const FieldBlock = ({ name, label, ...props }) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <Field name={name} {...props} className="w-full border p-2 rounded" />
    <ErrorMessage name={name} component="div" className="text-red-500 text-xs" />
  </div>
);

const FieldRow = ({ children }) => (
  <div className="grid grid-cols-2 gap-4">{children}</div>
);

const ModalActions = ({ onCancel, submitText, onSubmit }) => (
  <div className="flex justify-end gap-2">
    <button type="button" onClick={onCancel} className="px-3 py-1 bg-gray-200 rounded">Cancel</button>
    {onSubmit ? (
      <button type="button" onClick={onSubmit} className="px-3 py-1 bg-blue-600 text-white rounded">{submitText}</button>
    ) : (
      <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">{submitText}</button>
    )}
  </div>
);

export default Adminproducts;
