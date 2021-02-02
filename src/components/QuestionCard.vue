<template>
  <v-container class="d-flex flex-column justify-center align-center pa-0 px-sm-10 py-sm-5">
    <v-row cols="12" class="w100 flex-row flex-wrap justify-start align-center px-0">
      <v-container v-if="isLoading" class="d-flex justify-center">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-container>
      <template v-else>
        <v-col cols="4" class="col-lg-2 d-flex align-center">
          <p class="ma-0">{{questionData.userName}}</p>
        </v-col>
        <v-col cols="8" class="col-lg-8 d-flex align-center">
          <p class="ma-0"><span class="font-weight-bold mr-10">Q:</span>{{questionData.message}}</p>
        </v-col>
        <v-col cols="5" class="col-lg-2 d-flex align-center">
            <span class="words--text text-lg-subtitle-1 text-caption pa-0">
              {{getTimeFromNow(questionData.releaseDate)}}
            </span>
        </v-col>
        <v-row cols="12" class="w100 d-flex flex-row flex-wrap align-center px-0" v-if="questionData.reply">
          <v-col cols="4" class="col-lg-2 d-flex flex-column">
            <div class="overline qcard mb-1 col-6 col-lg-2 pa-0">
              <span class="highlight">Hiker</span>
            </div>
            <div class="overline qcard mb-1 col-6 col-lg-2 pa-0">
              <span class="highlight">Group</span>
            </div>
          </v-col>
          <v-col cols="8" class="col-lg-8 d-flex align-center">
            <div class="d-flex align-center">
              <p class="pa-0"><span class="font-weight-bold mr-10">A:</span>{{questionData.reply}}</p>
            </div>
          </v-col>
          <v-col cols="5" class="col-lg-2">
            <span class="words--text text-lg-subtitle-1 text-caption pa-0">
              {{getTimeFromNow(questionData.replyDate)}}
            </span>
          </v-col>
        </v-row>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { getQuestion } from '../apis/product'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
export default {
  props: ['question', 'productId'],
  data () {
    return {
      isLoading: true,
      questionData: {}
    }
  },
  methods: {
    getTimeFromNow (time) {
      return dayjs(time).locale('zh-tw').fromNow()
    },
    async fetchQuestion () {
      const question = await getQuestion({ productId: this.productId, questionId: this.question._id })
      this.questionData = question.data.result
      this.isLoading = false
    }
  },
  mounted () {
    this.fetchQuestion()
  }
}
</script>

<style>
.w100 {
  width: 100%;
}
.overline.qcard{
  font-size: 0.75rem !important;
}
</style>
