import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import connectMongo from 'connect-mongo'
import cors from 'cors'
import session from 'express-session'
import routeUser from './routes/user.js'
import routeAdmin from './routes/admin.js'
import routeProduct from './routes/product.js'
import routeOrder from './routes/order.js'

const app = express()

app.use(bodyParser.json())
app.use(cors({
  origin (origin, callback) {
    if (origin === undefined || process.env.DEV === 'true' || origin.includes('github')) {
      callback(null, true)
    } else {
      callback(new Error('Not Allowed'), false)
    }
  },
  credentials: true
}))

const MongoStore = connectMongo(session)
const sessionSettings = {
  secret: '549449',
  cookie: {
    maxAge: 1000 * 60 * 30
  },
  saveUninitialized: false,
  rolling: true,
  resave: true
}

if (process.env.DEV === 'false') {
  sessionSettings.cookie.sameSite = 'none'
  sessionSettings.cookie.secure = true
}

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DBURL)
    console.log('MongoDB Connected Successfully')

    sessionSettings.store = new MongoStore({ mongooseConnection: mongoose.connection })
    app.use(session(sessionSettings))

    app.set('trust proxy', 1)

    app.use('/users', routeUser)
    app.use('/admin', routeAdmin)
    app.use('/products', routeProduct)
    app.use('/order', routeOrder)

    app.use((err, req, res, next) => {
      console.error('Error:', err)
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    })

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (err) {
    console.error('Startup Error:', {
      name: err.name,
      message: err.message,
      stack: err.stack
    })
    process.exit(1)
  }
}

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', {
    name: err.name,
    message: err.message,
    stack: err.stack
  })
  process.exit(1)
})

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', {
    name: err.name,
    message: err.message,
    stack: err.stack
  })
  process.exit(1)
})

connectDB().catch(console.error)
