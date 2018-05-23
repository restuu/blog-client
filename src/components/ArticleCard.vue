<template>
  <b-row class="">

    <b-img id="imageArticle" class="col-sm-3 mb-2" :src="imageUrl" :alt="title"/>

    <b-card class="mb-2 col-sm-9">
      <h3 class="">{{ title }}</h3>
      <p v-if="contentMore"> {{ content }}  <b-link @click="showLess" class="text-muted">show less</b-link>  </p>
      <p v-else-if="!contentMore"> {{ contentLess }}  <b-link @click="showMore">...</b-link>   </p>
      <b-button v-if="button" @click="saveArticle(id)">Save</b-button>
      <!-- <b-button class="ml-1">Like</b-button> -->
    </b-card>
  </b-row>
</template>

<script>
import axios from 'axios'
import axiosErrorHandling from '@/assets/js/axios.error'

export default {
  props: {
    title: String,
    content: String,
    id: String,
    imageUrl: String,
    button: false
  },

  data () {
    return {
      contentLess: this.content.slice(0, 250),
      contentMore: false
    }
  },

  methods: {
    saveArticle (id) {
      let self = this
      let token = localStorage.token
      console.log('-------------',token)
      axios({
        method: 'put',
        url: 'http://localhost:3000/api/users/save',
        data: {
          articleId: id
        },
        headers: {
          'token': token
        }
      })
        .then(({data}) => {
          console.log('save article', data)
          alert(data.message)
        })
        .catch(err => axiosErrorHandling(err))
        
    },

    showMore () {
      this.contentMore = true
    },

    showLess () {
      this.contentMore = false
    }
  }
}
</script>

<style <style lang="scss" scoped>
   #imageArticle {
    /* max-width: 200px; */
    /* max-height: 0px; */
    height: 10rem;
    /* width: 100% */
  }
</style>
