<template>
<v-container class="pa-0 ma-auto vw-100">
    <h3 class="new-title text-h4 text-lg-h3 my-10 font-weight-bold ma-5">熱銷款式</h3>
    <v-row class="justify-center">
      <v-col class="col-lg-10 col-sm-12">
        <swiper
          class="swiper px-8"
          :options="swiperOptions"
          >
            <swiper-slide v-for="hotsale in hotsales" :key="hotsale._id">
                <v-row>
                    <v-col cols="12" class="white-background vh-35 d-flex justify-center align-center pa-0 mr-sm-15">
                          <v-img :src="path + '/products/file/' + hotsale.productImg[0].file" max-height="180px" contain></v-img>
                    </v-col>
                    <v-col cols="12" class="vh-35 pa-0 d-flex justify-center align-center flex-column" style="{background: 'black'}">
                      <p v-if="hotsale" class="text--white text-size font-weight-bold">{{ hotsale.brand }}
                      <div class="px-13 px-sm-0">
                        <p v-if="hotsale" class="text--white text-size">{{ hotsale.productName }}</p>
                      </div>
                      <p v-if="hotsale" class="text--white text-size">${{ hotsale.price }}</p>
                    </v-col>
                </v-row>
            </swiper-slide>
            <div class="swiper-scrollbar" slot="scrollbar"></div>
          </swiper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import ScrollItem from './ScrollItem.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      hotsales: [],
      index: 0,
      path: process.env.VUE_APP_API,
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 50,
        pagination: {
          el: '.swiper-pagination'
        },
        breakpoints: {
          // when window width is >= 320px
          568: {
            slidesPerView: 1.5
          },
          // when window width is >= 480px
          768: {
            slidesPerView: 2
          },
          1200: {
            spaceBetween: 50,
            slidesPerView: 3
          }
        }
      }
    }
  },
  computed: {
    productImg () {
      if (!this.hotsales[this.index]) return
      const filename = this.hotsales[this.index].productImg[0].file
      const path = process.env.VUE_APP_API + '/products/file/' + filename
      return path
    },
    product () {
      if (!this.hotsales[this.index]) return
      return this.hotsales[this.index]
    },
    mobile () {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  methods: {
    left () {
      if (this.index <= 0) return
      this.index--
    },
    right () {
      if (this.index >= this.hotsales.length - 1) return
      this.index++
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/products/mainpage/hotsale')
      .then(res => {
        this.hotsales = res.data.result
      })
  }
}
</script>

<style>
.relative{
  position: relative;
}
.vh-100{
  height: 100vh;
}
.vh-80{
  height: 75vh;
}
.vh-50{
  height: 50vh;
}
.vw-100{
  width: 100vw;
}
.white-background{
  background: #fff;
}
.orange-background{
  background: var(--v-sidebar-base);
}
.text--white{
  color: #FFF;
}
.img-width{
  width: 80%;
}
.scroll-title{
  position: absolute;
  top: -8%;
  left: 4%;
  color: var(--v-primary-base);
}
.hotsale-title{
  position: absolute;
  top: 5%;
  left: 8%;
  color: var(--v-primary-base);
}
.arrow-left {
  position: absolute;
  top: 50%;
  left: 30px;
  border-radius: 50%;
  border: 1px solid var(--v-primary-base);
}
.arrow-right {
  position: absolute;
  top: 50%;
  right: 30px;
  border-radius: 50%;
  border: 1px solid #FFF;
}
.fade-in-enter-active {
  transition: all 0.1s ease;
}

.fade-in-leave-active {
  transition: all 0.1s ease;
}

.fade-in-enter, .fade-in-leave-to {
  opacity: 0;
}
@media (min-width: 769px) {
  .vh-50{
    height: 100vh;
  }
}
@media (min-width: 1200px) {
  .img-width{
    width: 350px;
  }
}
</style>
