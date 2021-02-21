<template>
  <swiper
  class="swiper cursor"
  :options="swiperOptions"
  >
    <template v-if="isLoading">
      <v-col cols="5" class="col-lg-2 col-md-4 px-1 py-0 mx-3 mb-10 d-flex justify-end border-bottom"
          v-for="index in 8"
          :key="index">
        <v-skeleton-loader
          width="100%"
          class="mb-3"
          type="image, article"
        ></v-skeleton-loader>
      </v-col>
    </template>
    <template v-else>
      <swiper-slide v-for="hotsale in hotsales" :key="hotsale._id">
          <v-row>
              <v-col cols="12" class="white-background vh-35 d-flex justify-center align-center pa-0 mr-sm-15 mb-3">
                <v-img :lazy-src="require('../assets/white.jpg')" :src="path + '/products/file/' + hotsale.productImg[0].file" max-height="250px" contain></v-img>
              </v-col>
              <v-col cols="12" class="vh-20 py-5 d-flex justify-center align-center flex-column">
                  <div class="overline mb-1 font-weight-bold">
                    {{hotsale.brand}}
                  </div>
                  <div class="text-subtitle-1 headline mb-4 text-wrap">
                    {{hotsale.productName}}
                  </div>
                  <v-list-item-subtitle class="primary--text">${{hotsale.price}}</v-list-item-subtitle>
                  <div>
                    <router-link class="seemore" :to="{name: 'ProductDetail', params:{productId: hotsale.p_id}}">
                      <span class="overline mb-1 font-weight-bold highlight">
                        see more
                      </span>
                    </router-link>
                  </div>
              </v-col>
          </v-row>
      </swiper-slide>
    </template>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'
export default {
  props: ['hotsales', 'display', 'isLoading'],
  name: 'swiper-example-scrollbar',
  title: 'Scrollbar',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      path: process.env.VUE_APP_API,
      swiperOptions: {
        slidesPerView: 2,
        spaceBetween: 50,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination'
        },
        breakpoints: {
          568: {
            slidesPerView: 2
          },
          768: {
            slidesPerView: 2
          },
          1200: {
            spaceBetween: 50,
            slidesPerView: 6.5
          }
        }
      }
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.cursor{
  cursor: grab;
}
.text-size{
  font-size: 1.2rem;
}
.seemore{
  text-decoration: none;
}
.vh-20 {
  height: 25vh;
}
@media (min-width: 768px) {
  .vh-35{
  height: 35vh;
  }
  .vh-20 {
    height: 15vh;
  }
}
@media (min-width: 992px) {
  .vh-20 {
    height: 20vh;
  }
}
</style>
