<template>
  <v-row id="app" class="d-flex mx-5 flex">
    <v-col cols="12">
      <v-row class="mx-4 my-3 pa-0 d-flex justify-start align-center">
        <h1 class="ma-0 text-lg-h5 text-subtitle-1 words--text  font-weight-bold">首頁管理</h1>
      </v-row>
      <hr class="my-0">
    </v-col>
    <v-col cols="12" class="d-flex flex-column justify-start align-start">
      <v-row class="mx-4 my-3 pa-0 d-flex justify-start align-center">
        <h1 class="ma-0 text-lg-h5 text-subtitle-1 words--text  font-weight-bold">新品上市</h1>
        <v-btn small color="words" class="mx-15" @click="hotsaleForm = true">
          + 新增
        </v-btn>
      </v-row>
      <v-container v-if="isLoading" class="progress">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-container>
      <v-row v-else>
        <v-col v-for="hotsale in hotsales" :key="hotsale._id" cols="6" class="d-flex flex-column align-center col-lg-3">
          <ProductCard :product="hotsale" />
          <v-btn small color="converse" @click="removeHandler(hotsale)">
            移除
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <transition name="fade">
      <v-dialog v-model="hotsaleForm" width="600" class="relative">
        <!-- <div class="d-flex close"> -->
          <v-btn icon fab @click.stop="hotsaleForm = false" class="absolute_btn">
            <v-icon color="words">mdi-close</v-icon>
          </v-btn>
        <!-- </div> -->
        <hotsaleForm @update="afterSumbitHandler" :hotsales="hotsales" />
      </v-dialog>
    </transition>
  </v-row>
</template>

<script>
import { getHotsale } from '../apis/product'
import { removeHotSale } from '../apis/admin'
import ProductCard from './ProductCard'
import hotsaleForm from './hotsaleForm'
export default {
  components: {
    ProductCard,
    hotsaleForm
  },
  data () {
    return {
      isLoading: true,
      hotsales: [],
      hotsaleForm: false
    }
  },
  methods: {
    async fetchData () {
      const result = await getHotsale()
      this.hotsales = result.data.result
      this.isLoading = false
    },
    afterSumbitHandler (data) {
      this.hotsales.push(data)
      this.hotsaleForm = false
    },
    removeHandler (hotsale) {
      this.$swal.fire({
        title: '確定要將此產品從新品中移除?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#8388a4',
        confirmButtonColor: '#ed5e68',
        cancelButtonText: '取消',
        confirmButtonText: '確定'
      }).then(async () => {
        const index = this.hotsales.findIndex(item => item._id === hotsale._id)
        console.log(index)
        await removeHotSale({ id: hotsale._id })
        this.hotsales.splice(index, 1)
      })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style>

</style>
