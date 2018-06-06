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
    <b-progress v-show="counter !== max" :value="counter" :max="max" show-progress animated></b-progress>
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
      image: null,
      counter: 0,
      max: 0
    }
  },

  methods: {
    postArticle () {
      console.log(this.title, this.content, this.image)
      let formData = new FormData()
      formData.append('image', this.image)
      formData.append('title', this.title)
      formData.append('content', this.content)
      let self = this
      axios({
        url: 'https://api-blog.restuutomo.me/api/users/post',
        method: 'post',
        data: formData,
        headers: {
          'token': localStorage.token
        },
        onUploadProgress: function (progressEvent) {
          console.log('progres------------', progressEvent)
          self.counter = progressEvent.loaded
          self.max = progressEvent.total
        },
      })
      .then(({data}) => {
        console.log('after post article', data)
        alert('Post added')
        self.$router.push('/')
      })
      .catch(err => axiosErrorHandling(err))
    }
  }
}
</script>

<style>
</style>
