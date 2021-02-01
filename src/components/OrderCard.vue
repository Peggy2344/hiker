<template>
  <v-card
    class="mx-auto d-flex flex-wrap align-center justify-center"
    max-width="600"
    outlined
  >
    <v-col cols="4" class="col-lg-3">
      <router-link :to="{name: 'ProductDetail', params: {productId: product._id} }">
        <v-img :src="env + '/products/file/' + product.productImg[0].file" >
        </v-img>
      </router-link>
    </v-col>
    <v-list-item three-line class="col-7 col-lg-5">
      <v-list-item-content>
        <div class="overline mb-1">
          {{product.brand}}
        </div>
        <div class="text-subtitle-1 headline mb-4 text-wrap">
          {{product.productName}}
          <div v-if="product.detail">
            <span class="overline mr-3" v-if="product.detail.color">{{ product.detail.color }}</span>
            <span class="overline" v-if="product.detail.size">{{ product.detail.size }}</span>
          </div>
        </div>
        <v-list-item-subtitle class="primary--text">${{product.price}}</v-list-item-subtitle>
      </v-list-item-content>

    </v-list-item>
    <v-list-item class="col-6 col-lg-4">
      <v-list-item-content>
        <v-row class="d-flex align-center justify-lg-end">
          <v-btn
            class="mx-2"
            fab
            x-small
            :disabled="product.quantity<=1"
            icon
            @click="decrement()"
          >
            <v-icon dark  color="primary">
              mdi-minus
            </v-icon>
          </v-btn>
          <div>
            <span>
              {{product.quantity}}
            </span>
          </div>
          <v-btn
            class="mx-2 mr-auto"
            fab
            x-small
            icon
            @click="increment()"
          >
            <v-icon dark color="primary">
              mdi-plus
            </v-icon>
          </v-btn>
          <v-btn
          class="mx-1"
          fab
          icon
          x-small
          @click="delCart()"
        >
          <v-icon dark color="confirm">
            mdi-close
          </v-icon>
        </v-btn>
        </v-row>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import { delOrder } from '../apis/user'
import { mapState } from 'vuex'
export default {
  props: ['product'],
  data () {
    return {
      env: process.env.VUE_APP_API
    }
  },
  computed: {
    ...mapState(['user', 'cartList', 'orderId'])
  },
  methods: {
    increment () {
      this.product.quantity++
      if (!this.user.id) {
        this.$store.commit('INCREMENT_ITEM', { productId: this.product._id })
      }
    },
    decrement () {
      this.product.quantity--
      if (!this.user.id) {
        this.$store.commit('DECREMENT_ITEM', { productId: this.product._id })
      }
    },
    async delCart () {
      let item = {}
      if (this.product.detailId) {
        item = this.cartList.find(el => el.detailId === this.product.detailId)
      } else {
        item = this.cartList.find(el => el.productId === this.product._id)
      }
      // const index = this.cart.indexOf(item)
      if (this.user.id) {
        await delOrder({ userId: this.user.id, orderId: this.orderId, pId: item.productId })
      }
      this.$emit('delCart', item)
      // this.cart.splice(index, 1)
      if (this.product.detailId) {
        this.$store.commit('DEL_CART', { detailId: item.detailId })
      } else {
        this.$store.commit('DEL_CART', { productId: item.productId })
      }
      // } else {
      //   this.$emit('delCart', item)
      //   // this.cart.splice(index, 1)
      //   this.$store.commit('DEL_CART', { productId: this.product._id })
      // }
    }
  }

}
</script>

<style>

</style>
