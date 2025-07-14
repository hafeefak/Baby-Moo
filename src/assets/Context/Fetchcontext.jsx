import React, { createContext, useState, useEffect } from 'react';
import api from '../../api/axiosConfig';

export const Fetch = createContext();

export default function FetchContext({ children }) {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/Product");
        if (response.data?.statusCode === 200) {
          setProductList(response.data.data);
        } else {
          console.error("Failed to fetch products:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Fetch.Provider value={{ productList, setProductList }}>
      {children}
    </Fetch.Provider>
  );
}
