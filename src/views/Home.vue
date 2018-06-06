<template>
  <b-container id="home" class="mt-4 mx-0">
      <ArticleCard 
      v-for="article in articles"
      :key="article._id"
      :title="article.title"
      :content="article.content"
      :id="article._id"
      :imageUrl="article.imageUrl"
      :button="true"
      :article="article"
      />
      <!-- <router-view></router-view> -->
  </b-container>
</template>

<script>
// @ is an alias to /src
import ArticleCard from '@/components/ArticleCard.vue'
import axios from 'axios'

export default {
  name: 'home',
  data () {
    return {
      articles: []
    }
  },

  components: {
    ArticleCard
  },

  methods: {
    getAllArticles () {
      let self = this
      axios
        .get(
          'https://api-blog.restuutomo.me/api',
        )
        .then(({data}) => {
          console.log('--------response', data.data)
          self.articles = data.data
        })
        .catch(err => {
          console.log('error', err)
        })
    }
  },

  created () {
    this.getAllArticles()
  }
}
</script>

<style>
  #home {
    max-width: 100%;
  }
</style>
