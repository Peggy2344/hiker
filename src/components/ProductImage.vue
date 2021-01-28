<template>
  <div class="d-flex flex-column justify-space-around" v-if="!isLoading">
    <router-link :to="{name: 'ProductDetail', params: {productId: productId} }" class="h-65 d-flex justify-center align-center mt-lg-5 mb-5 pt-5">
      <v-img
        contain
        class="img-height"
        :src="showImg"
      ></v-img>
    </router-link>
    <v-row class="align-center justify-center d-flex flex h-35 ma-0">
      <v-col cols="3" v-for="(img, index) in productImg" :key="img" class="col-sm-2 pa-1 ma-0 h-50">
        <v-img
          contain
          max-height="80px"
          class="pointer border h-100 w-80 ma-auto"
          :src="img"
          @click="changePicHandler(index)"
        ></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ['product'],
  data () {
    return {
      index: 0,
      productId: '',
      isLoading: true
    }
  },
  computed: {
    productImg () {
      const urls = []
      this.product.productImg.forEach(img => {
        urls.push(process.env.VUE_APP_API + '/products/file/' + img.file)
      })
      return urls
    },
    showImg () {
      return this.productImg[this.index]
    }
  },
  methods: {
    changePicHandler (index) {
      this.index = index
    }
  },
  mounted () {
    if (this.product.p_id) {
      this.productId = this.product.p_id
    } else {
      this.productId = this.product._id
    }
    this.isLoading = false
  }
}
</script>

<style>
.flex {
  flex: 0 0 auto;
}
.pointer{
  cursor: pointer;
}
.border:hover{
  border: 2px solid #BEF264;
}
.w-80{
  width: 80%;
}
.h-100{
  height: 100%;
}
.h-65{
  height: 65%;
}
.h-35{
  height: 35%;
}
.img-height{
  height: 100%;
}
@media (min-width: 992px) {
  .h-35{
    height: 30%;
  }
  .h-50 {
    height: 50%;
  }
  .h-65{
    height: 70%;
  }
}
</style>
