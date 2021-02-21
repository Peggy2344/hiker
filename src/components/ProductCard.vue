<template>
  <v-card
    class="w-80 justify-space-around d-flex flex-column"
    max-width="374"
    max-height="520"
    height="100%"
    width="100%"
    elevation=0
  >
    <ProductImage class="h-70" v-if="product" :product="product"/>
    <v-card-text class="mt-3 pt-0 h-30 d-flex flex-column justify-center">
      <v-row
        align="center"
        class="mx-0 d-flex flex flex-column pa-0"
      >
      <!-- <v-card-title class="pa-0 font-weight-bold">{{product.brand}}</v-card-title> -->
      <div class="product_line_height mt-1 mt-lg-5 overline mb-1 font-weight-bold">{{product.brand}}</div>
      <template v-if="product.comments">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">
          4.5 (413)
        </div>
      </template>
      <v-card-title class="product_line_height mt-1 mt-lg-5 pa-1 grow font-size">{{product.productName}}</v-card-title>
      <div class="product_line_height mt-1 mt-lg-5 price-color">${{product.price}}</div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import ProductImage from '@/components/ProductImage.vue'
export default {
  components: {
    ProductImage
  },
  props: ['product'],
  data () {
    return {
      index: 0
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
  }
}
</script>

<style>
.pointer{
  cursor: pointer;
}
.border:hover{
  border: 2px solid #BEF264;
}
/* .h-30{
  height: 30%;
} */
.h-70{
  height: 70%;
}
.price-color{
  color: var(--v-primary-base);
}
.img-height{
  height: 90%;
}
.font-size{
  font-size: 0.8rem;
}
.flex{
  flex: 0 0 auto;
}
.product_line_height{
  line-height: 1rem !important;
}
@media (min-width: 768px) {
  .img-height{
    height: 100%;
  }
  .font-size{
    font-size: 1rem;
  }
  .h-30{
    height: 30%;
  }
}
</style>
