import React from 'react'
import { Routes,Route, useParams } from 'react-router-dom'
import { assets} from '../assets/assets'
import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import RelatedProducts from '../components/RelatedProducts'


const Product = () => {

  const {productId} = useParams();
  const {products, currency} = useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const [image,setImage] = useState('');
  const [size,setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item)=>{
      if(item._id === productId){
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(()=>{
    fetchProductData();
  },[productId, products])



  return productData ? (

    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* Product Details */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>

          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>

          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>

        </div>

        {/* Product Details */}
        <div className='flex-1'>

          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} className='w-3 5' alt="" />
            <img src={assets.star_icon} className='w-3 5' alt="" />
            <img src={assets.star_icon} className='w-3 5' alt="" />
            <img src={assets.star_icon} className='w-3 5' alt="" />
            <img src={assets.star_dull_icon} className='w-3 5' alt="" />

            <p className='pl-2'>(120)</p>

          </div>

          <p className='mt-5 text-3xl font-medium'>{currency} {productData.price}</p>

          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>{productData.sizes.map((item,index)=>(<button onClick={()=>setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100 ${size === item ? 'border-orange-500' : ''}`}>{item}</button>))}</div>
          </div>

          <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>

          <hr className='mt-8 sm:w-4/5' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash on delivery is avalable on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>

        </div>

      </div>

      {/* Description & Reviews Section */}
      <div className='mt-20'>

        <div className='flex'>
            <b className='border px-5 py-3 text-sm'>Description</b>
            <p className='border px-5 py-3 text-sm'>Reviews (120)</p>
        </div>

        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>We bring you products that combine quality, style, and practicality in every detail. 
            Designed to fit seamlessly into your everyday life, each item is crafted with care and tested for 
            durability to ensure long-lasting use. Whether for yourself or as a gift, 
            our products deliver the perfect balance of form and function.
          </p>
          <p>Discover a range of products made to meet your daily needs while adding a touch of convenience and elegance. 
            With a focus on customer satisfaction, we offer items that are versatile, 
            easy to use, and thoughtfully designed to suit a variety of lifestyles and preferences.
          </p>
        </div>
      </div>



      {/* Related Products Section */}
      <RelatedProducts category={productData.category} subcategory={productData.subCategory} />
      

    </div>

  ) : <div className='opacity-0'></div>

}

export default Product