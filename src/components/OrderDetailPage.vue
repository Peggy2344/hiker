<template>
<v-row v-if="!isLoading">
  <v-col cols="12" class="col-md-6">
    <PopUpCard v-for="product in products" :product="product" :key="product._id" />
  </v-col>
  <v-col cols="12" class="col-md-6 d-flex flex-column justify-start flex">
    <v-col>
      <v-card
      outlined
      max-width="400"
      width="100%"
      class="mx-auto"
      flat
    >
      <v-app-bar
        color="transparent"
        flat
        outlined
      >
        <v-toolbar-title>運送資料</v-toolbar-title>
      </v-app-bar>
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-card elevation="0">
              <v-row>
                <v-card-subtitle class="text-subtitle-1 primary--text mr-auto">
                  運送方式
                </v-card-subtitle>
                <v-card-subtitle class="text-subtitle-1 primary--text">{{ order.payment.delivery }}</v-card-subtitle>
              </v-row>
              <v-row>
                <v-card-subtitle class="text-subtitle-1 primary--text mr-auto">
                  收件人
                </v-card-subtitle>
                <v-card-subtitle class="text-subtitle-1 primary--text">{{ order.payment.receiver }}</v-card-subtitle>
              </v-row>
              <v-row>
                <v-card-subtitle class="text-subtitle-1 primary--text mr-auto">
                  手機
                </v-card-subtitle>
                <v-card-subtitle class="text-subtitle-1 primary--text">{{ order.payment.phone }}</v-card-subtitle>
              </v-row>
              <v-row>
                <v-card-subtitle class="text-subtitle-1 primary--text mr-auto">
                  收件地點(門市)
                </v-card-subtitle>
                <v-card-subtitle class="text-subtitle-1 primary--text">{{ order.payment.address }}</v-card-subtitle>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      </v-card>
    </v-col>
    <v-col>
      <v-card
      outlined
      max-width="400"
      width="100%"
      class="mx-auto"
      flat
    >
      <v-app-bar
        color="transparent"
        flat
        outlined
      >
        <v-toolbar-title>付款資訊</v-toolbar-title>
      </v-app-bar>
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-card elevation="0">
              <v-row>
                <v-card-subtitle class="text-subtitle-1 primary--text mr-auto">
                  付款方式
                </v-card-subtitle>
                <v-card-subtitle class="text-subtitle-1 primary--text">{{ order.payment.payment }}</v-card-subtitle>
              </v-row>
              <v-row>
                <v-card-subtitle class="text-subtitle-1 primary--text mr-auto">
                  付款金額
                </v-card-subtitle>
                <v-card-subtitle class="text-subtitle-1 primary--text">${{ order.payment.totalPrice }}</v-card-subtitle>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      </v-card>
    </v-col>
  </v-col>
</v-row>
</template>

<script>
import { mapState } from 'vuex'
import { getOrder } from '../apis/user'
import { getProduct } from '../apis/product'
import PopUpCard from './PopUpCard'
export default {
  props: ['orderId'],
  components: {
    PopUpCard
  },
  data () {
    return {
      isLoading: true,
      order: {},
      products: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async fetchData (data) {
      let result = {}
      if (this.user.role === 'admin') {
        result = await getOrder({ userId: data.userId, orderId: data.orderId })
      } else {
        result = await getOrder({ userId: this.user.id, orderId: data.orderId })
      }
      this.order = result.data.orderList
      this.order.products.forEach(async item => {
        const data = await getProduct({ productId: item.productId })
        const productData = data.data.result[0]
        productData.quantity = item.quantity
        this.products.push(productData)
      })
      this.isLoading = false
    }
  },
  mounted () {
    if (this.user.role === 'admin') {
      const { userId, orderId } = this.$route.params
      this.fetchData({ userId, orderId })
    } else {
      const { orderId } = this.$route.params
      this.fetchData(orderId)
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (this.user.role === 'admin') {
      const { userId, orderId } = to.params
      this.fetchData({ userId, orderId })
    } else {
      const { orderId } = to.params
      this.fetchData({ orderId })
    }
    next()
  }
}
</script>

<style>
</style>
