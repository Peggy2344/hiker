<template>
  <v-card
    class="mx-auto d-flex align-center"
    outlined
    >
    <v-col cols="12" class="d-flex align-center justify-space-between flex-wrap">
      <!-- <v-list-item-content > -->
      <v-col cols="12" class="py-0">
          <div class="overline">{{getTime(order.date)}}</div>
      </v-col>
      <v-col cols="12" class="col-sm-6 col-md-5 col-lg-5 d-flex align-center justify-space-around">
        <div class="d-flex flex-column">
          <div class="overline mb-1">訂單編號</div>
          <router-link :to="{ name: 'OrderDetail', params: { status: 'process', orderId: order._id }}">
            <div class="overline mb-1"> {{order._id.slice(-8)}}</div>
          </router-link>
        </div>
          <div class="overline mb-1"> {{order.products.length}}件商品</div>
          <div class="overline mb-1"> ${{order.payment.totalPrice}}</div>
      </v-col>
      <v-col cols="12" class="py-0 col-sm-3 col-md-3 col-lg-3 d-flex flex-lg-column justify-center align-center flex-lg-row">
          <div class="overline text-wrap mx-2">{{order.payment.delivery}}</div>
          <div class="overline text-wrap mx-2">{{order.payment.payment}}</div>
      </v-col>
      <v-col cols="12" class="py-0 col-sm-6 col-md-4 col-lg-4 d-flex flex-wrap justify-center align-center">
        <div v-if="edit" class="col-7 overline mb-1">狀態:
          <select v-model="status" class="select">
            <option value="處理中">處理中</option>
            <option value="配送中">配送中</option>
            <option value="已完成">已完成</option>
          </select>
        </div>
        <div v-else class="col-7 overline mb-1">狀態: {{order.status}}</div>
        <div class="mx-lg-5 col-5">
          <template v-if="edit">
            <v-btn
              class="edit_btn mx-lg-1 my-1"
              outlined
              small
              color="primary"
              @click="cancel"
              >
              取消
            </v-btn>
            <v-btn
              class="edit_btn mx-lg-1 my-1"
              outlined
              small
              color="primary"
              @click="update"
              >
              更新
            </v-btn>
          </template>
          <template v-else>
            <v-btn
              class="edit_btn"
              outlined
              small
              color="primary"
              @click="changeStatus"
              >
              更新狀態
            </v-btn>
          </template>
        </div>
      </v-col>
      <!-- </v-list-item-content> -->
    </v-col>
  </v-card>
</template>

<script>
import { editStatus } from '../apis/admin'
import dayjs from 'dayjs'
export default {
  props: ['order', 'userId'],
  data () {
    return {
      edit: false,
      status: '',
      isLoading: true
    }
  },
  methods: {
    getTime (time) {
      return dayjs(time).format('YYYY/MM/DD HH:mm')
    },
    changeStatus () {
      this.edit = true
    },
    cancel () {
      this.status = this.order.status
      this.edit = false
    },
    async update () {
      const param = {
        status: this.status,
        handleStatus: ''
      }
      this.status === '已完成' ? param.handleStatus = 'finish' : param.handleStatus = 'process'
      const res = await editStatus({ userId: this.userId, orderId: this.order._id }, param)
      if (res.status === 200) {
        this.$swal({
          icon: 'success',
          title: '更新成功'
        }).then(() => {
          this.order.status = this.status
          this.edit = false
        })
      }
    }
  },
  mounted () {
    this.status = this.order.status
  }
}
</script>

<style>
#app .edit_btn span.v-btn__content {
  color: var(--v-primary-base);
}
.select{
  width: 50px;
  border: 1px solid var(--v-primary-base);
}
</style>
