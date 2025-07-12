import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


//  Placing order using COD method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const orderData = {
            userId,
            items,
            amount,
            address,
            status: 'Order Placed',
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, {cartData:{}})
        res.status(200).json({ success: true, message: 'Order Placed Successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Failed To Place Order'})
    }
}



//  Placing order using Visamaster method
const placeOrderVisamaster = async (req, res) => {
    
}



// All orders data for Admin PAnel
const allOrders = async (req, res) => {

}


// User Order for Frontend
const userOrders = async (req, res) => {
    try {
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


// Update Order Status from Admin Panel
const updateStatus = async (req, res) => {

}




export {
    placeOrder,
    placeOrderVisamaster,
    allOrders,
    userOrders,
    updateStatus
}