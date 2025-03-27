import {useEffect ,useContext,createContext, useState} from "react"
import axios from "axios"
import {toast} from "react-toastify"

export      const Admincontext=createContext()
const Adminprovider=({children})=>{
    const[product,setProduct]=useState([])
    const[categories,setCategories]=useState([])
    const [logged,setLogged]=useState(null)


    useEffect(()=>{
        const Fetchdata=async ()=>{
            try{
                const response=await axios.get("http://localhost:5001/products")
                setCategories([...new Set(response.data.map((p)=>p.category))])
                setProduct(response.data)
                console.log(response);
                
            }
            catch(error){
                console.log(error.message)
            }
        }
        Fetchdata();

    },[])


    const addProduct=async (newproduct)=>{
        try{
            await axios.post("http://localhost:5001/products",newproduct)
            setProduct(prevProducts=>[...prevProducts,newproduct])
            toast.success("new product added succesfully")
        }
        catch(error){
                console.log(error.message)
        }
    }

    const deleteProduct=async(id)=>{
        try{
            await axios.delete(`http://localhost:5001/products/${id}`)
            const update=product.filter((item)=>item.id!==id)
            setProduct(update)
            toast.success("deleted succesfully")
        }
        catch(error){
            console.log(error.message)
    }
    }

    const editProduct=async(product)=>{
        try{
            const id=product.id 
            const response=await axios.put(`http://localhost:5001/products/${id}`,product)
            setProduct((prevProducts)=>prevProducts.map((item)=>item.id===id?response.data:item))
            toast.success("item updated successfully")
        }
        catch(error){
            console.log(error.message)
        }
        
   }

   return (
    <Admincontext.Provider value={{
        logged,
        setLogged,
        product,
        categories,
        addProduct,
        deleteProduct,
        editProduct

    }}>
        {children}
        </Admincontext.Provider>
   )
}
export default Adminprovider