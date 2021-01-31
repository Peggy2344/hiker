<template>
  <v-app app class="home vh-100">
    <Navbar />
    <v-container class="d-flex justify-center align-center flex-column vh-100">
        <h3 class="login mb-10">登入</h3>
        <v-form
          class="form-width"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="username"
            :rules="nameRules"
            label="請輸入你的帳號"
            validate-on-blur
            outlined
            clearable
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            @keyup.enter="submitHandler"
            :rules="passwordRules"
            label="請輸入你的密碼"
            validate-on-blur
            type="password"
            outlined
            clearable
            required
          ></v-text-field>

          <v-btn
            :disabled="pending"
            color="primary"
            class="ma-auto"
            width="100%"
            height="50px"
            @click="submitHandler"
          >
            {{ pending ? '登入中' : '送出' }}
          </v-btn>
          <!-- <v-progress-circular
            v-if="pending"
            :width="5"
            color="primary"
            indeterminate
          ></v-progress-circular> -->
        </v-form>
    </v-container>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import { login, postOrder, pushOrder, editOrder } from '../apis/user.js'
import Navbar from '../components/Navbar.vue'
export default {
  components: {
    Navbar
  },
  data: () => ({
    valid: true,
    username: '',
    password: '',
    nameRules: [
      v => !!v || '帳號名稱為必填'
    ],
    passwordRules: [
      v => !!v || '密碼為必填'
    ],
    prevRoute: '',
    cart: [],
    pending: false
  }),
  computed: {
    ...mapState(['user', 'orderId', 'cartList'])
  },

  methods: {
    validate () {
      this.$refs.form.validate()
    },
    async submitHandler () {
      if (this.$refs.form.validate()) {
        this.pending = true
        try {
          const res = await login({
            username: this.username,
            password: this.password
          })
          if (res.data.success) {
            this.$store.commit('login', res.data.user)
            this.$store.dispatch('fetchCartList').then(() => {
              if (!this.cart) return
              if (this.orderId) {
                this.cart.forEach(async item => {
                  const alreadyInCart = this.cartList.find(el => el.productId === item.productId)
                  if (alreadyInCart) {
                    await editOrder(
                      { userId: this.user.id, orderId: this.orderId }
                      , { quantity: item.quantity + alreadyInCart.quantity, pId: alreadyInCart._id }
                    )
                  } else {
                    await pushOrder({ userId: this.user.id, orderId: this.orderId }, item)
                  }
                })
              } else {
                this.cart.forEach(async item => {
                  await postOrder({ userId: this.user.id }, item)
                })
              }
              localStorage.removeItem('hiker-cart')
            })
            this.pending = false
            if (this.prevRoute && this.prevRoute.params.productId) {
              this.$router.go(-1)
            } else if (res.data.user.role === 'admin') {
              this.$router.push('/admin/product-management')
            } else {
              this.$router.push('/')
            }
          } else {
            this.pending = false
            this.$swal({
              icon: 'error',
              title: res.data.message
            })
          }
        } catch (err) {
          this.pending = false
          console.log(err)
          this.$swal({
            icon: 'error',
            title: '發生錯誤',
            text: err.response.data.message
          })
        }
      }
    }
  },
  mounted () {
    this.cart = JSON.parse(window.localStorage.getItem('hiker-cart'))
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.prevRoute = from
    })
  }
}
</script>

<style>
.login{
  font-size: 2.3rem;
  color: var(--v-primary-base);
}
.vh-100{
  height: 100vh;
}
.form-width{
  width: 300px;
}
@media (min-width: 768px) {
  .form-width{
    width: 380px;
  }
}
</style>
