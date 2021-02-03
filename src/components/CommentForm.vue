<template>
<div class="formContainer rounded-lg pa-10 pa-sm-15 pb-sm-10">
  <form class="py-5">
    <v-rating
      hover
      length="5"
      size="30"
      background-color="primary lighten-3"
      class="mb-5 mx-lg-3"
      color="primary"
      :value=comment.star
      v-model="comment.star"
    ></v-rating>
    <v-text-field
      v-model="comment.title"
      outlined
      class="mx-sm-5"
      label="請填寫評論標題"
      validate-on-blur
      :rules="titleRules"
      required
    ></v-text-field>
    <v-textarea
      v-model="comment.message"
      outlined
      name="input-7-4"
      label="撰寫你的評論"
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
        {{ isLoading ? '送出中' : '送出' }}
      </v-btn>
    </div>
  </form>
</div>
</template>

<script>
import { postComment } from '../apis/product'
export default {
  props: ['productId'],
  data () {
    return {
      comment: {
        star: 0,
        title: '',
        message: ''
      },
      titleRules: [
        v => !!v || '文章標題為必填'
      ],
      messageRules: [
        v => !!v || '評論內容為必填'
      ],
      isLoading: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    async submitHandler () {
      try {
        this.isLoading = true
        this.comment.u_id = this.user.id
        const comment = { ...this.comment }
        const result = await postComment({ productId: this.productId }, comment)
        if (result.status !== 200) throw new Error(result.data.message)
        this.isLoading = false
        this.$emit('after-comment', result.data.comments)
        this.$swal({
          icon: 'success',
          text: '感謝你的評論'
        })
        this.comment.star = 0
        this.comment.title = ''
        this.comment.message = ''
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
  border: 1px solid #356859;
}

</style>
