<template>
  <div id="app" class="100-vw">
    <v-app>
        <v-btn
          icon
          class="hidden-lg-and-up hamburger-btn ml-auto mr-5 mt-5"
          color="words"
        >
          <v-icon @click="drawer = !drawer" color="words">mdi-menu</v-icon>
        </v-btn>
      <v-navigation-drawer
          color="gray"
          width="300"
          app
          v-model="drawer"
        >
          <div class="mt-5 text-center">
            <router-link to="/">
              <img :src="require('../assets/logo.png')" height="45">
            </router-link>
          </div>
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            class="text-center font-weight-bold ma-5"
          >
            <!-- <v-list-item-content class="h-100 text-center pa-0"> -->
              <template v-if="item.type">
                <router-link class="adminSidebar_link d-flex align-center" :to="{name: item.category, params: {type: item.type}}">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </router-link>
              </template>
              <template v-else>
                <router-link class="adminSidebar_link d-flex align-center" :to="{name: item.category}">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </router-link>
              </template>
            <!-- </v-list-item-content> -->
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-2 mb-10">
            <v-btn block color="words">
              登出
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-main class="mx-5">
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'AdminMainPage',
  data () {
    return {
      drawer: true,
      items: [
        { title: '商品管理', category: 'product-management' },
        { title: '訂單管理', category: 'order-management' },
        { title: '評論管理', category: 'Reviews', type: 'comment' },
        { title: '問答管理', category: 'Reviews', type: 'question' },
        { title: '首頁管理', category: 'mainpage-management' }
      ]
    }
  }
}
</script>

<style scoped>
html {
  overflow-y: auto !important;
}
html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.h-100{
  height: 100%;
}
.v-application .adminSidebar_link {
  color: var(--v-words-base);
  text-decoration: none;
  display: block;
  width: 100%;
  height: 48px;
}
.v-list {
  transform: translateY(100px);
}
.adminSidebar_link:hover,
.router-link-exact-active
{
  border-right: 5px solid var(--v-words-base);
  border-bottom: 5px solid var(--v-words-base);
  border-top: 1px solid var(--v-words-base);
  border-left: 1px solid var(--v-words-base);
}
.z-index-100 {
  z-index: 100;
}
.hamburger-btn {
  border: 3px solid var(--v-words-base);
}
.w100 {
  width: 100%;
}
</style>
