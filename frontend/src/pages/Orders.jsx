import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {

  const { backendUrl, token, currency, products } = useContext(ShopContext);

  const [orderData, setorderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!token){
        setLoading(false);
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {},{headers:{token}})
      if (response.data.success){
        let allOrdersItem = [ ]
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
    } catch (error) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  if (loading || !products || products.length === 0) {
    return <div className='border-t pt-16'><Title text1={'MY'} text2={'ORDERS'} /><div>Loading orders...</div></div>;
  }

  if (!orderData || orderData.length === 0) {
    return <div className='border-t pt-16'><Title text1={'MY'} text2={'ORDERS'} /><div>No orders found.</div></div>;
  }

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {
          orderData.map((item,index)=>{
            const product = products.find(p => p._id === item._id);
            return (
              <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white">
                <div className="flex items-start gap-6 text-sm">
                  <img src={product && product.image ? product.image[0] : ''} className="w-16 sm:w-20 rounded-md object-cover" alt="" />
                  <div>
                    <p className="sm:text-base font-medium">{product ? product.name : 'Product unavailable'}</p>
                    <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                      <p>{currency} {product ? product.price : '-'}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                    <p className="mt-1 text-xs">
                      Date: <span className='text-gray-500'>{new Date(item.date).toDateString()}</span>
                    </p>
                    <p className="mt-1 text-xs">
                      Payment: <span className='text-gray-500'>{item.paymentMethod}</span>
                    </p>
                  </div>
                </div>
                <div className='md:w-1/2 flex justify-between'>
                  <div className='flex items-center gap-2'>
                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                    <p className='text-sm md:text-base'>{item.status}</p>
                  </div>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Orders