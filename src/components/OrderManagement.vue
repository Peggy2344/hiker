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
      <OrderManage v-for="userData in userDatas" :userData="userData" :key="userData._id"/>
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
      userDatas: []
    }
  },
  methods: {
    async fetchData () {
      const result = await getUserOrder()
      this.userDatas = result.data.userOrder
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
