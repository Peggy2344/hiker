<template>
  <v-card
    class="mx-auto d-flex align-center"
    outlined
    >
    <v-col cols="12" class="d-flex align-center justify-space-between flex-wrap">
      <!-- <v-list-item-content > -->
      <v-col cols="12" class="py-0">
          <div class="overline">{{getTime(question.releaseDate)}}</div>
      </v-col>
      <v-col cols="12" class="d-flex align-center justify-center justify-lg-start flex-wrap">
        <div class="overline mb-1 col-6 col-lg-2"> {{question.userName}}</div>
        <div class="overline mb-1 col-6 col-lg-4"> Q : {{question.message}}</div>
        <div class=" col-12 col-lg-6 d-flex flex-wrap align-center">
          <div class="overline col-12"> 回覆狀態 : </div>
          <template v-if="!question.reply">
            <div class="overline mx-5">尚未回覆</div>
            <div v-if="!reply">
              <v-btn
                small
                outlined
                class="reply_btn"
                color="sideabr"
                @click="reply = true"
              >
                回覆問題
              </v-btn>
            </div>
            <template v-if="reply">
              <div class="d-flex flex-column align-end">
                <v-textarea
                  v-model="replyMessage"
                  label="回覆"
                  outlined
                  clearable
                ></v-textarea>
                <div class="d-flex">
                  <v-btn
                    small
                    outlined
                    class="reply_btn mx-3"
                    color="sideabr"
                    @click="reply = false"
                  >
                    取消
                  </v-btn>
                  <v-btn
                    small
                    outlined
                    class="reply_btn"
                    color="sideabr"
                    @click="submitHandler"
                  >
                    送出
                  </v-btn>
                </div>
              </div>
            </template>
          </template>
          <template v-else>
            <div class="overline mb-1 col-lg-12">{{question.reply}}</div>
            <div class="overline mb-1 col-lg-12">{{getTime(question.replyDate)}}</div>
          </template>
        </div>
      </v-col>
    </v-col>
  </v-card>
</template>

<script>
import { postQuestionReply } from '../apis/admin'
import dayjs from 'dayjs'
export default {
  props: ['question', 'productId'],
  data () {
    return {
      reply: false,
      replyMessage: ''
    }
  },
  methods: {
    getTime (time) {
      return dayjs(time).format('YYYY/MM/DD')
    },
    async submitHandler () {
      if (!this.replyMessage) {
        alert('請填寫完整回覆')
      } else {
        const result = await postQuestionReply({ productId: this.productId, questionId: this.question._id }, { reply: this.replyMessage })
        console.log(result)
        if (result.data.success) {
          this.question.reply = this.replyMessage
          this.question.replyDate = Date.now()
          this.replyMessage = ''
          this.reply = false
        }
      }
    }
  },
  mounted () {
  }
}
</script>

<style>
#app .reply_btn span.v-btn__content {
  color: var(--v-words-base);
}
.select{
  width: 50px;
  border: 1px solid var(--v-primary-base);
}
</style>
