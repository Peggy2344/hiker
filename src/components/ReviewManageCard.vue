<template>
  <v-card
    class="mx-auto d-flex align-center"
    outlined
    >
    <v-col cols="12" class="d-flex align-center justify-space-between flex-wrap">
      <!-- <v-list-item-content > -->
      <v-col cols="12" class="py-0">
          <div class="overline">{{getTime(comment.releaseDate)}}</div>
      </v-col>
      <v-col cols="12" class="d-flex align-center justify-center justify-lg-start flex-wrap">
        <div class="d-flex flex-column col-5 col-lg-2">
          <div class="overline mb-1">使用者ID</div>
          <div class="overline mb-1">{{comment.u_id.slice(-8)}}</div>
        </div>
        <div class="d-flex justify-start overline mb-1 col-7 col-lg-3">
          <v-rating
            :value=comment.star
            background-color="primary lighten-3"
            color="primary"
            size="15"
            half-increments
            readonly
          ></v-rating>
        </div>
        <div class="overline mb-1 col-6 col-lg-3"> {{comment.title}}</div>
        <div class="overline mb-1 col-6 col-lg-4"> {{comment.message}}</div>
      </v-col>
      <v-col cols="12">
        <div class="mx-5">
          顯示狀態: {{ comment.display ?  '顯示' : '不顯示'}}
        </div>
        <v-btn v-if="!comment.display" icon color="confirm" @click="cancel">
          <v-icon>
            mdi-cancel
          </v-icon>
        </v-btn>
        <v-btn v-else color="confirm" @click="cancel">
          顯示
        </v-btn>
      </v-col>
    </v-col>
  </v-card>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: ['comment'],
  data () {
    return {
    }
  },
  methods: {
    getTime (time) {
      return dayjs(time).format('YYYY/MM/DD')
    }
  },
  mounted () {
  }
}
</script>

<style>
#app .edit_btn span.v-btn__content {
  color: var(--v-primary-base);
}
.select{
  width: 50px;
  border: 1px solid var(--v-primary-base);
}
</style>
