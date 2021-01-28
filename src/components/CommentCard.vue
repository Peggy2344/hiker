<template>
  <v-container class="d-flex flex-wrap justify-center align-center w-100" v-if="!isLoading">
      <v-col cols="2" class="col-lg-2">
        {{commentData.userName}}
      </v-col>
      <v-col cols="8" class="col-lg-6 d-flex flex-column ml-10 ml-lg-0">
        <v-rating
        :value=commentData.star
        background-color="primary lighten-3"
        color="primary"
        size="25"
        half-increments
        readonly
        class="py-lg-3 mb-2"
        ></v-rating>
        <p class="px-3 font-weight-bold mb-2">{{commentData.title}}</p>
        <p class="px-3 mb-2">{{commentData.message}}</p>
      </v-col>
      <v-col cols="6" class="col-lg-3 ml-10 ml-lg-0 py-0">
        <span class="words--text text-lg-subtitle-1 text-subtitle-2 pa-3">
          {{getTimeFromNow(commentData.releaseDate)}}
        </span>
      </v-col>
  </v-container>
</template>

<script>
import { getComment } from '../apis/product'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
export default {
  props: ['comment', 'productId'],
  data () {
    return {
      commentData: {},
      isLoading: true
    }
  },
  methods: {
    getTimeFromNow (time) {
      return dayjs(time).locale('zh-tw').fromNow()
    },
    async fetchComment () {
      const comment = await getComment({ productId: this.productId, commentId: this.comment })
      this.commentData = comment.data.result
      this.isLoading = false
    }
  },
  mounted () {
    this.fetchComment()
  }
}
</script>

<style>
.w-100 {
  width: 100%;
}
</style>
