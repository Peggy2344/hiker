<template>
<v-container>
  <v-container v-if="isLoading" class="progress">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </v-container>
  <template v-else>
    <v-card
    v-for="product in products"
    :key="product._id"
    class="d-flex align-center flex-wrap"
    width="100%"
    outlined
    >
      <v-col cols="12" class="col-md-2 d-flex flex-column align-center justify-center flex-wrap">
        <v-col cols="8" class="col-lg-10">
          <v-img :src="env + '/products/file/' + product.productImg[0].file"></v-img>
        </v-col>
        <div class="overline">{{product.brand}}</div>
        <div class="overline text-center">{{product.productName}}</div>
      </v-col>
      <v-col cols="12" class="col-md-10">
        <ReviewManageCard v-for="comment in product.comments" :comment="comment" :key="comment._id"/>
        <QuestionManageCard v-for="question in product.questions" :question="question" :productId="product._id" :key="question._id"/>
      </v-col>
    </v-card>
  </template>
</v-container>
</template>

<script>
import { getComments, getQuestions } from '../apis/admin'
import ReviewManageCard from './ReviewManageCard'
import QuestionManageCard from './QuestionManageCard'
export default {
  components: {
    ReviewManageCard,
    QuestionManageCard
  },
  data () {
    return {
      isLoading: true,
      products: [],
      env: process.env.VUE_APP_API
    }
  },
  methods: {
    async fetchData (type) {
      let productData = []
      if (type === 'comment' || '') {
        productData = await getComments()
        this.products = productData.data.comments
      } else {
        productData = await getQuestions()
        this.products = productData.data.questions
      }
      this.isLoading = false
    }
  },
  mounted () {
    const { type } = this.$route.params
    this.fetchData(type)
  },
  beforeRouteUpdate (to, from, next) {
    const { type } = to.params
    this.fetchData(type)
    next()
  }
}
</script>
