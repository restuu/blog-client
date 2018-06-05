<template>
  <div class="container mt-3">
    <div class="col-sm-6">
      <img class="img-fluid" :src="article.imageUrl" alt="article.title"/>
    </div>

    <div>
      <h3>{{ article.title }}</h3>
      <p>{{ article.content }}</p>
      <small>{{ this.$route.query.id }}</small>
    </div>
  </div>
</template>

<script>
export default {
  props: ['article'],
  data () {
    return {
      title: 'title',
      content: 'content' 
    }
  }
}
</script>

<style>

</style>
