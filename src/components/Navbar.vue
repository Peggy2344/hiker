<template>
  <div id="app" class="navbar">
    <v-app-bar fixed :hide-on-scroll="hidebar" :value="!hidebar"  :color="navBackground" flat>
      <router-link to="/">
        <img class="mr-3" :src="logoSrc" height="40"/>
      </router-link>
      <v-spacer></v-spacer>
      <!-- <v-list-item-content
        class="navbar list-item text-center justify-center hidden-md-and-down"
      >
      <router-link class="about" :to="{name: 'Navigation', params: { navigation:'women' } }">
        關於我們
      </router-link>
      </v-list-item-content> -->
      <v-menu
        v-for="item in items"
        :key="item.text"
        bottom
        class="navbar"
        offset-y
        open-on-hover
        transition="slide-y-transition"
        max-width="200"
      >
      <template v-slot:activator="{ attrs, on }">
        <v-list-item-content
          class="list-item text-center justify-center hidden-md-and-down"
          :class="{ list_black: black, list_white: !black }"
          v-bind="attrs"
          v-on="on"
        >
          <a :class="{'about_black': black, 'about_white': !black}" v-if="item.navigationRoute === 'brand'">
              {{ item.text }}
          </a>
          <router-link :class="{'about_black': black, 'about_white': !black}" v-else :to="{ name: 'Navigation', params: { navigation: item.navigationRoute }}">
              {{ item.text }}
          </router-link>
        </v-list-item-content>
      </template>

      <v-list flat depressed text class="pl-5">
        <v-list-item
          class="dropdown_list"
          v-for="(category, index) of item.category"
          :key="category"
          link
          :to="{ name: 'Category', params: { navigation: item.navigationRoute, category: item.categoryRoute[index] }}"
        >
          <v-list-item-title v-text="category"></v-list-item-title>
        </v-list-item>
      </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <!-- login -->
      <v-menu offset-y max-width="100" transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon :color="icon">mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list v-if="isLogin.id.length">
          <v-list-item v-if="role === 'admin'" :to="{name: 'product-management'}">
            <v-list-item-title>後台管理</v-list-item-title>
          </v-list-item>
          <v-list-item v-else :to="{ name: 'Purchase', params: { status: 'process' }}">
            <v-list-item-title>會員資訊</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="logout">
            <v-list-item-title>登出</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item :to="{name: 'Login'}">
            <v-list-item-title>登入</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{name: 'Register'}">
            <v-list-item-title>註冊</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- cart -->
        <v-btn icon :to="{name: 'Cart'}">
          <v-badge
              color="primary"
              right
              overlap
              bordered
              :content="cartList.length ? cartList.length : '0'"
            >
            <v-icon :color="icon">mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      <!-- sidebar -->
      <v-btn
        icon
        class="hidden-lg-and-up"
        color="primary"
        @click="sidebar = !sidebar"
      >
        <v-icon color="primary">mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      class="sidebar mb-16"
      color="sidebar"
      app
      temporary
      width="300"
      v-model="sidebar"
    >
      <div class="mt-5 text-center">
        <router-link to="/">
          <img :src="require('../assets/logo.png')" height="45">
        </router-link>
      </div>
      <v-card
        class="mx-auto"
        width="380"
        flat
        color="transparent"
      >
        <v-list>
          <v-list-group
            v-for="item in items"
            :key="item.text"
            no-action
            sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{item.text}}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(category, index) in item.category"
              :key="category"
              link
              class="nav_link"
              :to="{ name: 'Category', params: { navigation: item.navigationRoute, category: item.categoryRoute[index] }}"
            >
              <v-list-item-title v-text="category"></v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>
<script>
// import { getClassification } from '../apis/product'
import { logout } from '../apis/user'
export default {
  data () {
    return {
      // isLoading: true,
      navBackground: 'transparent',
      hidebar: false,
      items: [
        {
          text: '女款',
          category: [
            '上衣',
            '褲子',
            '鞋子',
            '外套',
            '襪子'],
          navigationRoute: 'women',
          categoryRoute: [
            'shirt',
            'pant',
            'shoes',
            'jacket',
            'socks'
          ]
        },
        {
          text: '男款',
          category: [
            '上衣',
            '褲子',
            '鞋子',
            '外套',
            '襪子'
          ],
          navigationRoute: 'men',
          categoryRoute: [
            'shirt',
            'pant',
            'shoes',
            'jacket',
            'socks'
          ]
        },
        {
          text: '裝備',
          category: [
            '登山杖',
            '登山包',
            '睡袋',
            '鍋具',
            '毛帽',
            '隨行包'
          ],
          navigationRoute: 'equipment',
          categoryRoute: [
            'trekking-poles',
            'backpacks',
            'sleeping-bag',
            'pots',
            'hat',
            'belt-bags'
          ]
        },
        {
          text: '品牌',
          category: [
            'mammut',
            'gregory',
            'MSR',
            'mont-bell',
            "ARC'TERYX",
            'LOWA',
            'Smartwool',
            'Fjallraven'
          ],
          navigationRoute: 'brand',
          categoryRoute: [
            'mammut',
            'gregory',
            'MSR',
            'mont-bell',
            "ARC'TERYX",
            'LOWA',
            'Smartwool',
            'Fjallraven'
          ]
        }
      ],
      showlogin: true,
      sidebar: false,
      logoSrc: require('../assets/logo-white.png'),
      black: false,
      icon: 'white'
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.user
    },
    role () {
      return this.isLogin.role
    },
    cartList () {
      return this.$store.state.cartList
    }
  },
  methods: {
    showHandler () {
      this.showlogin = !this.showlogin
    },
    async logout () {
      try {
        const result = await logout()
        if (result.data.success) {
          this.$swal({
            icon: 'success',
            title: '成功',
            text: '登出成功'
          })
          // 清除 vuex
          this.$store.commit('logout')
          window.localStorage.removeItem('hiker-cart')
          // 導回首頁
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
        } else {
          this.$swal({
            icon: 'error',
            text: result.data.message
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    handleScroll (event) {
      this.navBackground = window.scrollY > 200 ? 'white' : 'transparent'
      // this.logoSrc = window.scrollY < 200 && this.$route.path === '/' ? require('../assets/logo-white.png') : require('../assets/logo.png')
      if (window.scrollY < 200 && (this.$route.path === '/' || this.$route.path === '/navigation/women')) {
        this.logoSrc = require('../assets/logo-white.png')
        this.black = false
        this.icon = 'white'
      } else {
        this.logoSrc = require('../assets/logo.png')
        this.black = true
        this.icon = 'black'
      }
      if (window.scrollY < 200) {
        this.hidebar = false
      } else {
        this.hidebar = true
      }
    }
  },
  watch: {
    '$vuetify.breakpoint.smAndUp' () {
      if (this.$vuetify.breakpoint.smAndUp) {
        this.sidebar = false
      }
    }
  },
  mounted () {
    // this.fetchClassification()
    if (this.$store.state.user.id && this.$store.state.user.role === 'user') {
      this.$store.dispatch('fetchCartList')
    } else {
      this.$store.commit('INIT_CART')
    }
    this.handleScroll()
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
.about_white{
  color: var(--v-white-base);
  text-decoration: none;
}
.about_black{
  color: var(--v-primary-base);
  text-decoration: none;
}
.navbar{
  z-index: 1000;
}
.sidebar {
  z-index: 1000;
}
.sidebar_link{
  display: block;
  height: 100%;
  width: 100%;
}
.link{
  text-decoration: none;
}
.list-item{
  position: relative;
  flex: 0.5 0.5;
}
.list-item:hover::before{
  content: '[';
  position: absolute;
  left: 0;
}
.list-item:hover::after{
  content: ']';
  position: absolute;
  right: 0;
}
.list_white {
  color: var(--v-white-base);
}
.list_white:hover::before{
  color: var(--v-white-base);
}
.list_white:hover::after{
  color: var(--v-white-base);
}
.list_black {
  color: var(--v-primary-base);
}
.list_black:hover::before{
  color: var(--v-primary-base);
}
.list_black:hover::after{
  color: var(--v-primary-base);
}
.v-menu__content{
  box-shadow: none;
  width: 250px;
}
.dropdown_list{
  position: relative;
}
.dropdown_list::after{
  content: '';
  position: absolute;
  left: 0;
  right: 100%;
  bottom: 3px;
  height: 0;
  border-bottom: 3px solid var(--v-brightGreen-base);
  transition: .3s;
}
.dropdown_list:hover::after{
  right: 50%;
  left: 15px;
}
.nav_link.v-list-item--active {
  border-right: 5px solid var(--v-words-base);
  border-bottom: 5px solid var(--v-words-base);
  border-top: 1px solid var(--v-words-base);
  border-left: 1px solid var(--v-words-base);
}
.v-application--is-ltr .v-list-group--no-action.v-list-group--sub-group > .v-list-group__items > .v-list-item{
  padding-left: 120px;
}
</style>
