import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ProductClassification = new Schema({
  navigation: {
    type: String,
    unique: true
  },
  navigationRoute: {
    type: String,
    unique: true
  },
  category: {
    type: Array
  },
  categoryRoute: {
    type: Array,
    unique: true
  }
})

const ProductClassifications = mongoose.model('ProductClassification', ProductClassification)
export default ProductClassifications
