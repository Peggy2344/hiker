<template>
  <v-container v-if="!isLoading">
    <v-card
      class="mx-auto d-flex justify-center align-center"
      outlined
      width="80%"
    >
      <v-row class="col-12 col-lg-6">
        <v-col cols="12" class="d-flex justify-center mb-10">
          <div>
            <v-icon size="80">
              mdi-account-circle-outline
            </v-icon>
          </div>
        </v-col>
        <v-col
          cols="12"
          class="d-flex flex-wrap justify-center pa-0"
        >
        <div class="overline font-weight-bold col-10"> <span class="highlight">帳號</span></div>
        <div class="overline col-8"> {{userinfo.username}}</div>
          <!-- <v-text-field
            v-model="userinfo.username"
            :rules="nameRules"
            label="使用者名稱"
            required
          ></v-text-field> -->
        </v-col>

        <v-col
          cols="12"
          class="d-flex flex-wrap justify-center pa-0"
        >
        <div class="overline font-weight-bold col-10"> <span class="highlight">電子信箱</span></div>
        <div class="overline col-8"> {{userinfo.email}}</div>
          <!-- <v-text-field
            v-model="userinfo.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field> -->
        </v-col>
        <v-col
          cols="12"
          class="d-flex flex-wrap justify-center pa-0"
        >
          <div class="overline font-weight-bold col-10"> <span class="highlight">加入日期</span></div>
          <div class="overline col-8"> {{getTime(userinfo.joinDate)}}</div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { getUser } from '../apis/user'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      isLoading: false,
      userName: '',
      email: '',
      nameRules: [
        v => !!v || '',
        v => v.length <= 10 || '使用者名稱不得超過10個字'
      ],
      emailRules: [
        v => !!v || '',
        v => /.+@.+/.test(v) || '請輸入正確的E-mail格式'
      ],
      userinfo: {
        username: '',
        email: '',
        joinDate: ''
      },
      edit: false
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
      this.userinfo = { username: uInfo.username, email: uInfo.email, joinDate: uInfo.joinDate }
      this.isLoading = false
    },
    getTime (time) {
      return dayjs(time).format('YYYY/MM/DD')
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style>
@media (min-width: 992px) {
  .v-application .overline {
  font-size: 0.9rem !important;
}
}

</style>
