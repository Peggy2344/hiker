<template>
  <div class="formContainer rounded-b-lg">
    <v-form enctype="multipart/form-data">
      <v-container>
        <v-row justify="center">
          <v-col
            cols="10"
            sm="8"
          >
            <v-text-field
              v-model="itemdetail.productName"
              label="商品名稱"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="10"
            sm="3"
          >
            <v-select
              v-model="itemdetail.display"
              label="是否上架"
              required
              :items="display"
            ></v-select>
          </v-col>
          <v-col
            cols="10"
            sm="4"
          >
            <v-select
              v-model="itemdetail.brand"
              label="品牌名稱"
              required
              :items="brandItems"
            ></v-select>
          </v-col>
          <v-col
            cols="10"
            sm="3"
          >
            <v-select
              v-model="itemdetail.navigation"
              label="種類"
              required
              :items="navigationItems"
            ></v-select>
          </v-col>
          <v-col
            cols="10"
            sm="4"
          >
            <v-select
              v-model="itemdetail.category"
              label="類別"
              required
              :items="categoryItems"
            ></v-select>
          </v-col>
          <v-col
            cols="10"
            sm="5"
          >
            <v-text-field
              v-model="itemdetail.price"
              label="價格"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="10"
            sm="5"
          >
            <v-checkbox
              v-model="checkbox"
              label="包含不同顏色及尺寸"
            ></v-checkbox>
          </v-col>
          <template v-if="details.length">
            <v-col
              cols="10"
            >
            <v-row class="py-0 col-12 d-flex justify-center border_bottom">
              <v-col cols="2">顏色</v-col>
              <v-col cols="2">尺寸</v-col>
              <v-col cols="2">庫存</v-col>
              <v-col cols="1" class="col-lg-2">修改</v-col>
            </v-row>
            <v-row class="py-0 col-12 d-flex justify-center" v-for="(detail, index) in details" :key="index">
              <v-col cols="2">{{detail.color}}</v-col>
              <v-col cols="2">{{detail.size}}</v-col>
              <v-col cols="2">{{detail.inStock}}</v-col>
              <v-col cols="1"><v-btn x-small outlined color="primary" class="outlineBtn" @click="removeHandler(detail)">移除</v-btn></v-col>
            </v-row>
            </v-col>
          </template>
          <template v-if="checkbox">
            <v-col
              cols="10"
              sm="3"
            >
              <v-text-field
                v-model="detail.color"
                label="顏色"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="10"
              sm="3"
            >
              <v-text-field
                v-model="detail.size"
                label="尺寸"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="10"
              sm="3"
            >
              <v-text-field
                v-model="detail.inStock"
                label="庫存"
                required
                @keyup.enter="addHandler"
              ></v-text-field>
            </v-col>
            <v-col cols="10" class="col-lg-2">
              <v-btn small color="primary" @click="addHandler">
                新增
              </v-btn>
            </v-col>
          </template>
          <template v-else>
            <v-col
              cols="10"
              sm="5"
            >
              <v-text-field
                v-model="itemdetail.inStock"
                label="庫存"
                required
              ></v-text-field>
            </v-col>
          </template>
          <v-col
            cols="10"
          >
            <v-file-input
              multiple
              label="上傳商品圖片"
              @change="filechangeHandler($event)"
            ></v-file-input>
          </v-col>
          <v-col
            cols="2"
            class="d-flex mx-5 flex-wrap relative"
            v-for="(url, index) in itemdetail.urls"
            :key="url"
          >
            <v-img
              :src="url"
              :key="url"
              max-width="100"
            ></v-img>
            <v-btn
              absolute
              fab
              dark
              small
              color="words"
              max-width="20"
              max-height="20"
              class="delBtn"
              @click="delImg(index)"
            >
              <v-icon dark>
                mdi-close
              </v-icon>
            </v-btn>
          </v-col>
          <v-col
            cols="10"
            class="text-center"
          >
            <v-btn
              color="words"
              dark
              v-on="on"
              class="width-80"
              @click.stop.prevent="itemdetail.status === 'create' ? submitHandler() : editHandler()"
            >
              送出
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { postProduct, editProduct } from '../apis/admin'
import { getClassification } from '../apis/product'
export default {
  props: {
    on: {
      type: Object
    },
    editItem: {
      type: Object,
      default: () => ({
        _id: '',
        productName: '',
        brand: '',
        navigation: '',
        category: '',
        price: 0,
        inStock: 0,
        picture: '',
        status: 'create',
        productImg: [],
        details: [],
        display: true
      })
    }
  },
  data () {
    return {
      checkbox: false,
      itemdetail: {
        urls: [],
        productName: this.editItem.productName,
        brand: this.editItem.brand,
        navigation: this.editItem.navigation,
        category: this.editItem.category,
        price: this.editItem.price,
        inStock: this.editItem.inStock,
        status: this.editItem.status,
        productImg: this.editItem.productImg,
        details: this.editItem.details,
        display: this.editItem.display
      },
      detail: {
        size: '',
        color: '',
        inStock: ''
      },
      brandItems: [],
      navigationItems: [],
      categoryItems: [],
      classificationData: [],
      details: [],
      display: [
        {
          text: '是',
          value: true
        },
        {
          text: '否',
          value: false
        }
      ]
    }
  },
  methods: {
    async fetchData () {
      const res = await getClassification()
      if (res.data.success) {
        this.classificationData = res.data.result
        this.classificationData.forEach(item => {
          this.navigationItems.push(item.navigation)
        })
        this.brandItems = this.classificationData.filter(item => {
          return item.navigation === '品牌'
        })[0].category
      }
      this.setEditDetail()
    },
    setEditDetail () {
      if (this.itemdetail.status === 'edit') {
        this.categoryItems = this.classificationData.filter(item => {
          return item.navigation === this.itemdetail.navigation
        })[0].category
        this.editItem.productImg.forEach(item => {
          this.itemdetail.urls.push(process.env.VUE_APP_API + '/products/file/' + item.file)
        })
      }
    },
    filechangeHandler (file) {
      if (!file.length) return
      for (let i = 0; i < file.length; i++) {
        if (file[i].size > 1024 * 1024) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '圖片太大'
          })
        } else if (!file[i].type.includes('image')) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '檔案格式錯誤'
          })
        } else {
          // this.files.push(file[i])
          this.itemdetail.productImg.push(file[i])
          this.itemdetail.urls.push(URL.createObjectURL(file[i]))
        }
      }
    },
    formHandler () {
      const formData = new FormData()
      // const detailsObj = {
      //   size: '',
      //   color: '',
      //   inStock: ''
      // }
      for (const key in this.itemdetail) {
        if (key === 'productImg') {
          this.itemdetail.productImg.forEach(item => {
            formData.append('image', item)
          })
        } else if (key === 'inStock') {
          formData.append('inStock', this.itemdetail.inStock)
        } else {
          formData.append(key, this.itemdetail[key])
        }
        delete this.itemdetail.urls
      }
      if (this.checkbox) {
        for (let i = 0; i < this.details.length; i++) {
          formData.append(`details[${i}]`, JSON.stringify(this.details[i]))
        }
      }
      return formData
    },
    async submitHandler () {
      const formData = this.formHandler()
      try {
        const res = await postProduct(formData)
        if (res.data.success) {
          this.$swal({
            icon: 'success',
            iconColor: '#FF5A17',
            confirmButtonColor: '#356859',
            title: '上傳成功'
          })
          this.itemdetail = { ...this.editItem }
          this.itemdetail.urls = []
          this.itemdetail.productImg = []
          this.$emit('update', res.data.result)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async editHandler () {
      this.itemdetail.productImg = this.editItem.productImg
      delete this.itemdetail.urls
      try {
        const res = await editProduct({ productId: this.editItem._id }, this.itemdetail)
        if (res.data.success) {
          this.$swal({
            icon: 'success',
            iconColor: 'brightGreen',
            confirmButtonColor: 'words',
            title: '更新成功'
          }).then((res) => {
            this.$emit('update', this.itemdetail)
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    delImg (index) {
      this.itemdetail.urls.splice(index, 1)
      this.itemdetail.productImg.splice(index, 1)
      this.$emit('fileChange', index)
    },
    addHandler () {
      if (!this.detail.color && !this.detail.size) {
        this.$swal({
          icon: 'error',
          confirmButtonColor: 'words',
          text: '請填寫商品資訊'
        })
        return
      }
      const obj = { ...this.detail }
      this.details.push(obj)
      this.detail.size = ''
      this.detail.color = ''
      this.detail.inStock = ''
    },
    removeHandler (detail) {
      const index = this.details.findIndex(item => item === detail)
      this.details.splice(index, 1)
    }
  },
  watch: {
    editItem (newVal) {
      if (newVal.details) {
        this.checkbox = true
        this.details = this.editItem.details
      } else {
        this.checkbox = false
        this.details = []
      }
      this.itemdetail = newVal
      this.itemdetail.urls = []
      if (!newVal.productImg) return
      newVal.productImg.forEach(item => {
        this.itemdetail.urls.push(process.env.VUE_APP_API + '/products/file/' + item.file)
      })
    },
    itemdetail: {
      handler (newVal) {
        if (!newVal.navigation) return
        this.categoryItems = this.classificationData.filter(item => {
          return item.navigation === newVal.navigation
        })[0].category
      },
      deep: true
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style>
.formContainer {
  background: var(--v-gray-base);
}
.border_bottom{
  border-bottom: 1px solid var(--v-primary-base);
}
#app .outlineBtn span.v-btn__content{
  color: inherit;
}
@media (min-width:1280px) {
  /* .formContainer{
    width: 50%;
  } */
}
.width-80{
  width: 80%;
}
.relative{
  position: relative;
}
.delBtn{
  top: 0;
  right: -25px;
}
</style>
