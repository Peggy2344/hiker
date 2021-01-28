import mongoose from 'mongoose'

const Schema = mongoose.Schema

const orderProductSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products'
  },
  detailId: {
    type: mongoose.Schema.Types.ObjectId
  },
  quantity: {
    type: Number,
    required: true
  }
})

const orderSchema = new Schema({
  date: {
    type: Date
  },
  checkoutStatus: {
    type: Boolean,
    required: true,
    default: false
  },
  handleStatus: {
    type: String,
    default: 'process'
  },
  status: {
    type: String,
    default: '處理中'
  },
  delivery: {
    type: String
  },
  payment: {
    type: Object
  },
  products: {
    type: [orderProductSchema]
  }
})

const userSchema = new Schema({
  username: {
    type: String,
    minlength: [5, '帳號必須四個字以上'],
    maxlength: [15, '帳號必須十個字以下'],
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  joinDate: {
    type: Date,
    default: new Date()
  },
  orders: {
    type: [orderSchema]
  },
  role: {
    type: String,
    required: true
  }
})

const users = mongoose.model('users', userSchema)
export default users
