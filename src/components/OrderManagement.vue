<template>
<v-app>
  <v-row id="app" class="d-flex mx-5 flex">
    <v-col cols="12">
      <v-row class="mx-4 my-3 pa-0 d-flex justify-start align-center">
        <h1 class="ma-0 text-lg-h5 text-subtitle-1 words--text  font-weight-bold">訂單管理</h1>
      </v-row>
      <hr class="my-0">
    </v-col>
    <v-col cols="12" class="d-flex flex-column justify-start align-start">
      <div>
        <v-select
          v-model="selection"
          :items="items"
          label="排序依據"
          validate-on-blur
        ></v-select>
      </div>
        <v-container v-if="isLoading" class="progress">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-container>
      <template v-else>
        <OrderManage v-for="userData in orders" :userData="userData" :key="userData.orders[0]._id"/>
      </template>
    </v-col>
  </v-row>
</v-app>
</template>

<script>
import { getUserOrder } from '../apis/admin'
import OrderManage from './OrderManage.vue'
export default {
  components: {
    OrderManage
  },
  data () {
    return {
      userDatas: [],
      items: ['使用者', '訂單成立時間(由新至舊)'],
      selection: '使用者',
      isLoading: true
    }
  },
  computed: {
    orders () {
      let ary = []
      if (this.selection === '使用者') {
        ary = this.userDatas
      } else {
        this.userDatas.forEach(item => {
          item.orders.forEach(order => {
            ary.push({ _id: item._id, orders: [order] })
          })
        })
        ary.sort((a, b) => {
          return new Date(b.orders[0].date) - new Date(a.orders[0].date)
        })
      }
      return ary
    }
  },
  methods: {
    async fetchData () {
      const result = await getUserOrder()
      this.userDatas = result.data.userOrder
      this.isLoading = false
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style>
.flex{
  flex: 0 0 auto;
}
</style>
