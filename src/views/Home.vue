<template>
  <v-app app class="home">
    <Navbar />
    <div class="vh-100 ma-0 pa-0">
      <v-carousel
        height="100%"
        hide-delimiter-background
        :hide-delimiters="!$vuetify.breakpoint.mobile"
        :show-arrows="!$vuetify.breakpoint.mobile"
      >
        <v-carousel-item
          v-for="(picture, i) in pictures"
          :key="i"
          :src="picture.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        >
          <div
            class="white--text absolute slogan col-3 col-lg-1 d-flex justify-center align-center"
          >
            <h1 class="text-h5 text-sm-h3 font-weight-bold slogan_line_height">
              YOUR NEXT HIKING OUTFIT
            </h1>
          </div>
        </v-carousel-item>
      </v-carousel>
    </div>
    <!-- <v-container class="mt-lg-10 vh-100 mb-5 mb-sm-10">
      <v-row class="fill-height mt-15 mt-lg-3">
        <v-col cols="6" class="d-flex justify-center align-center relative pa-2">
          <div class="blue-square">
            <div class="slogan absolute">
              <p class="orange_text line-height text-lg-h2 text-sm-h3 text-h5 font-weight-medium letter-spacing">YOUR<br>NEXT<br>HIKING<br>OUTFIT</p>
            </div>
            <div class="viewmore">
              <p class="orange_text mb-3 text-small">觀看我們的商品</p>
              <div class="blue_line"></div>
              <div class="routes mt-3 text-small">
                <router-link to="/" class="orange_text link">女性</router-link> /
                <router-link to="/" class="orange_text link">男性</router-link> /
                <router-link to="/" class="orange_text link">裝備</router-link> /
                <router-link to="/" class="orange_text link">品牌</router-link>
              </div>
            </div>
          </div> -->
    <!-- <v-img :src="require('../assets/hike.jpeg')" contain absolute max-width="450" max-height="550" width="80%"></v-img> -->
    <!-- </v-col>
      </v-row> -->
    <!-- </v-container> -->
    <!-- <div class="vh-100 ma-0 pa-0"> -->
    <!-- <HotSale /> -->
    <!-- </div> -->
    <div class="my-15 mx-auto">
      <div class="d-flex justify-center">
        <h3 class="ma-lg-5 mb-lg-15 mb-15 mx-5 px-5">
          <span class="new-title text-h4 text-lg-h3 font-weight-bold highlight"
            >新品上市</span
          >
        </h3>
      </div>
      <NewItem />
    </div>
    <v-container class="d-flex flex-wrap justify-center homePage">
      <v-row id="row1" class="col-12 col-lg-6 d-flex flex-wrap justify-center">
        <v-col cols="12" class="d-flex justify-center" data-aos="fade-up" data-aos-once="true" data-aos-duration="700" data-aos-offset="400">
          <div
            class="col-12 d-flex flex-column flex-sm-row align-center justify-space-around bg-1 pa-10"
          >
            <div class="mb-10">
              <p class="mb-1 text-h5">上衣</p>
              <router-link
                :to="{
                  name: 'Category',
                  params: { navigation: 'women', category: 'shirt' },
                }"
                class="link"
                ><span class="highlight overline">SHOP NOW→</span></router-link
              >
            </div>
            <router-link
            :to="{
              name: 'Category',
              params: { navigation: 'women', category: 'shirt' },
            }"
            class="link"
            >
              <v-img
                max-width="300px"
                :src="require('../assets/mainpage1.png')"
              ></v-img>
            </router-link>
          </div>
        </v-col>
        <v-col cols="12" class="d-flex justify-center" data-aos="fade-up" data-aos-once="true" data-aos-duration="700" data-aos-offset="400">
          <div
            class="col-12 d-flex flex-column flex-sm-row align-center justify-space-around bg-1 pa-10"
          >
            <div class="mb-10">
              <p class="mb-1 text-h5">登山鞋</p>
              <router-link
                :to="{
                  name: 'Category',
                  params: { navigation: 'men', category: 'shoes' },
                }"
                class="link"
                ><span class="highlight overline">SHOP NOW→</span></router-link
              >
            </div>
            <router-link
            :to="{
              name: 'Category',
              params: { navigation: 'men', category: 'shoes' },
            }"
            class="link"
            >
              <v-img
                max-width="300px"
                :src="require('../assets/mainpage2.png')"
              ></v-img>
            </router-link>
          </div>
        </v-col>
      </v-row>
      <v-row id="row2" class="col-12 col-lg-6 d-flex flex-wrap justify-center">
        <v-col cols="12" class="d-flex justify-center" data-aos="fade-left" data-aos-once="true" data-aos-duration="700" data-aos-offset="400">
          <div
            class="col-12 d-flex flex-column flex-sm-row align-center justify-space-around bg-2 pa-10 pr-5"
          >
            <div class="mb-10">
              <p class="mb-1 text-h5">登山包</p>
              <router-link
                :to="{
                  name: 'Category',
                  params: { navigation: 'equipment', category: 'backpacks' },
                }"
                class="link"
                ><span class="highlight overline">SHOP NOW→</span></router-link
              >
            </div>
            <router-link
              :to="{
                name: 'Category',
                params: { navigation: 'equipment', category: 'backpacks' },
              }"
              class="link"
              >
              <v-img
                max-width="400px"
                :src="require('../assets/mainpage3.png')"
              ></v-img>
            </router-link>
          </div>
        </v-col>
        <v-col cols="12" data-aos="fade-left" data-aos-duration="700" data-aos-once="true" data-aos-offset="400">
          <div
            class="col-12 d-flex flex-column flex-sm-row align-center justify-sm-space-around bg-2 pa-10"
          >
            <div class="mb-10">
              <p class="mb-1 text-h5">毛帽</p>
              <router-link
                :to="{
                  name: 'Category',
                  params: { navigation: 'equipment', category: 'hat' },
                }"
                class="link"
                ><span class="highlight overline">SHOP NOW→</span></router-link
              >
            </div>
            <router-link
            :to="{
              name: 'Category',
              params: { navigation: 'equipment', category: 'hat' },
            }"
            class="link"
            >
              <v-img
                max-width="200px"
                :src="require('../assets/mainpage4.png')"
              ></v-img>
            </router-link>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="my-15 mx-auto">
      <div class="d-flex justify-center">
        <h3 class="ma-lg-5 mb-lg-15 mb-15 mx-5 px-5">
          <span class="new-title text-h4 text-lg-h3 font-weight-bold highlight"
            >品牌推薦</span
          >
        </h3>
      </div>
      <div class="d-flex justify-space-around flex-wrap" data-aos="fade-up" data-aos-once="true" data-aos-duration="700" data-aos-offset="300">
        <div class="col-4 col-sm-2 d-flex justify-center">
          <router-link
            :to="{
              name: 'Category',
              params: { navigation: 'brand', category: 'mammut' },
            }"
          >
            <img width="80%" :src="require('../assets/mammut.png')" />
          </router-link>
        </div>
        <div class="col-4 col-sm-2 d-flex justify-center">
          <router-link
            :to="{
              name: 'Category',
              params: { navigation: 'brand', category: `ARC'TERYX` },
            }"
          >
            <img width="80%" :src="require('../assets/arcteryx.png')" />
          </router-link>
        </div>
        <div class="col-4 col-sm-2 d-flex justify-center">
          <router-link
            :to="{
              name: 'Category',
              params: { navigation: 'brand', category: 'Fjallraven' },
            }"
          >
            <img width="80%" :src="require('../assets/fjallraven.png')" />
          </router-link>
        </div>
        <div class="col-4 col-sm-2 d-flex justify-center">
          <router-link
            :to="{
              name: 'Category',
              params: { navigation: 'brand', category: 'LOWA' },
            }"
          >
            <img width="80%" :src="require('../assets/lowa.png')" />
          </router-link>
        </div>
        <div class="col-4 col-sm-2 d-flex justify-center">
          <router-link
            :to="{
              name: 'Category',
              params: { navigation: 'brand', category: 'gregory' },
            }"
          >
            <img width="80%" :src="require('../assets/gregory.png')" />
          </router-link>
        </div>
      </div>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
// import HotSale from '@/components/HotSale.vue'
import NewItem from '@/components/NewItem.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    // HotSale,
    NewItem,
    Footer
  },
  data () {
    return {
      slogan: [
        'YOUR NEXT HIKING OUTFIT',
        'YOUR NEXT HIKING OUTFIT',
        'YOUR NEXT HIKING OUTFIT',
        'YOUR NEXT HIKING OUTFIT',
        'YOUR NEXT HIKING OUTFIT'
      ],
      pictures: [
        {
          src: require('../assets/1.jpeg')
        },
        {
          src: require('../assets/2.jpeg')
        },
        {
          src: require('../assets/3.jpeg')
        },
        {
          src: require('../assets/4.jpeg')
        },
        {
          src: require('../assets/5.jpeg')
        }
      ],
      slides: ['YOUR NEXT HIKING OUTFIT', 'Second', 'Third', 'Fourth', 'Fifth']
    }
  }
}
</script>
<style scoped>
.home {
  background: #fff;
}
.vh-100 {
  height: 70vh;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.line-height {
  line-height: 200%;
}
.link {
  text-decoration: none;
}
.slogan {
  top: 30%;
  right: 20%;
}
.slogan_line_height {
  line-height: 2.5rem;
  letter-spacing: 0.8rem !important;
}
.bg-1 {
  background: var(--v-gray-base);
}
.bg-2 {
  background: var(--v-sidebar-base);
}
.homePage .overline {
  font-size: 1rem !important;
}
.more_btn {
  background: var(--v-sidebar-base);
  height: 100px;
}
@media (min-width: 576px) {
  .slogan_line_height {
    line-height: 4rem;
  }
  .vh-100 {
    height: 80vh;
  }
}
@media (min-width: 768px) {
}
@media (min-width: 992px) {
  .text-small {
    font-size: 1rem;
  }
}
@media (min-width: 1200px) {
  .vh-100 {
    height: 100vh;
  }
  .slogan_line_height {
    line-height: 5rem;
    letter-spacing: 1rem !important;
  }
}
</style>
