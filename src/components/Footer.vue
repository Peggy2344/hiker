<template>
  <v-footer
    padless
    color="primary lighten-1"
  >
    <v-card
      flat
      tile
      width="100%"
      class="gray primary--text text-center"
    >
      <v-col cols="12" class="d-flex flex-wrap justify-center">
        <v-card-text class="col-lg-12 col-6 primary--text pt-0 my-10 d-flex justify-center align-center">
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-1 mx-lg-4 primary--text"
            icon
          >
            <v-icon color="primary" size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text class="col-lg-4 col-6 primary--text pt-0">
          <div class="headline text-subtitle-1 font-weight-bold mb-4">
            裝備指南
          </div>
          <div class="text-subtitle-1 headline mb-4 text-wrap">
            裝備操作
          </div>
          <div class="text-subtitle-1 headline mb-4 text-wrap">
            保養維修
          </div>
          <div class="text-subtitle-1 headline mb-4 text-wrap">
            選購建議
          </div>
        </v-card-text>
        <v-card-text class="col-lg-4 col-6 primary--text pt-0">
          <div class="headline text-subtitle-1 font-weight-bold mb-4">
            關於我們
          </div>
          <div class="text-subtitle-1 headline mb-4 text-wrap">
            門市資訊
          </div>
          <div class="text-subtitle-1 headline mb-4 text-wrap">
            隱私權宣告
          </div>
          <div class="text-subtitle-1 headline mb-4 text-wrap">
            服務條款
          </div>
        </v-card-text>
        <v-card-text class="col-lg-4 col-6 primary--text pt-0">
          <div class="headline text-subtitle-1 font-weight-bold mb-4">
            購物須知
          </div>
          <div class="text-subtitle-1 headline mb-4 text-wrap">
            購物流程
          </div>
          <div class="text-subtitle-1 headline mb-4 text-wrap">
            退/換貨
          </div>
          <div class="text-subtitle-1 headline mb-4 text-wrap">
            商品保固
          </div>
        </v-card-text>
      </v-col>

      <v-divider></v-divider>

      <v-card-text class="primary--text">
        {{ new Date().getFullYear() }} — <strong>商品及內容僅作為學習使用</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data () {
    return {
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram'
      ]
    }
  }
}
</script>

<style>

</style>
