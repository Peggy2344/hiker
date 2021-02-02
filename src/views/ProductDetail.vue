<template>
<v-app app class="home">
  <Navbar />
  <!-- sectopn01 -->
  <v-row class="d-flex justify-space-around align-start flex ma-0 mx-lg-10 mt-15">
    <v-col cols="12" class="h-10 mt-5">
      <v-breadcrumbs v-if="links[3].text" :items="links" large>
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-col>
    <v-container v-if="isLoading" class="progress">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-container>
    <template v-else>
      <v-col cols="8" class="col-md-4 col-sm-6 img_height d-flex justify-center ml-lg-5">
        <template>
          <ProductImage class="h-100 w-80" :product="product" />
        </template>
      </v-col>
      <v-col cols="12" class="col-md-7 d-flex flex-column align-center">
        <v-col cols="8" class="d-flex flex-column align-center align-lg-start">
          <div><p class="text-subtitle">{{ product.brand }}</p></div>
          <div><p class="text-h5 text-lg-h4 font-weight-bold">{{ product.productName }}</p></div>
          <template v-if="comments.length">
            <div class="d-flex justify-center align-center mb-5 flex-wrap">
              <span class="text-h5 words--text py-5 mr-3">{{rating}}</span>
                <v-rating
                  :value=rating
                  background-color="primary lighten-3"
                  color="primary"
                  size="25"
                  half-increments
                  readonly
                ></v-rating>
                <div>
                  <a href="#review" class="link words--text text-lg-subtitle-1 text-subtitle-2 pa-3"><span class="highlight">{{comments.length}}則評論</span></a>
                </div>
            </div>
          </template>
          <div><p class="text-subtitle font-weight-bold primary--text">${{ product.price }}</p></div>
        </v-col>
        <v-col cols="12" class="d-flex flex-wrap pa-0 justify-center py-0">
          <template v-if="details.length">
            <v-col cols="4" class="col-lg-4 pa-0 mx-3">
              <v-select
                v-model="selectedColor"
                :items="color"
                label="請選擇顏色"
                outlined
              ></v-select>
            </v-col>
            <v-col cols="4" class="col-lg-4 pa-0 mx-3" v-if="size.length">
              <v-select
                v-model="selectedSize"
                :items="size"
                label="請選擇尺寸"
                outlined
              ></v-select>
            </v-col>
            <!-- <v-col cols="8" class="col-lg-4" v-if="selectedColor && selectedSize">
              <label>庫存</label>
                <p>{{ inStock }}</p>
            </v-col> -->
          </template>
          <v-col cols="8" class="px-0 mx-3 d-flex justify-center">
            <div class="col-10 col-lg-6">
              <v-text-field
                v-model.number="quantity"
                hide-details
                outlined
                label="數量"
                class="centered-input"
              >
                <v-icon
                  slot="prepend-inner"
                  @click="minusCount"
                >
                  mdi-minus
                  </v-icon>
                  <v-icon
                    slot="append"
                    @click="quantity++"
                  >
                    mdi-plus
                  </v-icon>
              </v-text-field>
            </div>
          </v-col>
          <v-col cols="10" class="col-lg-8 px-0 mx-3 mt-lg-10 text-center">
            <v-btn
              depressed
              color="primary"
              width="80%"
              height="50px"
              @click="submitHandler"
              :disabled="pending"
            >
              {{ pending ? '加入中' : '加入購物車'}}
            </v-btn>
          </v-col>
        </v-col>
      </v-col>
    </template>
  </v-row>
  <!-- review section -->
  <v-container id="review" class="d-flex justify-center align-center flex-column py-lg-15 px-lg-15 mx-auto my-15" v-if="!isLoading">
      <v-col cols="12" class="d-flex flex-wrap">
        <div class="left"></div>
        <div class="d-flex col-12 col-md-6 justify-center align-center flex-wrap">
          <span class="text-lg-h3 text-sm-h4 text-h5 words--text mx-5">{{rating}}</span>
            <v-rating
              :value=rating
              background-color="brightGray lighten-3"
              color="brightGray"
              size="25"
              half-increments
              readonly
            ></v-rating>
          <span class="words--text text-lg-subtitle-1 text-subtitle-2 pa-3">{{comments.length}}則評論</span>
        </div>
        <div class="right d-flex col-12 col-md-4 justify-center">
          <v-btn
            class="ma-2 outlineBtn"
            outlined
            v-bind="ratingSize"
            color="primary"
            @click="commentHandler"
          >
            發表評論
          </v-btn>
          <v-btn
            class="ma-2 outlineBtn"
            outlined
            v-bind="ratingSize"
            color="brightGray"
            @click="showQuestionForm = true"
          >
            發問
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" class="col-lg-10 d-flex flex-column align-center py-10">
        <v-tabs background-color="transparent" v-model="tabs">
          <v-tab href="#comment">評論({{comments.length}})</v-tab>
          <v-tab href="#question">問題({{questions.length}})</v-tab>
        </v-tabs>
        <v-row class="d-flex justify-center align-start ma-auto w100 min-height">
          <template v-if="comments.length && tabs==='comment'">
            <!-- <v-col cols="12"  > -->
              <CommentCard v-for="comment in comments" :key="comment._id" class="bordertop" :comment="comment._id" :productId="product._id" />
            <!-- </v-col> -->
          </template>
          <template v-else-if="questions.length && tabs==='question'">
            <!-- <v-col cols="12" > -->
              <QuestionCard v-for="question in questions" :key="question.id" class="bordertop" :question="question" :productId="product._id" />
            <!-- </v-col> -->
          </template>
          <template v-else-if="tabs==='comment'">
            <div class="mt-15">
              目前還沒有評價
            </div>
          </template>
          <template v-else>
            <div class="mt-15">
              目前還沒有人發問
            </div>
          </template>
        </v-row>
      </v-col>
      <transition name="fade">
        <v-dialog v-model="showCommentForm" width="600" color="#333">
          <CommentForm @after-comment="afterComment" @close-form="showCommentForm = false" :productId="product._id" />
        </v-dialog>
      </transition>
      <transition name="fade">
        <v-dialog v-model="showQuestionForm" width="600" color="#333">
          <QuestionForm @after-question="afterAsk" @close-form="showCommentForm = false" :productId="product._id" />
        </v-dialog>
      </transition>
  </v-container>
  <transition name="fade">
    <v-snackbar top :right="!$vuetify.breakpoint.mobile" light flat color="transparent" elevation="0" :timeout="timeout" v-model="showOrder" class="col-12 col-lg-4">
      <div class="col-12 col-lg-8 ordercard">
        <v-btn class="close_btn" icon @click="showOrder = !showOrder">
          <v-icon color="primary" small>
            mdi-close
          </v-icon>
        </v-btn>
        <PopUpCard v-if="orderData" :product="orderData"/>
      </div>
    </v-snackbar>
  </transition>
</v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import PopUpCard from '@/components/PopUpCard.vue'
import ProductImage from '@/components/ProductImage.vue'
import CommentCard from '@/components/CommentCard.vue'
import CommentForm from '@/components/CommentForm.vue'
import QuestionCard from '@/components/QuestionCard.vue'
import QuestionForm from '@/components/QuestionForm.vue'
import { mapState } from 'vuex'
import { getProduct, getComments, getQuestions } from '../apis/product.js'
import { postOrder, pushOrder, editOrder } from '../apis/user.js'
export default {
  components: {
    ProductImage,
    Navbar,
    PopUpCard,
    CommentCard,
    CommentForm,
    QuestionCard,
    QuestionForm
  },
  data () {
    return {
      timeout: 3000,
      showOrder: false,
      orderData: {},
      tabs: '',
      comments: [],
      questions: [],
      showCommentForm: false,
      showQuestionForm: false,
      isLoading: true,
      product: '',
      details: [],
      color: [],
      selectedColor: '',
      size: [],
      selectedSize: '',
      quantity: 1,
      links: [
        {
          text: '首頁',
          disabled: false,
          to: '/'
        },
        {
          text: 'navigation',
          disabled: false,
          to: '/:navigation',
          exact: true
        },
        {
          text: 'category',
          disabled: false,
          to: '/:category',
          exact: true
        },
        {
          text: '',
          disabled: true
        }
      ],
      timer: '',
      pending: false
    }
  },
  computed: {
    ...mapState(['user', 'cartList', 'orderId']),
    detailId () {
      let selected = ''
      if (this.size.length && this.color.length) {
        selected = this.details.find(item => item.color === this.selectedColor && item.size === this.selectedSize)
      } else if (this.size.length) {
        selected = this.details.find(item => item.size === this.selectedSize)
      } else if (this.color.length) {
        selected = this.details.find(item => item.color === this.selectedColor)
      }
      return selected ? selected._id : ''
    },
    rating () {
      if (!this.comments) return
      let totalScore = 0
      if (this.comments.length) {
        this.comments.map(item => {
          totalScore += item.star
        })
        return Number.parseFloat((totalScore / this.comments.length).toFixed(1))
      } else {
        return 0
      }
    },
    ratingSize () {
      const size = { xs: 'small', lg: 'large', xl: 'x-large' }[this.$vuetify.breakpoint.name]
      return size ? { [size]: true } : {}
    }
  },
  methods: {
    async fetchData (productId) {
      try {
        const data = await getProduct({ productId })
        const comments = await getComments({ productId })
        const questions = await getQuestions({ productId })
        this.comments = comments.data.result
        this.questions = questions.data.result
        if (!data.data.success) throw new Error(data.message)
        this.product = data.data.result[0]
        this.setDetails()
        this.setRoute()
        this.isLoading = false
      } catch (err) {
        console.log(err)
      }
    },
    setDetails () {
      if (!this.product.details.length) return
      this.details = this.product.details
      this.details.forEach(item => {
        if (item.color) {
          this.color.push(item.color)
        }
        if (item.size) {
          this.size.push(item.size)
        }
      })
    },
    setRoute () {
      const item = this.product
      this.links[1].text = item.navigation
      this.links[1].to = { name: 'Navigation', params: { navigation: item.navigationRoute } }
      this.links[2].text = this.product.category
      this.links[2].to = { name: 'Category', params: { navigation: item.navigationRoute, category: item.categoryRoute } }
      this.links[3].text = this.product.productName
    },
    minusCount () {
      if (this.quantity <= 1) return
      this.quantity--
    },
    commentHandler () {
      if (!this.user.id) {
        this.$swal.fire({
          text: '請先登入再留言!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '登入'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push({ name: 'Login' })
          }
        })
      } else {
        this.showCommentForm = true
      }
    },
    afterComment (comments) {
      this.comments = comments
      this.showCommentForm = false
    },
    afterAsk (question) {
      console.log(question)
      this.questions = question
      this.showQuestionForm = false
    },
    async submitHandler () {
      if (this.size.length) {
        if (!this.selectedSize) {
          this.$swal({
            icon: 'error',
            text: '請選擇商品尺寸'
          })
          return
        }
      }
      if (this.color.length) {
        if (!this.selectedColor) {
          this.$swal({
            icon: 'error',
            text: '請選擇商品顏色'
          })
          return
        }
      }
      this.pending = true
      let alreadyInCart = {}
      if (this.detailId) {
        alreadyInCart = this.cartList.find(item => item.productId === this.product._id && item.detailId === this.detailId)
      } else {
        alreadyInCart = this.cartList.find(item => item.productId === this.product._id)
      }
      const order = {
        productId: this.product._id,
        detailId: this.detailId,
        quantity: this.quantity
      }
      try {
        if (this.user.id && this.orderId && alreadyInCart) {
          const newOrder = {
            pId: alreadyInCart._id,
            quantity: alreadyInCart.quantity + this.quantity
          }
          await editOrder({ userId: this.user.id, orderId: this.orderId }, newOrder)
        } else if (this.user.id && this.orderId) {
          await pushOrder({ userId: this.user.id, orderId: this.orderId }, order)
        } else if (this.user.id) {
          await postOrder({ userId: this.user.id }, order)
        }
        const { productName, brand, productImg, price } = this.product
        if (this.detailId) {
          this.orderData = Object.assign({ productName, brand, productImg, price }, { quantity: this.quantity, detail: { color: this.selectedColor, size: this.selectedSize } })
        } else {
          this.orderData = Object.assign({ productName, brand, productImg, price }, { quantity: this.quantity })
        }
        this.pending = false
        this.showOrder = true
        this.$store.commit('ADD_CART', order)
      } catch (error) {
        alert('加入失敗，請稍後再試')
      }
    }
  },
  watch: {
    selectedColor (newVal) {
      if (!this.size.length) return
      this.size = []
      this.selectedSize = ''
      const filterAry = this.details.filter(item => {
        return item.color === newVal
      })
      filterAry.map(item => {
        this.size.push(item.size)
      })
    }
  },
  mounted () {
    const { productId } = this.$route.params
    this.fetchData(productId)
  },
  beforeRouteUpdate (to, from, next) {
    const { productId } = to.params
    this.fetchData(productId)
    next()
  }
}
</script>

<style>
.transformY{
  transform: translateY(64px);
}
.link{
  text-decoration: none;
}
.flex{
  flex: 0 0 auto;
}
.absolute {
  position: absolute;
}
.progress {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}
.h-10{
  height: 10%;
}
.h-100{
  height: 100%;
}
.w100{
  width: 100%;
}
.left,
.right {
  flex: 1;
}
.bordertop{
  border-top: 2px solid var(--v-words-base);
}
.centered-input input {
  text-align: center
}
.v-text-field--outlined > .v-input__control > .v-input__slot{
  min-height: 48px !important;
}
.v-text-field--outlined .v-label{
  top: 15px;
}
.v-text-field--enclosed .v-input__append-inner,
.v-text-field--enclosed .v-input__prepend-inner {
  margin-top: 13px;
}
.v-label{
  font-size: 14px;
}
.v-btn.v-size--default {
  font-size: 1.1em;
}
#app .outlineBtn span.v-btn__content{
  color: inherit;
}
#review{
  max-width: 90rem;
  width: 100%;
}
.min-height{
  min-height: 350px;
}
.ordercard{
  position: absolute;
  top: 0;
  right: 0;
}
.close_btn{
  position: absolute;
  top: 20px;
  right: 25px;
  z-index: 100;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@media (min-width: 1200px) {
  .w-80{
    width: 80%;
  }
  .h-lg-50{
    height: 50%;
  }
  .ordercard{
    position: relative;
    right: 0;
  }
}
</style>
