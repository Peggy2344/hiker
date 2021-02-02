<template>
<div class="formContainer rounded-lg pa-10 pa-sm-15 pb-sm-10">
  <form class="py-5">
    <v-text-field
      v-model="question.userName"
      outlined
      class="mx-sm-5"
      label="請填寫你的姓名"
      validate-on-blur
      :rules="userNameRules"
      required
    ></v-text-field>
    <v-textarea
      v-model="question.message"
      outlined
      name="input-7-4"
      label="填寫你的問題"
      validate-on-blur
      :rules="messageRules"
      class="mx-sm-5"
    ></v-textarea>
    <div class="ma-sm-5">
      <v-btn
        depressed
        color="primary"
        height="35px"
        width="100%"
        :disabled="isLoading"
        @click.stop.prevent="submitHandler()"
      >
        送出
      </v-btn>
    </div>
  </form>
</div>
</template>

<script>
import { postQuestion } from '../apis/product'
export default {
  props: ['productId'],
  data () {
    return {
      question: {
        userName: '',
        message: ''
      },
      userNameRules: [
        v => !!v || '文章標題為必填'
      ],
      messageRules: [
        v => !!v || '評論內容為必填'
      ],
      isLoading: false
    }
  },
  methods: {
    async submitHandler () {
      try {
        this.isLoading = true
        const question = { ...this.question }
        const result = await postQuestion({ productId: this.productId }, question)
        if (result.status !== 200) throw new Error(result.data.message)
        this.isLoading = false
        this.$emit('after-question', result.data.questions)
        this.$swal({
          icon: 'success',
          text: '感謝你的問題，我們會盡快回覆'
        })
        this.question.userName = ''
        this.question.message = ''
      } catch (error) {
        this.isLoading = false
        this.$swal({
          icon: 'error',
          text: error.response.data.message
        }).then(() => {
          this.$emit('close-form')
        })
      }
    }
  }
}
</script>

<style>
.formContainer{
  background: var(--v-secondary-base);
  border: 1px solid #356859;
}

</style>
