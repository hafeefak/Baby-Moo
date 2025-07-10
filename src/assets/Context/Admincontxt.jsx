import { createContext, useEffect, useState } from "react";
import api from "../../api/axiosConfig"; // your secure axios instance
import { toast } from "react-toastify";

export const Admincontext = createContext();

const Adminprovider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProductsSold, setTotalProductsSold] = useState(0);

 useEffect(() => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    fetchProducts();
    fetchTotalRevenue();
    fetchTotalProductsSold();
  }
}, []);

  // ✅ Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await api.get("/Product");
      setProduct(response.data.data || []);
      setCategories([
        ...new Set(response.data.data.map((p) => p.categoryName))
      ]);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products");
    }
  };

  // ✅ Fetch total revenue
  const fetchTotalRevenue = async () => {
    try {
      const res = await api.get("/orders/total-revenue");
      setTotalRevenue(res.data.data || 0);
    } catch (error) {
      console.error("Failed to fetch revenue:", error);
      toast.error("Failed to fetch revenue");
    }
  };

  // ✅ Fetch total products sold
  const fetchTotalProductsSold = async () => {
    try {
      const res = await api.get("/orders/total-products");
      setTotalProductsSold(res.data.data || 0);
    } catch (error) {
      console.error("Failed to fetch total products:", error);
      toast.error("Failed to fetch total products");
    }
  };

  // ✅ Add new product
  const AddProduct = async (newProduct) => {
    try {
      const formData = new FormData();
      formData.append("ProductName", newProduct.productName);
      formData.append("Description", newProduct.description);
      formData.append("Price", newProduct.price);
      formData.append("Quantity", newProduct.quantity);
      formData.append("CategoryId", newProduct.categoryId); // ✅ correct
      formData.append("Image", newProduct.image); // file

      await api.post("/Product", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("New product added successfully");
      fetchProducts();
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };

  // ✅ Edit product
  const EditProduct = async (updatedProduct) => {
    try {
      const formData = new FormData();
      formData.append("ProductId", updatedProduct.productId); // backend may need it
      formData.append("ProductName", updatedProduct.productName);
      formData.append("Description", updatedProduct.description);
      formData.append("Price", updatedProduct.price);
      formData.append("Quantity", updatedProduct.quantity);
      formData.append("CategoryId", updatedProduct.categoryId); // ✅ correct

      if (updatedProduct.image instanceof File) {
        formData.append("Image", updatedProduct.image);
      }

      await api.put(`/Product/${updatedProduct.productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Product updated successfully");
      fetchProducts();
    } catch (error) {
      console.error("Failed to edit product:", error);
      toast.error(error.response?.data?.message || "Failed to edit product");
    }
  };

  // ✅ Delete product
  const DeleteProduct = async (id) => {
    try {
      await api.delete(`/Product/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <Admincontext.Provider
      value={{
        product,
        categories,
        totalRevenue,
        totalProductsSold,
        AddProduct,
        DeleteProduct,
        EditProduct
      }}
    >
      {children}
    </Admincontext.Provider>
  );
};

export default Adminprovider;
