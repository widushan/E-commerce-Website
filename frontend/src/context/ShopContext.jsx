import React, { createContext, use, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "Rs.";
    const delivery_fee = 100;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token,setToken] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate();


    const addToCart = async(itemId,size) => {

        if (!size){
            toast.error('Please select a Size');
            return;
        }

        let  cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    }



    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async(itemId,size,quantity) => {

        let  cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find(product => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += (itemInfo.price * cartItems[items][item]);
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }


    const getProductsData = async () => {
        try {
            console.log('Fetching products from:', backendUrl + '/api/product/list')
            const response = await axios.get(backendUrl + '/api/product/list')
            console.log('Response:', response.data)
            if (response.data.success){
                setProducts(response.data.products)
                console.log('Products set:', response.data.products)
            } else {
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log('Error fetching products:', error)
            toast.error(error.response?.data?.message || error.message || 'Failed to fetch products')
        }
    }

    const logout = () => {
        setToken('')
        localStorage.removeItem('token')
        toast.success('Logged out successfully!')
        navigate('/')
    } 

    useEffect(()=>{
        getProductsData()
    },[])

    useEffect(()=>{
        if (!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
        }
    },[])


    const value = {
        products, currency, delivery_fee,
        search, setSearch,
        showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount, updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken, token, logout
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;


