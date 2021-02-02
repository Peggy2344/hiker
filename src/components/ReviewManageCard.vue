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
      <v-col cols="12" class="col-lg-6 d-flex justify-start align-center">
        <v-snackbar
          centered
          v-model="isLoading"
          >
          更新中...
        </v-snackbar>
        <div class="mx-5">
          顯示狀態: {{ comment.display ?  '顯示' : '不顯示'}}
        </div>
        <v-btn :disabled="!comment.display" icon class="mx-3" @click="displayHandler(false)">
          <v-icon color="confirm">
            mdi-cancel
          </v-icon>
        </v-btn>
        <v-btn :disabled="comment.display" color="confirm" @click="displayHandler(true)">
          恢復顯示
        </v-btn>
      </v-col>
    </v-col>
  </v-card>
</template>

<script>
import { editComment } from '../apis/admin'
import dayjs from 'dayjs'
export default {
  props: ['comment', 'productId'],
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    getTime (time) {
      return dayjs(time).format('YYYY/MM/DD')
    },
    displayHandler (boolean) {
      if (!boolean) {
        this.$swal.fire({
          reverseButtons: true,
          text: '確定要禁用此評論?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#ed5e68',
          cancelButtonText: '取消',
          cancelButtonColor: '#8388a4',
          confirmButtonText: '確定'
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.isLoading = true
            await editComment({ productId: this.productId, commentId: this.comment._id }, { display: boolean })
            this.isLoading = false
            this.comment.display = boolean
          }
        })
      } else {
        this.$swal.fire({
          reverseButtons: true,
          text: '確定要恢復此評論?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#ed5e68',
          cancelButtonColor: '#8388a4',
          cancelButtonText: '取消',
          confirmButtonText: '確定'
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.isLoading = true
            await editComment({ productId: this.productId, commentId: this.comment._id }, { display: boolean })
            this.isLoading = false
            this.comment.display = boolean
          }
        })
      }
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
