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

mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

const app = express()
app.use(bodyParser.json())
app.use(cors({
  origin (origin, callback) {
    console.log(origin)
    if (origin === undefined) {
      callback(null, true)
    } else {
      if (process.env.DEV === 'true' || origin.includes('github')) {
        callback(null, true)
      } else {
        callback(new Error('Not Allowed'), false)
      }
    }
  },
  credentials: true
}))
const MongoStore = connectMongo(session)
const sessionSettings = {
  secret: '549449',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    maxAge: 1000 * 60 * 30,
    domain: 'vue-hiker.herokuapp.com'
  },
  saveUninitialized: false,
  rolling: true,
  resave: true
}
if (process.env.DEV === 'false') {
  sessionSettings.cookie.sameSite = 'none'
  sessionSettings.cookie.secure = true
}
app.use(session(sessionSettings))

app.set('trust proxy', 1)

app.use('/users', routeUser)
app.use('/admin', routeAdmin)
app.use('/products', routeProduct)
app.use('/order', routeOrder)

app.use((_, req, res, next) => {
  res.status(500).send({ success: false, message: '伺服器錯誤' })
})

app.listen(process.env.PORT, () => {
  console.log('server started')
})
process.on('uncaughtException', function (err) {
  console.log('ERROR is ' + err)
})
// console.log(process.env.DEV.trim() === 'true')
