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

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', 
                    {itemId,size}, {headers:{token}} )
                toast.success('Product added to cart successfully!');
            } catch (error) {
                console.log(error)
                toast.error('Failed to add product to cart')
                // Revert the local cart state if backend fails
                setCartItems(cartItems);
            }
        }
    }



    const getCartCount = () => {
        let totalCount = 0;
        if (!cartItems || typeof cartItems !== 'object') return totalCount;
        
        for(const items in cartItems){
            if (cartItems[items] && typeof cartItems[items] === 'object'){
                for(const item in cartItems[items]){
                    try {
                        if (cartItems[items][item] > 0) {
                            totalCount += cartItems[items][item];
                        }
                    } catch (error) {
                        console.log('Error calculating cart count:', error)
                    }
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async(itemId,size,quantity) => {

        let  cartData = structuredClone(cartItems);
        
        if (quantity === 0) {
            if (cartData[itemId] && cartData[itemId][size]) {
                delete cartData[itemId][size];
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }
        } else {
            if (!cartData[itemId]) {
                cartData[itemId] = {};
            }
            cartData[itemId][size] = quantity;
        }
        
        setCartItems(cartData)

        if (token){
            try {
                await axios.post(backendUrl + '/api/cart/update', 
                    {itemId,size,quantity}, {headers:{token}} )
                if (quantity === 0) {
                    toast.success('Product removed from cart successfully!');
                } else {
                    toast.success('Product quantity updated successfully!');
                }
            } catch (error) {
                console.log(error)
                toast.error('Failed to update product quantity')
                // Revert the local cart state if backend fails
                setCartItems(cartItems);
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        if (!cartItems || typeof cartItems !== 'object') return totalAmount;
        
        for (const items in cartItems) {
            let itemInfo = products.find(product => product._id === items);
            if (cartItems[items] && typeof cartItems[items] === 'object'){
                for (const item in cartItems[items]) {
                    try {
                        if (cartItems[items][item] > 0 && itemInfo && itemInfo.price) {
                            totalAmount += (itemInfo.price * cartItems[items][item]);
                        }
                    } catch (error) {
                        console.log('Error calculating cart amount:', error)
                    }
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


    // cart data stay safe when page refreshing
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get',{}, {headers:{token}})
            if (response.data.success){
                setCartItems(response.data.cartData || {})
            } else {
                toast.error(response.data.message)
            } 
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductsData()
    },[])

    useEffect(()=>{
        if (token){
            getUserCart(token)
        } else if (localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
        }
    },[token])


    const value = {
        products, currency, delivery_fee,
        search, setSearch,
        showSearch, setShowSearch,
        cartItems, setCartItems, addToCart,
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


