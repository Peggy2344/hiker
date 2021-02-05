import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getCart } from '../apis/user'

Vue.use(Vuex)

function defaultState () {
  return {
    user: {
      username: '',
      id: '',
      role: ''
    },
    cartList: [],
    orderId: '',
    orderDetail: {
      receiver: '',
      phone: 0,
      address: '',
      delivery: '',
      payment: '',
      totalPrice: 0
    },
    processCheckout: false
  }
}
function defaultOrderDetail () {
  return {
    receiver: '',
    phone: 0,
    address: '',
    delivery: '',
    payment: '',
    totalPrice: 0
  }
}

export default new Vuex.Store({
  state: defaultState(),
  getters: {
  },
  mutations: {
    logout (state) {
      Object.assign(state, defaultState())
    },
    login (state, data) {
      state.user.username = data.username
      state.user.id = data.id
      state.user.role = data.role
    },
    SET_TOTAL_PRICE (state, total) {
      state.orderDetail.totalPrice = total
    },
    SET_ORDER_DETAIL (state, total) {
      state.orderDetail = total
    },
    SET_CHECKOUT_STATUS (state, boolean) {
      state.processCheckout = boolean
    },
    INIT_CART (state) {
      const cart = window.localStorage.getItem('hiker-cart')
      if (cart) {
        state.cartList = JSON.parse(cart)
      }
    },
    SET_CART (state, items) {
      state.cartList = items.cartList
      state.orderId = items.orderId
    },
    ADD_CART (state, { productId, price, productName, detailId, quantity }) {
      const product = { productId, price, productName, detailId }
      const cart = state.cartList
      let newCartItem = true
      if (cart.length) {
        if (product.detailId) {
          cart.forEach(item => {
            if (item.productId === product.productId && item.detailId === product.detailId) {
              item.quantity += quantity
              newCartItem = false
            }
          })
        } else {
          cart.forEach(item => {
            if (item.productId === product.productId) {
              item.quantity += quantity
              newCartItem = false
            }
          })
        }
      }
      if (!cart.length || newCartItem) {
        product.quantity = quantity
        cart.push(product)
      }
      state.cartList = cart
      window.localStorage.setItem('hiker-cart', JSON.stringify(cart))
    },
    RESET_CART (state) {
      Object.assign(state.orderDetail, defaultOrderDetail())
      state.cartList = []
      state.orderId = ''
    },
    INCREMENT_ITEM (state, { productId }) {
      const cartItem = state.cartList.find(item => item.productId === productId)
      cartItem.quantity++
      window.localStorage.setItem('hiker-cart', JSON.stringify(state.cartList))
    },
    DECREMENT_ITEM (state, { productId }) {
      const cartItem = state.cartList.find(item => item.productId === productId)
      cartItem.quantity--
      window.localStorage.setItem('hiker-cart', JSON.stringify(state.cartList))
    },
    DEL_CART (state, id) {
      const cart = state.cartList
      if (id.detailId) {
        cart.forEach((item, index) => {
          if (item.detailId === id.detailId) {
            cart.splice(index, 1)
          }
        })
      } else {
        cart.forEach((item, index) => {
          if (item.productId === id.productId) {
            cart.splice(index, 1)
          }
        })
      }
      state.cartList = cart
      // 存入localStorage
      window.localStorage.setItem('hiker-cart', JSON.stringify(state.cartList))
    }
  },
  actions: {
    // navbar 獲取資料，並更新 localStorage
    async fetchCartList ({ state, commit }) {
      const result = await getCart({ userId: state.user.id })
      if (!result.data.orderList) {
        commit('SET_CART', { cartList: [], orderId: '' })
      } else {
        let cartList = []
        if (result.data.orderList.products.length) {
          cartList = result.data.orderList.products
        }
        const orderId = result.data.orderList._id
        console.log(cartList)
        window.localStorage.setItem('hiker-cart', JSON.stringify(cartList))
        commit('SET_CART', { cartList, orderId })
      }
      commit('INIT_CART')
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
