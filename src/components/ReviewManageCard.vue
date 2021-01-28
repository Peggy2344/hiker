<template>
  <v-card
    class="mx-auto d-flex align-center"
    outlined
    >
    <v-col cols="12" class="d-flex align-center justify-space-between flex-wrap">
      <!-- <v-list-item-content > -->
      <v-col cols="12" class="py-0">
          <div class="overline">{{getTime(comment.releaseDate)}}</div>
      </v-col>
      <v-col cols="12" class="d-flex align-center justify-center justify-lg-start flex-wrap">
        <div class="d-flex flex-column col-5 col-lg-2">
          <div class="overline mb-1">使用者ID</div>
          <div class="overline mb-1">{{comment.u_id.slice(-8)}}</div>
        </div>
          <div class="d-flex justify-start overline mb-1 col-7 col-lg-3">
            <v-rating
              :value=comment.star
              background-color="primary lighten-3"
              color="primary"
              size="15"
              half-increments
              readonly
            ></v-rating>
          </div>
          <div class="overline mb-1 col-6 col-lg-3"> {{comment.title}}</div>
          <div class="overline mb-1 col-6 col-lg-4"> {{comment.message}}</div>
      </v-col>
      <!-- <v-col cols="5" class="py-0 col-sm-3 col-md-3 col-lg-3 d-flex flex-column justify-center align-center flex-lg-row">
          <div class="overline text-wrap mx-2">{{order.payment.delivery}}</div>
          <div class="overline text-wrap mx-2">{{order.payment.payment}}</div>
      </v-col>
      <v-col cols="7" class="py-0 col-sm-6 col-md-4 col-lg-4 d-flex justify-center align-center">
        <div v-if="edit" class="overline mb-1">狀態:
          <select v-model="status" class="select">
            <option value="處理中">處理中</option>
            <option value="配送中">配送中</option>
            <option value="已完成">已完成</option>
          </select>
        </div>
        <div v-else class="overline mb-1">狀態: {{order.status}}</div>
        <div class="mx-5">
          <template v-if="edit">
            <v-btn
              class="edit_btn"
              outlined
              small
              color="primary"
              @click="cancel"
              >
              取消
            </v-btn>
            <v-btn
              class="edit_btn"
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
      </v-col> -->
      <!-- </v-list-item-content> -->
    </v-col>
  </v-card>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: ['comment'],
  data () {
    return {
    }
  },
  methods: {
    getTime (time) {
      return dayjs(time).format('YYYY/MM/DD')
    }
  },
  mounted () {
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
