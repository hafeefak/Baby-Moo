import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const Fetch = createContext();

export default function FetchContext({ children }) {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5001/products");
                console.log("Fetched data:", response.data);
                setProductList(response.data);
            } catch (error) {
                console.error("Error fetching the products", error);
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
