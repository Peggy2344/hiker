import mongoose from 'mongoose'

const Schema = mongoose.Schema

const HotSale = new Schema({
  p_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refs: 'product'
  },
  productName: {
    type: String,
    unique: true
  },
  brand: {
    type: String
  },
  price: {
    type: Number
  },
  productImg: {
    type: Array
  }
})

const HotSales = mongoose.model('HotSale', HotSale)
export default HotSales
