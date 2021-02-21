# HIKER 登山用品電商網站 [DEMO](https://peggy2344.github.io/hiker/#/)

### 前端使用套件與技術
* 主要以 Vue、Vuex、Vue Router 做基本前端操作，並搭配Vuetify做UI設計，完成具有RWD的電商網站。
* [vue-awesome-swiper](https://github.surmon.me/vue-awesome-swiper/) 用於首頁滑動商品效果
* [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate#readme) 用於維持Vuex資料，不受使用者更新頁面而影響資料狀態。
* [vue-sweetalert2](https://sweetalert2.github.io/) 用於提示框的浮現
* [vue-gtag](https://matteo-gabriele.gitbook.io/vue-gtag/) 用於網站Google Analytics的建置
* [day.js](https://day.js.org/) 用於時間格式的處理
### 後端使用套件與技術
* 資料庫為MongoDB，搭配 Node.js的server環境。
* [express](https://expressjs.com/) Node.js框架，用於處理session、對API進行分流操作。
* [express-session](https://github.com/expressjs/session#readme) 用於記錄使用者登入資訊，並存於後端伺服器。
* [mongoose](https://mongoosejs.com/) 用於對MongoDB資料庫進行CURD的功能。
* [cors](https://github.com/expressjs/cors#readme) 用於解決前後端domain不同的跨域問題。
* [dotenv](https://github.com/motdotla/dotenv#readme) 用於加載設定於.env檔的環境變數。
* [md5](https://github.com/pvorb/node-md5#readme) 用於針對使用者密碼進行加密，以保障安全性。
* [multer](https://www.npmjs.com/package/multer) 用於圖片上傳功能。
###操作
#### 使用者畫面
![使用者畫面](./user-demo.gif)
##### 操作功能
* 訪客 / 會員
    * 瀏覽各商品頁面
    * 加入購物車
    * 對商品進行提問
* 會員
    * 購買商品
    * 對商品進行評論
#### 管理者畫面
![管理者畫面](./admin-demo.gif)
##### 操作功能
* 管理者
    * 新增、修改、刪除商品
    * 禁用 、 恢復評論
    * 管理訂單狀態
    * 回覆使用者提問
    * 更新首頁(最新商品)
