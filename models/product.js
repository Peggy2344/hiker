import mongoose from 'mongoose'

// import questionSchema from './questions.js'
// import commentSchema from './comments.js'

const Schema = mongoose.Schema

const productImageSchema = new Schema({
  file: {
    type: String
  },
  display: {
    type: Boolean
  }
})

const detailSchema = new Schema({
  size: {
    type: String
  },
  color: {
    type: String
  },
  inStock: {
    type: String
  }
})

const commentSchema = new Schema({
  u_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  star: {
    type: Number,
    required: [true, '缺少評論星星數']
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  releaseDate: {
    type: Date,
    default: Date.now()
  },
  reply: {
    type: String
  },
  replyDate: {
    type: Date,
    default: Date.now()
  },
  display: {
    type: Boolean,
    default: true
  }
})

const questionSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    default: Date.now()
  },
  reply: {
    type: String
  },
  replyDate: {
    type: Date
  }
})

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, '商品名稱為必填'],
    unique: true,
    trim: true
  },
  brand: {
    type: String,
    trim: true,
    required: [true, '品牌名稱為必填']
  },
  navigation: {
    type: String,
    required: true
  },
  navigationRoute: {
    type: String,
    required: true
  },
  category: {
    type: String,
    trim: true
  },
  categoryRoute: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: [true, '價格為必填'],
    trim: true
  },
  inStock: {
    type: Number
  },
  details: {
    type: [detailSchema]
  },
  productRating: Number,
  productImg: {
    type: [productImageSchema]
  },
  comments: {
    type: [commentSchema]
  },
  questions: {
    type: [questionSchema]
  },
  display: {
    type: Boolean,
    default: true
  }
})

const products = mongoose.model('products', productSchema)
export default products
