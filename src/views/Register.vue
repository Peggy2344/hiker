<template>
  <v-app app class="home vh-100">
    <Navbar />
    <v-container class="d-flex justify-center align-center vh-100 flex-column">
      <h3 class="login mb-10">註冊</h3>
      <v-form
        ref="form"
        v-model="valid"
        class="form-width"
        lazy-validation
      >
        <v-text-field
          v-model="username"
          :rules="nameRules"
          label="輸入你的帳號"
          validate-on-blur
          outlined
          clearable
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="輸入你的電子信箱"
          validate-on-blur
          outlined
          clearable
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="請輸入密碼"
          validate-on-blur
          type="password"
          outlined
          clearable
          required
        ></v-text-field>

        <v-text-field
          v-model="passwordCheck"
          @keyup.enter="submitHandler"
          :rules="passwordCheckRules"
          label="請再次確認密碼"
          validate-on-blur
          type="password"
          outlined
          clearable
          required
        ></v-text-field>

        <v-btn
          color="primary"
          class="ma-auto"
          width="100%"
          height="50px"
          @click="submitHandler"
          :disabled="pending"
        >
          {{ pending ? '註冊中' : '送出' }}
        </v-btn>
      </v-form>
    </v-container>
  </v-app>
</template>

<script>
import { register } from '../apis/user'
import Navbar from '../components/Navbar.vue'
export default {
  components: {
    Navbar
  },
  data () {
    return {
      valid: true,
      username: '',
      nameRules: [
        v => !!v || '帳號為必填',
        v => (v && v.length >= 5) || '帳號至少要有5個字',
        v => (v && v.length <= 15) || '帳號不能超過15個字'
      ],
      email: '',
      emailRules: [
        v => !!v || '信箱為必填',
        v => /.+@.+\..+/.test(v) || '信箱格式不正確'
      ],
      password: '',
      passwordRules: [
        v => !!v || '密碼為必填',
        v => (v && v.length >= 8) || '密碼至少要有8個字',
        v => (v && v.length <= 15) || '密碼不可以超過15個字'
      ],
      passwordCheck: '',
      passwordCheckRules: [
        v => !!v || '確認密碼為必填',
        (value) => value === this.password || '密碼不相同'
      ],
      pending: false
    }
  },

  methods: {
    async submitHandler () {
      this.pending = true
      if (!this.$refs.form.validate()) {
        this.pending = false
      } else {
        try {
          const res = await register({
            username: this.username,
            email: this.email,
            password: this.password
          })
          if (res.data.success) {
            this.pending = false
            this.$swal({
              icon: 'success',
              text: '註冊成功'
            }).then(() => {
              this.$router.push({ name: 'Login' })
            })
          } else {
            this.$swal({
              icon: 'error',
              title: res.data.message
            })
          }
        } catch (err) {
          this.$swal({
            icon: 'error',
            title: err.response.data.message
          })
        }
      }
    }
  }
}
</script>

<style>
.vh-100{
  height: 100vh;
}
.login{
  font-size: 2.3rem;
  color: var(--v-primary-base);
}
.form-width{
  width: 300px;
}
@media (min-width: 768px) {
  .form-width{
    width: 380px;
  }
}
</style>
