<template>
  <div class="pa-0 ma-0 vw-100">
    <v-row class="justify-center">
      <v-col class="col-lg-12 col-sm-12">
        <ScrollItem :isLoading.sync="isLoading" :hotsales="newItem" :display="'newItem'"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getHotsale } from '../apis/product'
import ScrollItem from './ScrollItem.vue'
export default {
  components: {
    ScrollItem
  },
  data () {
    return {
      isLoading: true,
      newItem: []
    }
  },
  async mounted () {
    const res = await getHotsale()
    this.newItem = res.data.result
    this.isLoading = false
  }
}
</script>

<style>
.new-title{
  color: var(--v-primary-base);
}
.vh{
  background: var(--v-primary-base);
  height: 50vh;
}
.vw-100{
  width: 100vw;
}
.highlight{
  position: relative;
  z-index: 100;
}
.highlight:before{
  content: "";
  position: absolute;
  height: 0.5em;
  top: 0.6em;
  background: var(--v-brightGreen-base);
  width: 100%;
  z-index: -1;
  /* IE 8 */
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=75)";

  /* IE 5-7 */
  filter: alpha(opacity=75);

  /* Netscape */
  -moz-opacity: 0.75;

  /* Safari 1.x */
  -khtml-opacity: 0.75;

  /* Good browsers */
  opacity: 0.75;
}
</style>
