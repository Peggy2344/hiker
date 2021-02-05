<template>
  <v-app id="app">
    <v-row id="app" class="d-flex mx-5 flex">
      <v-col cols="12">
      <v-row class="mx-4 my-3 pa-0 d-flex justify-start align-center">
          <h1 class="ma-0 text-lg-h5 text-subtitle-1 words--text  font-weight-bold">商品列表</h1>
      </v-row>
        <hr class="my-0">
      </v-col>
    <div class="d-flex container justify-start mr-auto flex-wrap">
      <div class="col-lg-3 col-6">
      <v-select
        v-model="selection"
        :items="items"
        label="請選擇種類"
        color="#FF5A17"
        validate-on-blur
      ></v-select>
      </div>
      <div class="mx-5 col-lg-3 col-1">
          <v-btn
            color="words"
            @click="showform = true"
          >
            + 新增商品
          </v-btn>
        </div>
    </div>
    <v-col cols="12">
      <v-container v-if="isLoading" class="progress">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
    </v-container>
      <v-data-table
      v-if="!isLoading"
      :headers="headers"
      :items="products"
      class="elevation-1"
      :footer-props="{
        'items-per-page-text':'每頁顯示數量'
      }"
    >
      <template v-slot:item.display="{ item }">
        <div
        class="font-weight-bold"
        :class="{ 'successGreen--text': item.display, 'confirm--text': !item.display }">
          {{ item.display ? '上架': '未上架' }}
        </div>
      </template>
      <template v-slot:item.productImg[0].file="{ item }">
        <div class="p-2">
          <img :src="env + '/products/file/' + item.productImg[0].file" width="100px">
        </div>
      </template>
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-dialog
            v-model="dialog"
            max-width="600"
          >
            <ProductForm @update="afterEditHandler" @fileChange="fileChange" :editItem=editedItem />
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">確定要刪除此產品?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="cancel" @click="closeDelete">取消</v-btn>
                <v-btn color="confirm" @click="deleteItemConfirm">確定</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          color="brightBlue"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          color="brightRed"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
        >
          Reset
        </v-btn>
      </template>
      </v-data-table>
    </v-col>
    <transition name="fade">
      <v-dialog v-model="showform" width="600" class="relative">
        <!-- <div class="d-flex close"> -->
          <v-btn icon fab @click.stop="showform = false" class="absolute_btn">
            <v-icon color="words">mdi-close</v-icon>
          </v-btn>
        <!-- </div> -->
        <ProductForm @update="afterSumbitHandler" :editItem=defaultItem />
      </v-dialog>
    </transition>
    </v-row>
  </v-app>
</template>

<script>
import { deleteProduct } from '../apis/admin'
import { getProducts } from '../apis/product'
import ProductForm from './ProductForm.vue'
export default {
  components: { ProductForm },
  data () {
    return {
      env: process.env.VUE_APP_API,
      showform: false,
      absolute: true,
      selection: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: '商品名稱', value: 'productName' },
        { text: '品牌', value: 'brand' },
        { text: '種類', value: 'navigation' },
        { text: '類別', value: 'category' },
        { text: '價格', value: 'price' },
        { text: '上架', value: 'display' },
        { text: '商品圖片', value: 'productImg[0].file' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      products: [],
      productData: [],
      editedIndex: -1,
      editedItem: {
        _v: 0,
        _id: '',
        productName: '',
        brand: 0,
        navigation: 0,
        category: 0,
        price: 0,
        inStock: 0,
        picture: 0,
        status: 'edit',
        productImg: []
      },
      defaultItem: {
        productName: '',
        brand: '',
        navigation: '',
        category: '',
        price: 0,
        inStock: 0,
        picture: '',
        status: 'create',
        productImg: []
      },
      items: ['全部', '女款', '男款', '裝備'],
      isLoading: true
    }
  },
  methods: {
    afterSumbitHandler (val) {
      this.products.push(val)
      this.showform = false
      console.log(val)
    },
    afterEditHandler (val) {
      this.$set(this.products, this.editedIndex, val)
      this.dialog = false
    },
    editItem (item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item, { status: 'edit' })
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      try {
        const res = await deleteProduct({ productId: this.editedItem._id })
        if (res.data.success) {
          this.dialogDelete = false
          this.products.splice(this.editedIndex, 1)
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        } else {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: res.data.message
          })
        }
      } catch (err) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: err.response.data.message
        })
      }
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    fileChange (val) {
      this.products[this.editedIndex].productImg.splice(val, 1)
    }
  },
  watch: {
    selection (newVal) {
      this.products = newVal === '全部' ? this.productData : this.productData.filter(item => item.navigation === newVal)
    }
  },
  async mounted () {
    try {
      const res = await getProducts()
      this.products = res.data.result
      this.productData = res.data.result
      this.isLoading = false
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style>
#app
span.v-btn__content {
  color:#fffbe6;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.close {
  background: #333;
}
.relative {
  position: relative;
}
.absolute_btn {
  position: absolute;
}
.v-data-footer .v-btn > .v-btn__content .v-icon{
  color: var(--v-primary-base);
}
</style>
