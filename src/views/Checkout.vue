<template>
  <v-app>
    <v-container class="d-flex justify-center align-center">
    <Navbar />
    <v-row class="d-flex justify-center align-center transformY">
      <v-col cols="10" class="col-md-10 col-lg-7 transformY">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step
              :complete="e1 > 1"
              step="1"
            >
              選擇配送方式
            </v-stepper-step>

            <v-divider>
            </v-divider>

            <v-stepper-step
              :complete="e1 > 2"
              step="2"
            >
              選擇付款方式
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">
              完成訂單
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-row class="d-flex justify-center align-center">
                <v-radio-group
                  v-model="delivery"
                  mandatory
                >
                <v-card
                  class="mb-12 d-flex flex-column justify-center align-center"
                  width="400px"
                >
                  <v-expansion-panels :value="0">
                    <v-expansion-panel :key="0">
                      <v-form v-model="shopValid">
                      <v-expansion-panel-header>
                        <v-radio
                          label="超商取貨"
                          value="shop"
                          color="bright"
                        ></v-radio>
                        <span class="primary--text">$60</span>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content class="col-10">
                        <v-text-field
                          v-model="shop.receiver"
                          :rules="nameRules"
                          label="收件人姓名"
                          validate-on-blur
                          outlined
                          dense
                        ></v-text-field>
                        <v-text-field
                          v-model="shop.phone"
                          :rules="phoneRules"
                          label="手機"
                          validate-on-blur
                          outlined
                          dense
                        ></v-text-field>
                        <v-text-field
                          v-model="shop.address"
                          :rules="addressRules"
                          validate-on-blur
                          label="取貨門市"
                          outlined
                          dense
                        ></v-text-field>
                      </v-expansion-panel-content>
                      </v-form>
                    </v-expansion-panel>
                    <v-expansion-panel :key="1">
                    <v-form v-model="homeValid">
                      <v-expansion-panel-header>
                        <v-radio
                          label="宅配到府"
                          value="home"
                          color="bright"
                        ></v-radio>
                        <span class="primary--text">$80</span>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content class="col-10">
                        <v-text-field
                          v-model="home.receiver"
                          label="收件人姓名"
                          :rules="nameRules"
                          validate-on-blur
                          outlined
                          dense
                        ></v-text-field>
                        <v-text-field
                          v-model="home.phone"
                          label="手機"
                          :rules="phoneRules"
                          validate-on-blur
                          outlined
                          dense
                        ></v-text-field>
                        <v-text-field
                          v-model="home.address"
                          label="地址"
                          :rules="addressRules"
                          validate-on-blur
                          outlined
                          dense
                        ></v-text-field>
                      </v-expansion-panel-content>
                    </v-form>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card>
                </v-radio-group>
              </v-row>
              <v-row class="px-lg-10 px-5 py-lg-5 d-felx justify-space-between">
                <v-btn
                color="secondary"
                outlined
                >
                  返回購物
                </v-btn>
                <v-btn
                  color="primary"
                  @click="checkValidate"
                  outlined
                  class="checkout_btn"
                >
                  下一步
                </v-btn>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="2">
              <!-- <v-row> -->
              <!-- <v-item-group active-class="primary">
                <v-container> -->
              <v-row class="d-flex flex-wrap justify-space-around">
                <v-col cols="12" class="d-flex justify-space-around">
                  <v-col cols="5" class="col-sm-4 col-lg-3 col-xl-2 d-flex flex-column align-center justify-center" :class="{ 'check': !activePayment, 'box_border': activePayment }" @click="activePayment = true">
                      <v-icon :color="activeCard" size="50">
                        mdi-credit-card-outline
                      </v-icon>
                      <div>
                        <span class="text-caption text-sm-subtitle-1">信用卡付款</span>
                      </div>
                  </v-col>
                  <v-col cols="5" class="col-sm-4 col-lg-3 col-xl-2 d-flex flex-column align-center justify-center" :class="{ 'check': activePayment, 'box_border': !activePayment }" @click="activePayment = false">
                    <v-icon :color="activeShop" size="50">
                        mdi-store-outline
                      </v-icon>
                      <div>
                        <span class="text-caption text-sm-subtitle-1">取貨付款</span>
                      </div>
                  </v-col>
                </v-col>
                <transition name="slide-fade">
                <template v-if="activePayment">
                  <v-form
                    v-model="valid"
                    lazy-validation
                  >
                    <v-col cols="12" class="col-lg-10 mt-10 d-flex flex-column justify-start align-start ma-auto">
                      <v-col cols="3" class="px-0">
                        <img width="200px" :src="require('../assets/card.jpg')">
                      </v-col>
                      <v-col cols="12">
                        <v-row class=" d-flex align-center">
                          <p>信用卡號碼</p>
                        </v-row>
                        <v-row class="d-flex align-center">
                            <input v-model="payment.cardnum1" class="inputs" type="text" pattern="[0-9]+" maxlength="4" />‧
                            <input v-model="payment.cardnum2" class="inputs" type="password" pattern="[0-9]*" maxlength="4" />‧
                            <input v-model="payment.cardnum3" class="inputs" type="password" pattern="[0-9]*" maxlength="4" />‧
                            <input v-model="payment.cardnum4" class="inputs" type="text" pattern="[0-9]*" maxlength="4" />
                        </v-row>
                        <v-row class=" d-flex align-center">
                          <div class="mt-10">有效年月</div>
                        </v-row>
                        <v-row class="d-flex">
                            <v-col cols="6" class="col-lg-4 d-flex">
                              <v-select
                                v-model="payment.expYear"
                                :items="year"
                                label="年"
                                dense
                                outlined
                                class="my-auto"
                              ></v-select>
                            </v-col>
                            <v-col cols="6" class="col-lg-4 d-flex align-center">
                              <v-select
                                v-model="payment.expMonth"
                                :items="month"
                                label="月"
                                dense
                                outlined
                                class="my-auto"
                              ></v-select>
                            </v-col>
                        </v-row>
                        <v-row class=" d-flex align-center">
                          <div>CVV</div>
                        </v-row>
                        <v-row class="align-center d-flex">
                            <v-col cols="8" class="col-md-6 col-lg-3 d-flex align-center text-center">
                              <input
                                v-model="payment.cvv"
                                class="inputs"
                                type="password"
                                pattern="[0-9]*"
                                maxlength="3">
                            </v-col>
                        </v-row>
                      </v-col>
                    </v-col>
                  </v-form>
                </template>
                </transition>
              </v-row>
                <!-- </v-container>
              </v-item-group> -->
              <!-- </v-row> -->
              <v-row class="d-flex justify-space-between px-5 px-lg-10 mt-15">
                <v-btn
                  color="primary"
                  @click="e1 = 1"
                  outlined
                  :small="$vuetify.breakpoint.mobile"
                  class="checkout_btn"
                >
                  返回上一步
                </v-btn>

                <v-btn
                  color="primary"
                  @click="submitHandler"
                  outlined
                  :small="$vuetify.breakpoint.mobile"
                  class="checkout_btn"
                >
                  提交訂單
                </v-btn>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-row class="d-flex justify-center align-center">
                <v-col cols="2">
                  <v-img :src="require('../assets/check.png')" max-width="100px"></v-img>
                </v-col>
                <v-col cols="12" class="my-10 d-flex flex-column justify-center align-center">
                  <p class="text-h5 bright--text">訂單完成</p>
                  <p>訂單編號{{orderId.slice(-8)}}</p>
                  <p>請至會員中心查看最新進度</p>
                  <v-btn
                    color="primary"
                    outlined
                    :to="{name: 'Purchase', params: {status: 'process' }}"
                    class="mt-10 go_btn"
                  >
                    前往我的訂單
                  </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
      <v-col cols="12" class="col-lg-4 transformY">
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
                      <v-card-title class="primary--text">{{cartList.length}} 件</v-card-title>
                    </v-row>
                    <v-row>
                      <v-card-subtitle class="text-subtitle-1 mr-auto">
                        商品金額
                      </v-card-subtitle>
                      <v-card-title class="primary--text">{{orderDetail.totalPrice}} 元</v-card-title>
                    </v-row>
                    <v-row>
                      <v-card-subtitle class="text-subtitle-1 mr-auto">
                        運費總計
                      </v-card-subtitle>
                      <v-card-title class="primary--text">{{deliveryCost}} 元</v-card-title>
                    </v-row>
                    <v-row>
                      <v-card-title class="text-subtitle-1 mr-auto">
                        總金額
                      </v-card-title>
                      <v-card-title class="primary--text">${{totalPrice}}</v-card-title>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </template>
      </v-col>
      <v-col cols="4">
      </v-col>
    </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { completeOrder } from '../apis/user'
import Navbar from '../components/Navbar'
export default {
  components: {
    Navbar
  },
  data () {
    return {
      valid: false,
      e1: 1,
      cardNumber: '',
      delivery: '',
      value: '0',
      shopValid: false,
      shop: {
        receiver: '',
        phone: '',
        address: '',
        delivery: '超商取貨',
        deliveryCost: 60
      },
      homeValid: false,
      home: {
        receiver: '',
        phone: '',
        address: '',
        delivery: '宅配',
        deliveryCost: 80
      },
      activePayment: true,
      nameRules: [
        v => !!v || '收件人為必填'
      ],
      phoneRules: [
        v => !!v || '手機為必填',
        v => /((?=(09))[0-9]{10})$/g.test(v) || '手機格式錯誤'
      ],
      addressRules: [
        v => !!v || '地址為必填'
      ],
      year: ['2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032'],
      month: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      payment: {
        cardnum1: '',
        cardnum2: '',
        cardnum3: '',
        cardnum4: '',
        cvv: '',
        expYear: '',
        expMonth: ''
      }
    }
  },
  computed: {
    ...mapState(['user', 'cartList', 'orderId', 'orderDetail']),
    activeCard () {
      return this.activePayment ? 'help' : 'darkGray'
    },
    activeShop () {
      return this.activePayment ? 'darkGray' : 'help'
    },
    deliveryCost () {
      let cost = 0
      if (this.delivery === 'shop') {
        cost = this.shop.deliveryCost
      } else if (this.delivery === 'home') {
        cost = this.home.deliveryCost
      }
      return cost
    },
    totalPrice () {
      return this.orderDetail.totalPrice + this.deliveryCost
    }
  },
  methods: {
    ...mapMutations(['SET_ORDER_DETAIL', 'RESET_CART', 'SET_CART', 'SET_CHECKOUT_STATUS']),
    checkValidate () {
      if (this.delivery === 'shop' && this.shopValid) {
        this.e1 = 2
        this.shop.totalPrice = this.totalPrice
        this.SET_ORDER_DETAIL(this.shop)
      } else if (this.delivery === 'home' && this.homeValid) {
        this.e1 = 2
        this.home.totalPrice = this.totalPrice
        this.SET_ORDER_DETAIL(this.home)
      } else {
        this.$swal({
          icon: 'error',
          text: '請填寫完整資訊'
        })
      }
    },
    submitHandler () {
      if (this.activePayment) {
        const payment = this.payment
        if (!(payment.cardnum1.length === 4 && payment.cardnum2.length === 4 && payment.cardnum3.length === 4 && payment.cardnum4.length === 4)) {
          alert('請輸入完整的信用卡資訊')
          return
        } else if (!(payment.expYear && payment.expMonth)) {
          alert('請選擇有效年月')
          return
        } else if (!payment.cvv) {
          alert('請輸入CVV號碼')
          return
        }
        this.orderDetail.payment = '信用卡付款'
        this.completeSubmit()
      } else {
        this.orderDetail.payment = '貨到付款'
        this.completeSubmit()
      }
    },
    async completeSubmit () {
      this.SET_ORDER_DETAIL(this.orderDetail)
      await completeOrder({ userId: this.user.id, orderId: this.orderId }, { payment: this.orderDetail })
      this.SET_CART({ cartList: [], orderId: '' })
      this.RESET_CART()
      window.localStorage.removeItem('hiker-cart')
      this.e1 = 3
    }
  },
  beforeRouteLeave (to, from, next) {
    this.SET_CHECKOUT_STATUS(false)
    next()
  }
}
</script>

<style>
.transformY{
  transform: translateY(60px);
}
#app .checkout_btn span.v-btn__content{
  color: inherit;
  font-size: 1rem;
}
.box_border{
  cursor: pointer;
  border: 2px solid var(--v-help-base);
  border-radius: 10px;
  background: rgba(76, 201, 240, 0.1);
}
.check{
  cursor: pointer;
  border: 2px solid #aeaeae;
  border-radius: 10px;
  background: rgba(207, 219, 213, 0.1);
}
.inputs {
  width: 40px;
  margin: 5px;
  border: 1px solid rgba(0, 0, 0, 0.87);
  border-radius: 5px;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}
#app .go_btn span.v-btn__content{
  color: inherit;
}
@media (min-width:768px) {
  .inputs {
    width: 60px;
  }
}
</style>
