import comment from '../models/comment.js'
import product from '../models/product.js'
import user from '../models/user.js'

// let storage

// if (process.env.DEV === 'true') {
//   storage = multer.diskStorage({
//     destination (req, file, callback) {
//       callback(null, 'images/')
//     },
//     filename (req, file, callback) {
//       callback(null, Date.now() + path.extname(file.originalname))
//     }
//   })
// } else {
//   storage = new FTPStorage({
//     // FTP 登入設定
//     ftp: {
//       host: process.env.FTP_HOST,
//       user: process.env.FTP_USER,
//       password: process.env.FTP_PASSWORD,
//       secure: false
//     },
//     // 上傳的路徑含檔名
//     // 路徑為FTP的絕對路徑
//     destination (req, file, options, callback) {
//       callback(null, '/' + Date.now() + path.extname(file.originalname))
//     }
//   })
// }

// const upload = multer({
//   storage,
//   fileFilter (req, file, callback) {
//     if (!file.mimetype.includes('image')) {
//       callback(new multer.MulterError('LIMIT_FORMAT'), false)
//     } else {
//       callback(null, true)
//     }
//   },
//   limits: {
//     fileSize: 1024 * 1024
//   }
// })

export const createComment = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
    return
  }
  const commentedUser = comment.findOne({ userName: req.body.userName })
  if (commentedUser) {
    return res.status(400).send({ success: false, message: '您已留過評論' })
  }
  try {
    const result = await comment.create({
      userName: req.session.user._id,
      star: req.body.star,
      title: req.body.title,
      message: req.body.message
    })
    comment.save(function (err, result) {
      if (err) return res.send(err)
      product.findByIdAndUpdate(req.params._id, {
        $push: {
          comment: result._id
        }
      }, { new: true })
      user.findByIdAndUpdate(req.session.user._id, {
        $push: {
          comment: result._id
        }
      }, { new: true })
    })
    res.status.send({ success: true, message: 'success', result })
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
