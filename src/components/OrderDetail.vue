<template>
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
      <v-toolbar-title>訂單資料</v-toolbar-title>
    </v-app-bar>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card elevation="0">
            <v-row>
              <v-card-subtitle class="text-subtitle-1 mr-auto">
                商品總計
              </v-card-subtitle>
              <v-card-title class="primary--text">{{totalQuantity}} 件</v-card-title>
            </v-row>
            <v-row>
              <v-card-title class="text-subtitle-1 mr-auto">
                總金額(不含運費)
              </v-card-title>
              <v-card-title class="primary--text">${{totalPrice}}</v-card-title>
            </v-row>

            <v-card-actions>
              <v-btn
                class="ma-2 pa-5 ml-auto gocheckout"
                outlined
                width="100%"
                large
                color="primary"
                :disabled="cart.length===0"
                @click="changeRouteHandler"
              >
                前往結帳
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { editOrder } from '../apis/user'
export default {
  props: ['cart'],
  computed: {
    ...mapState(['user', 'cartList', 'orderId']),
    totalPrice () {
      const total = this.cart.reduce((total, product) => {
        return total + product.price * product.quantity
      }, 0)
      this.SET_TOTAL_PRICE(total)
      return total
    },
    totalQuantity () {
      const total = this.cart.reduce((total, product) => {
        return total + product.quantity
      }, 0)
      return total
    }
  },
  methods: {
    ...mapMutations(['SET_TOTAL_PRICE', 'SET_CHECKOUT_STATUS']),
    changeRouteHandler () {
      this.cart.forEach(async (item) => {
        let orderItem = {}
        if (item.detailId) {
          orderItem = this.cartList.find(el => el.productId === item._id && el.detailId === item.detailId)
        } else {
          orderItem = this.cartList.find(el => el.productId === item._id)
        }
        if (orderItem.quantity !== item.quantity) {
          await editOrder(
            { userId: this.user.id, orderId: this.orderId }
            , { quantity: item.quantity, pId: orderItem._id }
          )
          orderItem = ''
        }
      })
      if (!this.user.id) {
        this.$swal.fire({
          title: '請先登入!',
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
        this.SET_TOTAL_PRICE(this.totalPrice)
        this.SET_CHECKOUT_STATUS(true)
        this.$router.push({ name: 'Checkout' })
      }
    }
  }
}
</script>

<style>
#app .gocheckout span.v-btn__content{
  color: inherit;
  font-size: 1rem;
}
</style>
