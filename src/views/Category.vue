<template>
  <v-app app class="home">
    <Navbar />
    <v-row class="ma-5 mt-5 d-flex transformY flex align-center justify-space-between" v-if="!isLoading">
      <v-col cols="8" class="col-lg-4 mr-auto px-0">
        <v-breadcrumbs v-if="products.length" :items="items" large class="breadcrumbs">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col cols="4" class="px-1 col-lg-8 d-flex justify-end relative zindex" v-if="range.length">
        <div class="brightGray--text cursor" @click="filter = !filter">
          篩選
          <v-icon>mdi-chevron-down</v-icon>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="isLoading" class="ma-5 mt-15 d-flex transformY flex mb-auto">
      <v-col cols="6" class="col-lg-3 col-md-4"
        v-for="index in 4"
        :key="index">
        <v-skeleton-loader
          class="mx-auto"
          type="card"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row class="ma-5 mt-5 d-flex transformY flex mb-auto" v-if="!isLoading">
      <template v-if="productsData.length">
        <v-col cols="6" class="col-lg-3 col-md-4 px-1 py-0 mb-10 d-flex justify-center border-bottom height_for_card" v-for="product in products" :key="product._id">
          <ProductCard :product="product" class=" index_above" />
        </v-col>
      </template>
      <template v-else>
        <v-col cols="12 d-flex justify-center">
          <div>
            <p>
              目前沒有商品
            </p>
          </div>
        </v-col>
      </template>
    </v-row>
    <transition name="fadeIn">
      <div v-if="filter" class="col-10 col-lg-6 filter_box d-flex justify-lg-space-around flex-wrap zindex">
        <div class="price col-12 col-lg-4">
          <div class="col-12 pa-0">
            <p>價格</p>
          </div>
          <div class="d-flex pa-0">
            <v-text-field
                class="mt-0 mr-15 mb-5 pa-0 col-2"
                hide-details
                style="width: 60px"
                :value="range[0]"
                @change="$set(range, 0, $event)"
            ></v-text-field>
            <v-text-field
              class="mt-0 ml-15 mb-5 pa-0 col-2"
              hide-details
              style="width: 60px"
              :value="range[1]"
              @change="$set(range, 1, $event)"
            ></v-text-field>
          </div>
          <div class="col-12 pa-0">
            <v-range-slider
              v-model="range"
              :max="max"
              :min="min"
              hide-details
              step="1"
              class="align-center"
            >
            </v-range-slider>
          </div>
          <div class="col-12 pa-0">
            <v-btn class="mt-5" small color="primary" @click="applyPriceRange">
              更新
            </v-btn>
          </div>
        </div>
        <div class="brand col-12 col-lg-4">
          <div class="col-12 pa-0">
            <p>品牌</p>
          </div>
          <div>
            <v-checkbox
            v-for="brand in brands"
            :label="brand.brand + ' (' + brand.count + ')'"
            :key="brand.brand"
            v-model="selectedBrand"
            color="primary"
            :value="brand.brand"
            hide-details
          ></v-checkbox>
          </div>
        </div>
      </div>
    </transition>
    <Footer class="mt-15" v-if="!isLoading" />
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import ProductCard from '@/components/ProductCard.vue'
import { getCategoryProducts, getBrandProducts } from '../apis/product'
export default {
  components: {
    Navbar,
    ProductCard,
    Footer
  },
  data () {
    return {
      isLoading: true,
      products: [],
      productsData: [],
      min: 0,
      max: 100,
      range: [0, 100],
      // brands: [],
      selectedBrand: [],
      items: [
        {
          text: '首頁',
          disabled: false,
          to: '/'
        },
        {
          text: 'navigation',
          disabled: false,
          to: '/:navigation',
          exact: true
        },
        {
          text: 'category',
          disabled: true
        }
      ],
      filter: false
    }
  },
  methods: {
    async fetchData (navigation, category) {
      try {
        let result = ''
        if (navigation === 'brand') {
          result = await getBrandProducts({ brand: category })
        } else {
          result = await getCategoryProducts({ navigation, category })
        }
        if (result.status === 200 && result.data.result.length) {
          this.products = result.data.result
          this.productsData = result.data.result
          this.items[1].text = this.products[0].navigation
          this.items[2].text = this.products[0].category
          this.items[1].to = { name: 'Navigation', params: { navigation } }
          this.setPriceRange()
          this.setBrand()
        } else {
          this.products = []
          this.productsData = []
        }
        setTimeout(() => {
          this.isLoading = false
        }, 3000)
      } catch (error) {
        console.log(error)
      }
    },
    setPriceRange () {
      const priceArray = []
      this.products.map(item => {
        priceArray.push(item.price)
      })
      priceArray.sort(function (a, b) {
        return a - b
      })
      this.min = priceArray[0]
      this.max = priceArray[priceArray.length - 1]
      this.range = [this.min, this.max]
    },
    setBrand () {
      const brandAry = []
      this.products.map(item => {
        const index = brandAry.findIndex(obj => obj.brand === item.brand)
        index === -1 ? brandAry.push({ brand: item.brand, count: 1 }) : brandAry[index].count++
      })
      this.brands = brandAry
    },
    applyPriceRange () {
      this.products = this.productsData.filter(item => {
        return item.price >= this.range[0] && item.price <= this.range[1]
      })
    }
  },
  watch: {
    selectedBrand (newVal) {
      const ary = []
      this.selectedBrand.forEach(brand => {
        this.productsData.forEach(item => {
          if (item.brand === brand) {
            ary.push(item)
          }
        })
      })
      ary.length ? this.products = ary : this.products = this.productsData
    }
  },
  mounted () {
    window.scrollTo(0, 0)
    const { navigation, category } = this.$route.params
    this.fetchData(navigation, category)
  },
  beforeRouteUpdate (to, from, next) {
    const { navigation, category } = to.params
    this.fetchData(navigation, category)
    next()
  }
}
</script>
<style scoped>
.vw-100{
  width: 100vw;
}
.transformY{
  transform: translateY(56px);
}
.flex{
  flex: 0 0 auto;
}
.cursor{
  cursor: pointer;
}
.filter_box{
  top: 145px;
  right: 25px;
  position: absolute;
  height: 25%;
  min-height: 400px;
  background-color: var(--v-sidebar-base);
  transform-origin: top;
}
.zindex {
  z-index: 10;
}
.fadeIn-enter-active {
  animation: fade-in .8s ease-in-out forwards;
}
.fadeIn-leave-to {
  animation: fade-in .8s ease-in-out reverse;
}
.v-application ul.breadcrumbs {
  padding-left: 0px;
}
@keyframes fade-in {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
