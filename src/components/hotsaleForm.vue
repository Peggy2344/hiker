<template>
<v-container class="formContainer rounded-b-lg pa-15">
  <v-select
  :items="brands"
  v-model="selectedBrand"
  label="依品牌搜尋"
  >
  </v-select>
  <v-row v-for="product in products" :key="product._id" class="align-center justify-end justify-lg-start">
    <v-col cols="12" class="col-lg-10">
      <PopUpCard :product="product" />
    </v-col>
    <v-col cols="4" class="col-lg-2">
      <v-btn small :disabled="product.inList" color="converse" @click="addHandler(product)">
        加入
      </v-btn>
    </v-col>
  </v-row>

</v-container>
</template>

<script>
import { getClassification, getProducts } from '../apis/product'
import { postHotsale } from '../apis/admin'
import PopUpCard from './PopUpCard'
export default {
  props: ['hotsales'],
  components: {
    PopUpCard
  },
  data () {
    return {
      isLoading: true,
      brands: [],
      selectedBrand: '',
      productData: []
    }
  },
  computed: {
    products () {
      // return this.productData.filter(item => item.brand === this.selectedBrand)
      return this.productData.filter(item => item.brand === this.selectedBrand)
    }
  },
  methods: {
    async setBrand () {
      const result = await getClassification()
      this.brands = result.data.result.filter(item => {
        return item.navigation === '品牌'
      })[0].category
    },
    async setProduct () {
      const result = await getProducts()
      this.productData = result.data.result
      this.hotsales.forEach(hotsale => {
        const hotsaleProduct = this.productData.find(item => item._id === hotsale.p_id)
        hotsaleProduct.inList = true
      })
    },
    fetchData () {
      this.setBrand()
      this.setProduct()
      this.isLoading = false
    },
    async addHandler (product) {
      const result = await postHotsale({ _id: product._id })
      if (result.data.success) {
        this.$emit('update', result.data.result)
      }
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style>

</style>
