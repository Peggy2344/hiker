import user from '../models/user.js'
// import product from '../models/product.js'
// import order from '../models/order.js'
import md5 from 'md5'
export const createUser = async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式不符' })
    return
  }
  if (req.body.password.length < 8 || req.body.password.length > 20) {
    return res.status(400).send({ success: false, message: '密碼必須介於8-20個字之間' })
  }
  const checkEmail = await user.findOne({ email: req.body.email })
  if (checkEmail) {
    return res.status(400).send({ success: false, message: '信箱已使用' })
  }
  try {
    await user.create({
      username: req.body.username,
      password: md5(req.body.password),
      email: req.body.email,
      role: 'admin',
      joinDate: Date.now()
    })
    res.status(200).send({
      success: true,
      message: '註冊成功'
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'MongoError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '帳號已使用' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
export const login = async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式不符' })
    return
  }
  try {
    const result = await user.findOne({
      username: req.body.username
    })
    if (result === null) {
      res.status(400).send({ success: false, message: '用戶不存在' })
    } else if (md5(req.body.password) !== result.password) {
      res.status(400).send({ success: false, message: '密碼錯誤' })
    } else {
      req.session.user = {
        id: result._id,
        username: result.username,
        role: result.role
      }
      req.session.save()
      res.status(200).send({
        success: true,
        message: '',
        user:
      {
        id: result._id,
        username: result.username,
        role: result.role
      }
      })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).res.send({ success: false, message: '伺服器錯誤' })
    }
  }
}
export const logout = async (req, res) => {
  req.session.destroy(error => {
    if (error) {
      res.status(500).res.send({ success: false, message: '伺服器錯誤' })
    } else {
      res.clearCookie()
      res.status(200).send({ success: true, message: '' })
    }
  })
}
export const getUser = async (req, res) => {
  if (req.session.user.id !== req.params.userId) return res.status(401).send({ success: false, message: '沒有權限' })
  try {
    const result = await user.findById(req.params.userId, '-password')
    if (!result) {
      res.status(400).send({ success: false, message: '用戶不存在' })
      return
    } else {
      res.status(200).send({ success: true, message: 'success', result })
    }
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const heartbeat = async (req, res) => {
  let isLogin = false
  console.log(req.session.user)
  if (req.session.user !== undefined) {
    isLogin = true
  }
  res.status(200).send(isLogin)
}
