import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";


// func for Add Product
const addProduct = async (req,res) => {
    try {
        const{name,description,price,category,subCategory,sizes,bestseller} = req.body;
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=> item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resourse_type:'image'});
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            image:imagesUrl,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({sucess:true, message: "Product Added"})

    } catch (error) {
        console.log(error)
        res.json({sucess:false, message:error.message })
    }
}


// func for List Product
const listProducts = async (req,res) => {
    try {
        const products = await productModel.find({});
        res.json({sucess:true,products})
    } catch (error) {
        console.log(error)
        res.json({sucess:false, message:error.message })
    }
}


// func for Remove Product
const removeProduct = async (req,res) => {
    
}


// func for Single Product Info
const singleProduct = async (req,res) => {
    
}



export {addProduct,listProducts,removeProduct,singleProduct}