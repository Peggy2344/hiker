<template>
  <swiper
  class="swiper cursor"
  :options="swiperOptions"
  >
    <swiper-slide v-for="hotsale in hotsales" :key="hotsale._id">
        <v-row>
            <v-col cols="12" class="white-background vh-35 d-flex justify-center align-center pa-0 mr-sm-15 mb-3">
              <v-img :lazy-src="require('../assets/white.jpg')" :src="path + '/products/file/' + hotsale.productImg[0].file" max-height="250px" contain></v-img>
            </v-col>
            <v-col cols="12" class="vh-20 py-5 d-flex justify-center align-center flex-column">
              <!-- <v-list-item-content> -->
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
              <!-- </v-list-item-content> -->
              <!-- <p v-if="hotsale" class="text--primary text-size font-weight-bold">{{ hotsale.brand }}
              <div class="px-13 px-sm-0">
                <p v-if="hotsale" class="text--primary text-size">{{ hotsale.productName }}</p>
              </div>
              <p v-if="hotsale" class="text--primary text-size">${{ hotsale.price }}</p> -->
            </v-col>
        </v-row>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'
export default {
  props: ['hotsales', 'display'],
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
        spaceBetween: 30,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination'
        },
        breakpoints: {
          // when window width is >= 320px
          568: {
            slidesPerView: 2
          },
          // when window width is >= 480px
          768: {
            slidesPerView: 2
          },
          1200: {
            spaceBetween: 50,
            slidesPerView: 6.5
          }
        }
      }
      // background: ''
    }
  },
  mounted () {
    // if (this.display === 'hotsale') {
    //   this.background = '#333'
    // } else {
    //   this.background = '#333'
    // }
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
