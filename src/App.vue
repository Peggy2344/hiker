<template>
  <v-app app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { heartbeat } from './apis/user'
export default {
  name: 'App',
  data () {
    return {
      heartbeatActive: null
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    heartbeats () {
      heartbeat()
        .then(res => {
          if (this.user.id.length > 0) {
            if (!res.data) {
              // this.$swal({
              //   icon: 'error',
              //   title: '錯誤',
              //   text: '登入時效已過'
              // })
              this.$store.commit('logout')

              if (this.$route.path !== '/') {
                this.$router.push('/')
              }
            }
          }
        })
        .catch((error) => {
          console.log(error)
          this.$store.commit('logout')
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
        })
    }
  },
  mounted () {
    this.heartbeats()
    this.heartbeatActive = setInterval(() => {
      this.heartbeats()
    }, 5000)
  },
  beforeDestroy () {
    clearInterval(this.heartbeatActive)
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&display=swap');
body {
  font-family: 'Noto Sans TC', sans-serif;
  overflow-x: hidden;
}
html {
  scroll-behavior: smooth;
}
.progress {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}
</style>
