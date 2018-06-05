<template>
  <div id="listSaved" class="my-2">
    <h6>Saved article(s):</h6>
    
    <b-list-group 
      v-for="article in savedArticles" 
      :key="article._id"
      >
      <b-list-group-item class="col-sm-6">
        <div class="row">
          <router-link :to="{name: 'articles', query: {id: article._id}}">
            <h6 class="ml-3" v-if="article.title.length <= 20">{{ article.title }}</h6>
            <h6 class="ml-3" v-else>{{ article.title.slice(0, 20) + '...' }}</h6>
          </router-link>
          
          <span class="ml-auto mr-3"> 
            <a id="delSaved" href="" 
              @click.prevent="delSaved(article._id)"
              v-b-popover.hover="'Delete'"
              >x</a> 
          </span>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import axios from 'axios'
import axiosErrorHandling from '@/assets/js/axios.error'

export default {
  props: {
    savedArticles: Array,
  },

  data () {
    return {
    }
  },

  methods: {
    delSaved (articleId) {
      let self = this
      let token = localStorage.getItem('token')
      axios({
        url: `http://localhost:3000/api/users/articles/delete?q=${articleId}`,
        method: 'delete',
        headers: {
          token
        }
      })
      .then(response => {
        console.log(response)
        self.$emit('deleted')
      })
      .catch(err => axiosErrorHandling(err))
    }
  }
}
</script>

<style>
  #delSaved {
    color: red
  }
</style>
