import product from '../models/product.js'
import hotSale from '../models/hotSale.js'
import productClassification from '../models/productClassification.js'
import axios from 'axios'
import fs from 'fs'
import users from '../models/user.js'

const transNavigation = {
  女款: 'women',
  男款: 'men',
  裝備: 'equipment',
  品牌: 'brand'
}

export const getProducts = async (req, res) => {
  try {
    if (req.query.navigation && req.query.category) {
      const products = await product.find({ navigationRoute: req.query.navigation }, '-details.inStock -inStock -comments -questions')
      const result = products.filter(item => {
        return item.categoryRoute === req.query.category
      })
      return res.status(200).send({ success: true, message: 'Success', result })
    }
    if (req.query.navigation) {
      const isEnglish = /^[A-Za-z]+$/
      if (!req.query.navigation.match(isEnglish)) {
        req.query.navigation = transNavigation[req.query.navigation]
      }
      const result = await product.find({ navigationRoute: req.query.navigation }, '-details.inStock -inStock -comments -questions')
      return res.status(200).send({ success: true, message: 'Success', result })
    }
    if (req.query.brand) {
      const result = await product.find({ brand: req.query.brand }, '-details.inStock -inStock -comments -questions')
      return res.status(200).send({ success: true, message: 'Success', result })
    }
    let result = ''
    if (req.session.user.role === 'admin') {
      result = await product.find({}, '-comments -questions')
    } else {
      result = await product.find({}, '-details.inStock -inStock -comments -questions')
    }
    res.status(200).send({ success: true, message: 'Success', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const searchByProductId = async (req, res) => {
  try {
    const result = await product.find({ _id: req.params.productId }, '-details.inStock -inStock -comments -questions')
    res.status(200).send({ success: true, message: 'Success', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const GetClassification = async (req, res) => {
  try {
    const result = await productClassification.find({})
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const getFile = async (req, res) => {
  // 開發環境回傳本機圖片
  if (process.env.DEV === 'true') {
    const path = process.cwd() + '/images/' + req.params.file
    const exists = fs.existsSync(path)

    if (exists) {
      res.status(200).sendFile(path)
    } else {
      res.status(404).send({ success: false, message: '找不到圖片' })
    }
  } else {
    // heroku情況下
    console.log(process.env.FTP_HOST)
    console.log(process.env.FTP_USER)
    console.log(req.params.file)
    axios({
      method: 'GET',
      url: 'http://' + process.env.FTP_HOST + '/' + process.env.FTP_USER + '/' + req.params.file
    }).then(response => {
      console.log(response)
      response.data.pipe(res)
    }).catch((error) => {
      res.status(error.response.status).send({ success: false, message: '取得圖片失敗' })
    })
  }
}
export const GetHotSale = async (req, res) => {
  const result = await hotSale.find({})
  res.status(200).send({ success: true, message: 'success', result })
}
export const postComment = async (req, res) => {
  // if (req.session.user === undefined) {
  //   res.status(401).send({ success: false, message: '未登入' })
  //   return
  // }
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
  }
  const commentedUser = await product.find({ _id: req.params.productId }).elemMatch('comments', { u_id: req.body.u_id })
  if (commentedUser.length) {
    return res.status(400).send({ success: false, message: '您已留過評論' })
  }
  try {
    const result = await product.findByIdAndUpdate(req.params.productId, {
      $push: {
        comments: req.body
      }
    }, { new: true })
    const comments = result.comments
    res.status(200).send({ success: true, message: 'success', comments })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const getComment = async (req, res) => {
  try {
    if (!req.query.commentId && !req.params.productId) {
      // if (req.session.user === undefined) {
      //   res.status(401).send({ success: false, message: '未登入' })
      //   return
      // }
      // if (req.session.user.role !== 'admin') {
      //   res.status(403).send({ success: false, message: '沒有權限' })
      //   return
      // }
      const result = await product.find({}, '_id comments productImg productName brand')
      const comments = result.filter(item => item.comments.length)
      return res.status(200).send({ success: true, message: 'success', comments })
    } else if (!req.query.commentId) {
      const Comments = await product.findById(req.params.productId)
      const result = Comments.comments.map(item => {
        return { _id: item._id, star: item.star }
      })
      return res.status(200).send({ success: true, message: 'success', result })
    }
    const Comment = await product.find({ _id: req.params.productId, 'comments._id': req.query.commentId })
    if (!Comment) return res.status(400).send({ success: false, message: '沒有此評論' })
    const comment = Comment[0].comments.find(item => {
      return item._id.toString() === req.query.commentId
    })
    const { star, title, message, releaseDate } = comment
    const result = await users.findById(comment.u_id)
    const userName = result ? result.username : '匿名'
    return res.status(200).send({
      success: true,
      message: 'success',
      result: {
        userName,
        star,
        title,
        message,
        releaseDate
      }
    })
  } catch (error) {
    // console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const getQuestion = async (req, res) => {
  try {
    if (!req.query.questionsId && !req.params.productId) {
      const result = await product.find({}, '_id questions productImg productName brand')
      const questions = result.filter(item => item.questions.length)
      return res.status(200).send({ success: true, message: 'success', questions })
    } else if (!req.query.questionId) {
      const Questions = await product.findById(req.params.productId)
      const result = Questions.questions.map(item => {
        return { _id: item._id }
      })
      return res.status(200).send({ success: true, message: 'success', result })
    }
    const Question = await product.find({ _id: req.params.productId, 'questions._id': req.query.questionId })
    if (!Question) return res.status(400).send({ success: false, message: '沒有此評論' })
    const question = Question[0].questions.find(item => {
      return item._id.toString() === req.query.questionId
    })
    const { userName, message, releaseDate, reply, replyDate } = question
    return res.status(200).send({
      success: true,
      message: 'success',
      result: {
        userName,
        message,
        releaseDate,
        reply,
        replyDate
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const postQuestion = async (req, res) => {
  // if (req.session.user === undefined) {
  //   res.status(401).send({ success: false, message: '未登入' })
  //   return
  // }
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
  }
  try {
    const result = await product.findByIdAndUpdate(req.params.productId, {
      $push: {
        questions: req.body
      }
    }, { new: true })
    const questions = result.questions
    res.status(200).send({ success: true, message: 'success', questions })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const postQuestionReply = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (req.session.user.role !== 'admin') {
    res.status(401).send({ success: false, message: '沒有權限' })
    return
  }
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
  }
  try {
    await product.update(
      {
        _id: req.params.productId
      },
      {
        $set: {
          'questions.$[outer].reply': req.body.reply,
          'questions.$[outer].replyDate': Date.now()
        }
      },
      { arrayFilters: [{ 'outer._id': req.query.questionId }] }
    )
    res.status(200).send({ success: true, message: 'success' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
