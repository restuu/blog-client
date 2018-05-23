<template>
  <b-card class="my-3">
    <b-form>
      <b-form-input v-model="title" placeholder="Input title here"></b-form-input>
      <b-form-textarea 
        id="content" 
        v-model="content" 
        placeholder="enter content here"
        class="align-top"
        :rows="3"
        >
      </b-form-textarea>
      <b-form-file v-model="image" placeholder="Choose an image..."></b-form-file>
      <b-btn variant="success" class="mt-2" @click="postArticle">Submit Post</b-btn>
    </b-form>
  </b-card>
</template>

<script>
import axios from 'axios'
import axiosErrorHandling from '@/assets/js/axios.error'

export default {
  data () {
    return {
      title: '',
      content: '',
      image: null
    }
  },

  methods: {
    postArticle () {
      console.log(this.title, this.content, this.image)
      let FormData = new FormData()
      FormData.append('image', this.image)
      FormData.append('title', this.title)
      FormData.append('content', this.content)
      axios({
        url: 'http://localhost:3000/api/users/post',
        method: 'post',
        data: FormData,
        headers: {
          'token': localStorage.token
        }
      })
      .then(({data}) => {
        console.log('after post article', data)
      })
      .catch(err => axiosErrorHandling(err))
    }
  }
}
</script>

<style>
</style>
