<template>
<v-app id="app">
  <v-container class="d-flex flex-column flex-wrap justify-center align-center">
    <Navbar />
    <v-row class="mt-16 d-flex flex-wrap align-center justify-center col-lg-10 col-12 mt-5 flex-column">
      <h3 class="ma-0 text-h5 words--text">訂單</h3>
      <v-col cols="12">
        <hr class="hr">
      </v-col>
    </v-row>
      <v-row class="d-flex flex-wrap align-start justify-center col-lg-10 col-12 pa-0">
        <template v-if="isLoading">
          <v-col cols="12" class="col-lg-7">
            <v-skeleton-loader
              width="80%"
              type="list-item-avatar-three-line"
              boilerplate
              v-for="index in 8"
              :key="index"
            ></v-skeleton-loader>
          </v-col>
        </template>
        <v-col v-else-if="cartList.length" cols="12" class="col-lg-7">
          <OrderCard v-for="(item, index) in cart" :key="index" :product="item" @delCart="delCart" />
        </v-col>
        <v-col v-else cols="12" class="col-lg-7 d-flex justify-center">
          <div>
            <p>你的購物車是空的!</p>
          </div>
        </v-col>
        <v-col cols="12" class="col-lg-4 d-flex justify-end">
          <OrderDetail :cart="cart" />
        </v-col>
      </v-row>
  </v-container>
</v-app>
</template>

<script>
import { mapState } from 'vuex'
import { getProduct } from '../apis/product'
import OrderDetail from '../components/OrderDetail'
import OrderCard from '../components/OrderCard'
import Navbar from '../components/Navbar'
export default {
  components: {
    Navbar,
    OrderDetail,
    OrderCard
  },
  data () {
    return {
      headers: [
        { text: '商品預覽', value: 'productImg[0].file', align: 'center' },
        { text: '商品名稱', value: 'productName', align: 'center' },
        { text: '品牌', value: 'brand', align: 'center' },
        { text: '價格', value: 'price', align: 'center' },
        { text: '數量', value: 'quantity', align: 'center' },
        { text: '刪除', value: 'actions', sortable: false, align: 'center' }
      ],
      cart: [],
      isLoading: true
    }
  },
  computed: {
    ...mapState(['user', 'cartList', 'orderId'])
  },
  methods: {
    delCart (item) {
      const product = this.cart.find(el => el._id === item.productId)
      const index = this.cart.indexOf(product)
      this.cart.splice(index, 1)
    },
    fetchData () {
      this.cartList.forEach(order => {
        getProduct({ productId: order.productId })
          .then((res) => {
            const { productName, price, brand, productImg, _id, details } = res.data.result[0]
            if (order.detailId) {
              const detail = details.find(item => item._id === order.detailId)
              this.cart.push({ productName, price, brand, productImg, detailId: order.detailId, detail, quantity: order.quantity, _id })
            } else {
              this.cart.push({ productName, price, brand, productImg, quantity: order.quantity, _id })
            }
          })
      })
      this.isLoading = false
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style>
.w-100 {
  width: 100vw;
}
.transformY{
  transform: translateY(70px);
}
.w-80 {
  width: 90%;
}
.hr{
  background: var(--v-primary-base);
}
#app span.v-btn__content{
  /* color: inherit; */
  font-size: 1rem;
}
</style>
