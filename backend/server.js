import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';



// App Config
const app = express();
const port = process.env.PORT || 4000
connectCloudinary()

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection Middleware for Serverless
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send("API Working")
})

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () =>
        console.log('Server Started on PORT :' + port))
}

export default app;
