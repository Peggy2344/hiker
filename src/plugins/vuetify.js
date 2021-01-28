import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: '#333',
        secondary: '#fff',
        gray: '#f3f3f3',
        brightGray: '#4a4a4a',
        darkGray: '#cfdbd5',
        converse: '#9eb091',
        words: '#656565',
        sidebar: '#EFECE8',
        bright: '#FF5A17',
        brightYellow: '#f7f056',
        brightRed: '#e76f51',
        brightBlue: '#457b9d',
        brightGreen: '#bef264',
        help: '#4cc9f0',
        confirm: '#ed5e68',
        cancel: '#8388a4'
      }
    }
  }
})
