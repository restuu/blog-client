<template>
  <b-container class="pt-2 p-0">
    <h1>Wellcome</h1>
    <h3>{{ fullname }}</h3>

    <b-nav tabs>
      <b-nav-item 
        :active="articleActive"
        @click="changeNav('saved')"
        >Saved Articles</b-nav-item>
      <b-nav-item
        :active="formActive"
        @click="changeNav('form')"
        >Post Articles</b-nav-item>
    </b-nav>

    <ItemList 
      v-show="articleActive" 
      :savedArticles="savedArticles"
      @deleted="getUserData"
      />
    <FormInput v-show="formActive"/>

  </b-container>
</template>

<script>
import axios from 'axios'
import axiosErrorHandling from '@/assets/js/axios.error'
import ArticleCard from '@/components/ArticleCard.vue'
import FormInput from '@/components/FormInput.vue'
import ItemList from '@/components/ItemList.vue'

export default {
  data () {
    return {
      fullname: '',
      savedArticles: [],
      articleActive: true,
      formActive: false 
    }
  },

  components: {
    ArticleCard,
    FormInput,
    ItemList
  },

  methods: {
    changeNav (status) {
      if (status === 'saved') {
        this.articleActive = true
        this.formActive = false
      } else {
        this.articleActive = false
        this.formActive = true
      }
    },

    getUserData () {
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
  },

  created () {
    this.getUserData()
  }
}
</script>

<style>
  
</style>
