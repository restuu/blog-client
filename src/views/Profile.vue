<template>
  <b-container class="pt-2">
    <h1>Wellcome</h1>
    <h3>{{ fullname }}</h3>

    <FormInput/>

    <h6>Saved article(s):</h6>
    <ArticleCard
      v-if="savedArticles.length > 0"
      v-for="article in savedArticles"
      :key="article._id"
      :title="article.title"
      :content="article.content"
      :id="article._id"
      :imageUrl="article.imageUrl"
    />

  </b-container>
</template>

<script>
import axios from 'axios'
import axiosErrorHandling from '@/assets/js/axios.error'
import ArticleCard from '@/components/ArticleCard.vue'
import FormInput from '@/components/FormInput.vue'

export default {
  data () {
    return {
      fullname: '',
      savedArticles: []
    }
  },

  components: {
    ArticleCard,
    FormInput
  },

  created () {
    let self = this
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/users',
      headers: {
        'token': localStorage.token
      }
    })
    .then(({data}) => {
      console.log('----user profile', data)
      self.fullname = data.data.fullname
      self.savedArticles = data.data.articles
    })
    .catch(err => axiosErrorHandling(err))
  }
}
</script>

<style>

</style>
