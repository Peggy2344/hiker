import product from '../models/product.js'
import hotSale from '../models/hotSale.js'
import productClassification from '../models/productClassification.js'

import multer from 'multer'
import FTPStorage from 'multer-ftp'
import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

let storage

// 設定檔名及儲存路徑
if (process.env.DEV === 'true') {
  storage = multer.diskStorage({
    destination (req, file, callback) {
      callback(null, 'images/')
    },
    filename (req, file, callback) {
      // originalname 檔案名稱+檔案格式
      callback(null, Date.now() + path.extname(file.originalname))
    }
  })
} else {
  storage = new FTPStorage({
    // FTP 登入設定
    ftp: {
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false
    },
    // 上傳的路徑含檔名
    // 路徑為FTP的絕對路徑
    destination (req, file, options, callback) {
      callback(null, '/' + Date.now() + path.extname(file.originalname))
    }
  })
}

const transNavigation = {
  女款: 'women',
  男款: 'men',
  裝備: 'equipment',
  品牌: 'brand'
}
const transCategory = {
  外套: 'jacket',
  上衣: 'shirt',
  褲子: 'pant',
  鞋子: 'shoes',
  襪子: 'socks',
  登山杖: 'trekking-poles',
  毛帽: 'hat',
  登山包: 'backpacks',
  隨行包: 'belt-bags',
  睡袋: 'sleeping-bag',
  鍋具: 'pots'
}

const upload = multer({
  storage,
  fileFilter (req, file, callback) {
    if (!file.mimetype.includes('image')) {
      callback(new multer.MulterError('LIMIT_FORMAT'), false)
    } else {
      callback(null, true)
    }
  },
  limits: {
    fileSize: 1024 * 1024
  }
})

export const createProduct = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (req.session.user.role !== 'admin') {
    res.status(401).send({ success: false, message: '沒有權限' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }
  const productname = await product.findOne({ productName: req.body.productname })
  if (productname) {
    res.status(400).send({ success: false, message: '此商品已存在' })
  }
  upload.array('image', 5)(req, res, async error => {
    console.log(req.body)
    if (error instanceof multer.MulterError) {
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FORMAT') {
        message = '格式不符'
      } else {
        message = '上傳錯誤'
      }
      res.status(400).send({ success: false, message })
    } else if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      try {
        const files = []
        if (process.env.DEV === 'true') {
          for (let i = 0; i < req.files.length; i++) {
            files.push({ file: req.files[i].filename, display: true })
          }
        } else {
          for (let i = 0; i < req.files.length; i++) {
            files.push({ file: path.basename(req.files[i].path), display: true })
          }
        }
        const details = []
        if (req.body.details !== 'undefined') {
          for (let i = 0; i < req.body.details.length; i++) {
            details.push(JSON.parse(req.body.details[i]))
          }
        }
        const result = await product.create({
          productName: req.body.productName,
          brand: req.body.brand,
          navigation: req.body.navigation,
          navigationRoute: transNavigation[req.body.navigation],
          category: req.body.category,
          categoryRoute: transCategory[req.body.category],
          price: req.body.price,
          inStock: req.body.inStock,
          details: details,
          // 把路徑資料儲存起來
          productImg: files
        })
        res.status(200).send({ success: true, message: 'Success', result })
      } catch (error) {
        if (error.name === 'ValidationError') {
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400).send({ success: false, message })
        } else {
          console.log(error)
          res.status(500).send({ success: false, message: '伺服器錯誤' })
        }
      }
    }
  })
}
export const editProduct = async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
  }
  try {
    let result = await product.findById(req.params.productId)
    if (result === null) {
      res.status(404).send({ success: false, message: '沒有此筆資料' })
    } else {
      result = await product.findByIdAndUpdate(req.params.productId,
        req.body
        , { new: true })
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
export const deleteProduct = async (req, res) => {
  try {
    let result = await product.findById(req.params.productId)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else if (req.session.user.role !== 'admin') {
      res.status(403).send({ success: false, message: '沒有權限' })
    } else {
      result = await product.findByIdAndDelete(req.params.productId)
      res.status(200).send({ success: true, message: '', result })
      if (process.env.DEV === 'true') {
        fs.unlink('images/' + result.file, () => {})
      }
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID格式錯誤' })
    } else {
      console.log(error)
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
export const CreateClassification = async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
  }
  const categoryRouteAry = []
  req.body.category.forEach(item => {
    if (!transCategory[item]) {
      categoryRouteAry.push(item)
    } else {
      categoryRouteAry.push(transCategory[item])
    }
  })
  try {
    await productClassification.create({
      navigation: req.body.navigation,
      navigationRoute: transNavigation[req.body.navigation],
      category: req.body.category,
      categoryRoute: categoryRouteAry
    })
    res.status(200).send({
      success: true,
      message: '新增成功'
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
export const EditCategory = async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
  }
  try {
    let result = await productClassification.findById(req.params.classificationId)
    if (result === null) {
      res.status(404).send({ success: false, message: '沒有此筆資料' })
    } else {
      let categoryRoute
      if (/^[a-zA-Z]+$/.test(req.body.category)) {
        categoryRoute = req.body.category
      } else {
        categoryRoute = transCategory[req.body.category]
      }
      result = await productClassification.findByIdAndUpdate(req.params.classificationId,
        { $push: { category: req.body.category, categoryRoute: categoryRoute } }
        , { new: true })
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
export const CreateHotSale = async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
  }
  try {
    const item = await product.findById(req.body._id)
    const result = await hotSale.create({
      p_id: req.body._id,
      productName: item.productName,
      brand: item.brand,
      price: item.price,
      productImg: item.productImg
    })
    if (result) {
      res.status(200).send({ success: true, message: 'success', result })
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
export const RemoveHotSale = async (req, res) => {
  if (req.session.user.role !== 'admin') {
    res.status(403).send({ success: false, message: '沒有權限' })
  }
  try {
    const result = await hotSale.findByIdAndDelete(req.params.id)
    if (result) {
      res.status(200).send({ success: true, message: 'success', result })
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
