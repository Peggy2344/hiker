<template>
  <v-card
      class="mx-auto d-flex align-center pa-0"
      max-width="600"
      width="100%"
      v-if="product.productImg"
      >
        <v-col cols="4" class="col-lg-3">
        <v-img :src="env + '/products/file/' + product.productImg[0].file" >
        </v-img>
        </v-col>
        <v-list-item three-line class="col-5">
          <v-list-item-content>
            <div class="overline mb-1">
            {{product.brand}}
            </div>
            <div class="text-lg-subtitle-1 text-subtitle-2 headline mb-4 text-wrap">
            {{product.productName}}
              <div v-if="product.detail">
                <span class="overline mr-3" v-if="product.detail.color">{{ product.detail.color }}</span>
                <span class="overline" v-if="product.detail.size">{{ product.detail.size }}</span>
              </div>
            </div>
            <v-list-item-subtitle class="primary--text">${{product.price}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="d-flex align-center justify-center justify-lg-center col-3 col-lg-4">
        <!-- <v-row class="d-flex align-center justify-center justify-lg-center col-4"> -->
        <div class="d-flex align-center justify-center flex-column" v-if="product.quantity">
          <v-list-item-subtitle class="text-lg-subtitle-1 text-subtitle-2 headline mb-4 text-wrap">數量</v-list-item-subtitle>
          <v-list-item-subtitle class="primary--text">{{product.quantity}}</v-list-item-subtitle>
        </div>
        <!-- </v-row> -->
      </v-list-item>
    </v-card>
</template>

<script>
export default {
  props: ['product'],
  data () {
    return {
      env: process.env.VUE_APP_API
    }
  }
}
</script>

<style>

</style>
