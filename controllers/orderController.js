import user from '../models/user.js'
import product from '../models/product.js'
// import e from 'express'

export const postOrder = async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
  }
  if (req.session.user === undefined) return res.status(401).send({ success: false, message: '未登入' })
  if (req.session.user.id !== req.params.userId) return res.status(401).send({ success: false, message: '沒有權限' })
  try {
    // let inventory = 0
    // 檢查是否有其他未結帳訂單
    // const orderList = await user.find({ _id: req.params.userId, 'orders.checkoutStatus': false })
    // if (orderList.length) return res.status(400).send({ success: false, message: '已有訂單' })
    // 檢查是否有商品
    const buyProduct = await product.findById(req.body.productId)
    if (!buyProduct) return res.status(400).send({ success: false, message: '沒有此商品' })
    // if (req.body.detailId) {
    //   inventory = buyProduct[0].details.id(req.body.detailId).inStock
    // } else {
    //   inventory = buyProduct.inStock
    // }
    // 檢查庫存
    // if ((inventory - req.body.quantity) < 0) return res.status(400).send({ success: false, message: '庫存不足' })
    if (req.query.orderId) {
      if (req.body.detailId) {
        await user.update(
          {
            'orders._id': req.query.orderId
          },
          {
            $push: {
              'orders.$[order].products': {
                productId: req.body.productId,
                detailId: req.body.detailId,
                quantity: req.body.quantity
              }
            }
          },
          { arrayFilters: [{ 'order._id': req.query.orderId }] }
        )
      } else {
        await user.update(
          {
            'orders._id': req.query.orderId
          },
          {
            $push: {
              'orders.$[order].products': {
                productId: req.body.productId,
                quantity: req.body.quantity
              }
            }
          },
          { arrayFilters: [{ 'order._id': req.query.orderId }] }
        )
      }
      res.status(200).send({ success: true, message: 'success' })
    } else {
      if (req.body.detailId) {
        await user.findByIdAndUpdate(req.params.userId,
          {
            // 新增到使用者的訂單陣列
            $push: {
              orders: {
                date: new Date(),
                checkoutStatus: false,
                products: [
                  {
                    productId: req.body.productId,
                    detailId: req.body.detailId,
                    quantity: req.body.quantity
                  }
                ]
              }
            }
          }, { new: true }
        )
      } else {
        await user.findByIdAndUpdate(req.params.userId,
          {
            // 新增到使用者的訂單陣列
            $push: {
              orders: {
                date: new Date(),
                checkoutStatus: false,
                products: [
                  {
                    productId: req.body.productId,
                    quantity: req.body.quantity
                  }
                ]
              }
            }
          }, { new: true }
        )
      }
      res.status(200).send({ success: true, message: 'success' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const editOrder = async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
  }
  // if (req.session.user === undefined) return res.status(401).send({ success: false, message: '未登入' })
  // if (req.session.user.id !== req.params.userId) return res.status(401).send({ success: false, message: '沒有權限' })
  try {
    console.log(req.body)
    await user.update(
      { _id: req.params.userId },
      { $set: { 'orders.$[outer].products.$[inner].quantity': req.body.quantity } },
      { arrayFilters: [{ 'outer._id': req.query.orderId }, { 'inner._id': req.body.pId }] }
    )
    res.status(200).send({ success: true, message: 'success' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const editStatus = async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
  }
  if (req.session.user === undefined) return res.status(401).send({ success: false, message: '未登入' })
  if (req.session.user.role !== 'admin') return res.status(401).send({ success: false, message: '沒有權限' })
  try {
    await user.update(
      { _id: req.params.userId },
      { $set: { 'orders.$[outer].status': req.body.status, 'orders.$[outer].handleStatus': req.body.handleStatus } },
      { arrayFilters: [{ 'outer._id': req.query.orderId }] }
    )
    res.status(200).send({ success: true, message: 'success' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const getOrder = async (req, res) => {
  // if (req.session.user !== req.params.userId) return res.status(401).send({ success: false, message: '沒有權限' })
  try {
    if (req.query.orderStatus) {
      const userOrder = await user.find({ _id: req.params.userId, 'orders.checkoutStatus': true, 'orders.handleStatus': req.query.orderStatus })
      if (!userOrder.length) {
        return res.status(200).send({ success: false, message: '沒有訂單' })
      } else {
        const orderList = userOrder[0].orders.filter(order => order.handleStatus === req.query.orderStatus && order.checkoutStatus)
        res.status(200).send({ success: true, message: 'success', orderList })
      }
    } else if (req.query.orderId) {
      const userOrder = await user.find({ _id: req.params.userId, 'orders._id': req.query.orderId })
      if (!userOrder.length) return res.status(200).send({ success: false, message: '沒有訂單' })
      const orderList = userOrder[0].orders.find(order => order._id.toString() === req.query.orderId && order.checkoutStatus)
      res.status(200).send({ success: true, message: 'success', orderList })
    } else {
      const userOrder = await user.find({ _id: req.params.userId, 'orders.checkoutStatus': false })
      if (!userOrder.length) return res.status(200).send({ success: false, message: '沒有訂單' })
      const orderList = userOrder[0].orders.find(order => !order.checkoutStatus)
      res.status(200).send({ success: true, message: 'success', orderList })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const delOrder = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  try {
    let result = await user.find({ _id: req.params.userId, 'orders._id': req.query.orderId, 'orders.products._id': req.query.pId })
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else if (result.user !== req.session.user._id) {
      res.status(403).send({ success: false, message: '沒有權限' })
    } else {
      result = await user.update(
        { _id: req.params.userId },
        { $pull: { 'orders.$[outer].products': { _id: req.query.pId } } },
        { arrayFilters: [{ 'outer._id': req.query.orderId }] }
      )
      res.status(200).send({ success: true, message: '' })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      console.log(error)
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
export const pushOrder = async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
  }
  if (req.session.user !== req.params.userId) return res.status(401).send({ success: false, message: '沒有權限' })
  try {
    await user.update(
      {
        'orders._id': req.query.orderId
      },
      {
        $push: {
          'orders.$.products': {
            productId: req.body.productId,
            detail: req.body.detailId,
            quantity: req.body.quantity
          }
        }
      }
    )
    res.status(200).send({ success: true, message: 'success' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const completeOrder = async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
  }
  // if (req.session.user === undefined) return res.status(401).send({ success: false, message: '未登入' })
  try {
    await user.update(
      { _id: req.params.userId },
      {
        $set:
        {
          'orders.$[outer].checkoutStatus': true,
          'orders.$[outer].payment': req.body.payment,
          'orders.$[outer].handleStatus': 'process',
          'orders.$[outer].status': '處理中',
          'orders.$[outer].date': Date.now()
        }
      },
      { arrayFilters: [{ 'outer._id': req.query.orderId }] }
    )
    res.status(200).send({ success: true, message: 'success' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const getOrderList = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (req.session.user._id !== req.params.userId) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  try {
    const result = await user.findById(req.params.user_id, 'orders')
    if (!result) {
      res.status(200).send({ success: true, message: '沒有訂單紀錄' })
    } else {
      res.status(200).send({ success: true, message: 'Success', result })
    }
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const getUserOrder = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (req.session.user.role !== 'admin') {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  try {
    const result = await user.find({}, '_id orders')
    const userOrder = result.filter(item => item.orders.length)
    if (!result) {
      res.status(200).send({ success: true, message: '沒有訂單紀錄' })
    } else {
      res.status(200).send({ success: true, message: 'Success', userOrder })
    }
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
