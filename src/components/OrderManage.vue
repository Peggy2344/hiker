<template>
  <v-card
  class="d-flex align-center flex-wrap"
  width="100%"
  outlined
  >
    <v-col cols="12" class="col-md-2 d-flex flex-column align-center justify-center flex-wrap">
      <div class="overline">使用者ID</div>
      <div class="overline">{{userData._id.slice(-8)}}</div>
    </v-col>
    <v-col cols="12" class="col-md-10">
      <OrderManageCard v-for="order in orders" :order="order" :userId="userData._id" :key="order._id"/>
    </v-col>
  </v-card>
</template>

<script>
import OrderManageCard from './OrderManageCard.vue'
export default {
  props: ['userData'],
  components: {
    OrderManageCard
  },
  data () {
    return {
    }
  },
  computed: {
    orders () {
      return this.userData.orders.filter(item => item.checkoutStatus)
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
