<template>
<v-app>
  <v-row id="app" class="d-flex mx-5 flex">
    <v-col cols="12">
      <v-row class="pa-0 ma-0 d-flex justify-start align-center">
        <h1 class="mx-4 ma-0 text-lg-h5 text-subtitle-1 words--text  font-weight-bold">評論管理</h1>
        <router-link :to="{ name: 'Reviews', params: { type: 'comment' }}" class="nav_link"><div class="text-lg-subtitle-1 text-subtitle-2 headline pa-3 text-wrap nav">評論</div></router-link>
        <router-link :to="{ name: 'Reviews', params: { type: 'question' }}" class="nav_link"><div class="text-lg-subtitle-1 text-subtitle-2 headline pa-3 text-wrap nav">問題</div></router-link>
      </v-row>
      <hr class="my-0">
    </v-col>
    <v-col cols="12" class="d-flex flex-column justify-start align-start">
      <router-view></router-view>
    </v-col>
  </v-row>
</v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style>
.flex{
  flex: 0 0 auto;
}
.nav {
  cursor: pointer;
  transition: 0.3s ease;
  position: relative;
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
