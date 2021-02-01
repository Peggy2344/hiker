<template>
  <v-app>
    <Navbar />
      <v-container v-if="!isLoading" class="d-flex flex-wrap justify-center align-start my-lg-10 mb-15">
        <v-row class="d-flex flex-wrap align-center justify-center col-lg-10 col-12 mt-15 flex-column">
          <v-col cols="12" class="col-lg-10 col-xl-8 d-flex justify-center pa-0">
            <!-- <v-btn v-if="$vuetify.breakpoint.mobile" icon v-bind="attrs" v-on="on"> -->
              <v-icon v-if="$vuetify.breakpoint.mobile" color="words" class="mx-1">mdi-account-outline</v-icon>
            <!-- </v-btn> -->
            <h1 v-else class="ma-0 text-lg-h5 text-subtitle-1 words--text mr-auto font-weight-bold">會員中心</h1>
            <router-link :to="{ name: 'Purchase', params: { status: 'process' }}" class="nav_link"><div class="text-lg-subtitle-1 text-subtitle-2 headline pa-3 text-wrap nav">處理中訂單</div></router-link>
            <router-link :to="{ name: 'Purchase', params: { status: 'finish' }}" class="nav_link"><div class="text-lg-subtitle-1 text-subtitle-2 headline pa-3 text-wrap nav">歷史訂單</div></router-link>
            <router-link  :to="{ name: 'Profile'}" class="nav_link">
              <div class="text-lg-subtitle-1 text-subtitle-2 headline pa-3 text-wrap nav">個人資料</div>
            </router-link>
          </v-col>
          <v-col cols="12" class="col-lg-10 col-xl-8 pa-0">
            <hr class="hr">
          </v-col>
        </v-row>
        <v-row class="d-flex flex-wrap justify-center col-lg-10 col-12 pa-0">
          <v-col cols="12" class="col-lg-10 col-xl-8">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    <Footer class="mt-15" />
  </v-app>
</template>

<script>
import { getUser } from '../apis/user'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
      isLoading: true,
      pendingOrder: [],
      finishOrder: [],
      userInfo: {},
      orderId: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    async fetchData () {
      const data = await getUser({ userId: this.user.id })
      const uInfo = data.data.result
      this.userInfo = { username: uInfo.username, email: uInfo.email, joinDate: uInfo.joinDate }
      this.isLoading = false
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style>
.vh-100 {
  height: 100vh;
}
.transformY{
  transform: translateY(60px);
}
.nav {
  cursor: pointer;
  transition: 0.3s ease;
}
.nav:hover,
.router-link-exact-active .nav
{
  background: rgba(0,0,0,0.1);
}
a {
  display: block;
}
.nav_link{
  text-decoration: none;
}
</style>
