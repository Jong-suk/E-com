import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import farmerRoutes from './routes/farmerRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

const PORT = process.env.PORT || 5000

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('App is running..')
})

app.use('/api/orders', orderRoutes)
app.use('/api/products', productRoutes)
app.use('/api/farmers', farmerRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)

app.use(errorHandler)

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))