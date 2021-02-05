<template>
  <v-app app class="home">
    <Navbar />
    <div class="pa-0 ma-0 vw-100">
      <div class="vw-100 relative">
        <div class="vw-100 relative mb-15 mb-sm-5">
            <img :src="img[index].src || '@/assets/plain.png'" rel="preload" class="vw-100 contain">
            <div class="absolute category text-left">
            <p v-clock class="text-blue font-weight-bold ml-5">{{items[1].text}}</p>
            <div class="box d-flex align-center justify-space-around">
              <router-link :to="{ name: 'Category', params: { category: item.route }}" append class="text+lg-h5 text-size text-orange-link" v-for="item in category" :key="item.name">{{ item.name }}</router-link>
            </div>
            </div>
        </div>
      <v-row class="ma-auto margin-lg pa-sm-10">
        <v-col cols="12">
          <v-breadcrumbs v-if="products.length" :items="items" class="breadcrumbs" large>
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-col>
          <template v-if="isLoading">
            <v-col cols="6" class="col-lg-3 col-md-4 px-1 py-0 mb-10 d-flex justify-center border-bottom"
                v-for="index in 8"
                :key="index">
              <v-skeleton-loader
                width="100%"
                class="mb-3"
                type="card-avatar, article"
              ></v-skeleton-loader>
            </v-col>
          </template>
          <template v-else>
            <v-col cols="6" class="col-lg-3 col-md-4 px-1 py-0 mb-10 d-flex justify-center border-bottom height_for_card" v-for="product in products" :key="product._id">
              <ProductCard :product="product" />
            </v-col>
          </template>
      </v-row>
      </div>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import { getNavigationProducts } from '../apis/product'
import Navbar from '@/components/Navbar.vue'
import ProductCard from '@/components/ProductCard.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Navbar,
    ProductCard,
    Footer
  },
  data () {
    return {
      isLoaded: false,
      isLoading: true,
      products: [],
      items: [
        {
          text: '首頁',
          disabled: false,
          to: '/'
        },
        {
          text: '',
          disabled: false,
          to: '/:navigation',
          exact: true
        }
      ],
      img: [
        {
          src: require('../assets/plain.png')
        },
        {
          src: require('../assets/mammut.jpg')
        },
        {
          src: require('../assets/womenBg.jpg')
        },
        {
          src: require('../assets/equipment.jpg')
        }
      ],
      index: 0
    }
  },
  computed: {
    category () {
      const ary = []
      if (this.products) {
        this.products.map(item => {
          if (!ary.some(exist => exist.name === item.category)) {
            const obj = {}
            obj.name = item.category
            obj.route = item.categoryRoute
            ary.push(obj)
          }
        })
      }
      return ary
    }
  },
  methods: {
    async fetchData (navigation) {
      try {
        const res = await getNavigationProducts({ navigation })
        if (res.status === 200) {
          this.products = res.data.result
          this.items[1].text = this.products[0].navigation
          this.items[1].to = { name: 'Navigation', params: { navigation } }
          console.log(navigation)
          this.index =
          navigation === 'men'
            ? 1 : navigation === 'women'
              ? 2
              : 3
        }
        this.isLoading = false
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.isLoaded = true
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { navigation } = to.params
    this.fetchData(navigation)
    next()
  },
  mounted () {
    const { navigation } = this.$route.params
    this.fetchData(navigation)
  }
}
</script>
<style scoped>
.vw-100{
  width: 100vw;
}
.vh-100{
  width: 100vh;
}
.relative{
  position: relative;
}
.absolute {
  position: absolute;
}
.text-size{
  font-size: 0.8rem;
}
.category{
  width: 70%;
  top: 50%;
  left: 0;
  z-index: 10;
}
.box{
  background: #fff;
  width: 100%;
  height: 50px;
  box-shadow: 5px 5px 0 var(--v-primary-base) ;
}
.text-orange-link{
  text-decoration: none;
  display: block;
  color: var(--v-primary-base);
  height: 100%;
  width: 100%;
  text-align: center;
  line-height: 50px;
}
.text-blue {
  color: var(--v-primary-base);
  letter-spacing: 0.5rem;
  font-size: 1rem;
}
.text-orange-link:hover{
  background: var(--v-sidebar-base);
  color: var(--v-words-base);
}
.v-application .breadcrumbs ul {
  padding-left: 0px;
}
[v-cloak] {
  display: none;
}
@media (min-width: 576px) {
  .category{
    width: 55%;
  }
  .height_for_card{
    height: 500px;
  }
  .box{
    height: 90px;
    box-shadow: 15px 15px 0 var(--v-primary-base) ;
  }
  .text-size{
    font-size: 1rem;
  }
  .text-orange-link{
    line-height: 90px;
  }
  .text-blue {
    letter-spacing: 0.8rem;
    font-size: 1.5rem;
  }
}
@media (min-width: 768px) {
  .category{
    top: 40%;
    width: 45%;
  }
  .text-blue {
    letter-spacing: 0.8rem;
    font-size: 1.5rem;
  }
}
@media (min-width: 1200px) {
  .category{
    top: 45%;
    width: 40%;
  }
  .box{
    background: #fff;
    width: 100%;
    height: 120px;
    max-width: 700px;
    box-shadow: 10px 10px 0 var(--v-primary-base) ;
  }
  .text-blue {
    letter-spacing: 1rem;
    font-size: 2rem;
  }
  .text-size{
    font-size: 1.3rem;
  }
  .margin-lg{
    margin: 0 100px !important;
  }
  .height_for_card{
    height: 550px;
  }
  .text-orange-link{
    height: 100%;
    width: 100%;
    line-height: 120px;
    display: inline-block;
    height: 100%;
    width: 100%;
  }
}
</style>
