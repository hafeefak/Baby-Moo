import { createContext, useEffect, useState, useCallback } from "react";
import api from "../../api/axiosConfig";
import { toast } from "react-toastify";
import { isAdmin } from "../../Utils/Auth";

export const Admincontext = createContext();

const Adminprovider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("auth_token");

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      const res = await api.get("/Product");
      setProduct(res.data.data || []);
    } catch (error) {
      if (![401, 403].includes(error.response?.status)) {
        toast.error("Failed to fetch products");
      }
    }
  }, []);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const res = await api.get("/Category");
      setCategories(res.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  }, []);

  // Add product
  const AddProduct = async (newProduct) => {
    try {
      const formData = new FormData();
      formData.append("ProductName", newProduct.productName);
      formData.append("Description", newProduct.description);
      formData.append("Price", newProduct.price);
      formData.append("Quantity", newProduct.quantity);
      formData.append("CategoryName", newProduct.categoryName); // ✅ direct use
      formData.append("Image", newProduct.image);

      await api.post("/Product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("✅ Product added!");
      await fetchProducts();
    } catch (error) {
      console.error("AddProduct error:", error.response?.data || error.message);
      toast.error("❌ Failed to add product");
    }
  };

  // Edit product
 const EditProduct = async (updatedProduct) => {
  try {
    const formData = new FormData();
    formData.append("ProductName", updatedProduct.productName);
    formData.append("Description", updatedProduct.description);
    formData.append("Price", updatedProduct.price);
    formData.append("Quantity", updatedProduct.quantity);
    formData.append("CategoryName", updatedProduct.categoryName);

    if (updatedProduct.image instanceof File) {
      formData.append("Image", updatedProduct.image);
    }

    await api.put(`/Product/${updatedProduct.productId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success("✅ Product updated!");
    await fetchProducts();
  } catch (error) {
    console.error("EditProduct error:", error.response?.data || error);
    toast.error("❌ Failed to update product");
  }
};


  // Delete product
  const DeleteProduct = async (id) => {
    try {
      await api.delete(`/Product/${id}`);
      toast.success("✅ Product deleted!");
      await fetchProducts();
    } catch (error) {
      toast.error("❌ Failed to delete product");
    }
  };

  // Add category
  const AddCategory = async (categoryName) => {
    try {
      await api.post("/Category", { categoryName });
      toast.success("✅ Category added!");
      await fetchCategories();
    } catch (error) {
      toast.error("❌ Failed to add category");
    }
  };

  // Initial load
  useEffect(() => {
    if (token && isAdmin()) {
      fetchProducts();
      fetchCategories();
    }
  }, [token, fetchProducts, fetchCategories]);

  return (
    <Admincontext.Provider
      value={{
        product,
        categories,
        AddProduct,
        EditProduct,
        DeleteProduct,
        AddCategory,
      }}
    >
      {children}
    </Admincontext.Provider>
  );
};

export default Adminprovider;
