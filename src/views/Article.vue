<template>
  <div class="container mt-3">
    <div class="col-sm-6">
      <img class="img-fluid" :src="article.imageUrl" :alt="article.title"/>
    </div>

    <div>
      <h3>{{ article.title }}</h3>
      <p>{{ article.content }}</p>
      <small class="text-muted" v-if="article.user">Author: {{ article.user.fullname }}</small>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import axiosErrHandler from '@/assets/js/axios.error'

export default {
  data () {
    return {
      article: {}
    }
  },

  methods: {
    fetchData () {
      let articleId = this.$route.query.id
      let self = this

      axios({
        url: `http://localhost:3000/api/articles?id=${articleId}`,
        method: 'get',
      })
      .then(({data}) => {
        console.log(data)
        self.article = data.article
      })
      .catch(err => axiosErrHandler(err))
    }
  },

  created () {
    this.fetchData()
  }
}
</script>

<style>

</style>
