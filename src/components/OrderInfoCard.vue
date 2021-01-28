<template>
  <v-container v-if="!isLoading">
    <div v-if="!orders.length" class="d-flex justify-center">
      <p>目前沒有訂單</p>
    </div>
    <!-- <transition-group name="slide"> -->
    <v-card
      class="mx-auto d-flex align-center"
      outlined
      v-for="order in orders"
      :key="order._id"
    >
      <v-col cols="12" class="d-flex align-center justify-space-between flex-wrap">
        <!-- <v-list-item-content > -->
          <v-col cols="12" class="py-0">
            <div class="overline">{{getTime(order.date)}}</div>
          </v-col>
          <v-col cols="12" class="col-sm-6 d-flex justify-space-around">
            <router-link :to="{ name: 'OrderDetail', params: { status , orderId: order._id }}">
              <div class="overline mb-1"> {{order._id.slice(-8)}}</div>
            </router-link>
            <div class="overline mb-1"> {{order.products.length}}件商品</div>
            <div class="overline mb-1"> ${{order.payment.totalPrice}}</div>
          </v-col>
          <v-col cols="12" class="py-0 col-sm-6 d-flex justify-end justify-sm-space-around">
            <div class="text-subtitle-1 headline text-wrap mx-2">{{order.payment.delivery}}</div>
            <div class="text-subtitle-1 headline text-wrap mx-2">{{order.payment.payment}}</div>
          </v-col>
        <!-- </v-list-item-content> -->
      </v-col>
    </v-card>
    <!-- </transition-group> -->
  </v-container>
</template>

<script>
import { getOrderStatus } from '../apis/user'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      env: process.env.VUE_APP_API,
      orders: [],
      isLoading: true,
      status: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    getTime (time) {
      return dayjs(time).format('YYYY/MM/DD')
    },
    async fetchData (status) {
      const result = await getOrderStatus({ userId: this.user.id, orderStatus: status })
      if (result.data.message === '沒有訂單') {
        this.orders = []
      } else {
        this.orders = result.data.orderList
      }
      this.isLoading = false
    }
  },
  mounted () {
    const { status } = this.$route.params
    this.status = status
    this.fetchData(status)
  },
  beforeRouteUpdate (to, from, next) {
    const { status } = to.params
    this.status = status
    this.fetchData(status)
    next()
  }

}
</script>

<style>
.fade-enter-active {
  animation: slide-in .5s ease-out forwards;
}
.fade-leave-active /* .fade-leave-active below version 2.1.8 */ {
  animation: slide-out .5s ease-out forwards;
}
</style>
