<template>
  <b-card id="users" class="col-sm-4 mx-auto">
    <h3 v-if="!toRegister">Login</h3>
    <h3 v-else-if="toRegister">Register</h3>
    <b-form>
      <div v-if="toRegister">
        <label for="fullname">Your fullname:</label>
        <b-input type="text" v-model="name"></b-input>
      </div>
      <label for="email">Your E-mail:</label>
      <b-input type="email" id="email" v-model="email"></b-input>
      <label for="password">Your Password:</label>
      <b-input id="password" type="password" v-model="password" required></b-input>
      <div v-if="toRegister">
        <label for="password">Confirm Password:</label>
        <b-input id="password" type="password" v-model="confirmPass"></b-input>
      </div>
      <small v-if="(password !== confirmPass) && toRegister">password do not match</small> <br>
      <small v-if="password.length < 6">password minimum has 6 characters length</small> <br>
      <b-btn class="mt-2" variant="primary" @click="login">Login</b-btn>
      <b-btn class="mt-2 ml-2" @click="regPage">Register</b-btn>
    </b-form>
  </b-card>
</template>

<script>
import axios from 'axios'
import axiosErrorHandling from '@/assets/js/axios.error'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirmPass: '',
      toRegister: false,
    }
  },

  methods: {
    regPage () {
      if (!this.toRegister) {
        this.toRegister = true
      } else if (this.password === this.confirmPass) {
        if (this.password.length >= 6) {
          let self = this
          axios
            .post(
              'http://localhost:3000/api/register',
              {
                fullname: self.name,
                email: self.email,
                password: self.password
              }
            )
            .then(({data}) => {
              console.log('----register', data)
              self.toRegister = false
              self.name = ''
              self.email = ''
              self.password = ''
            })
            .catch(err => {
              axiosErrorHandling(err)
            })
        }
      }
    },

    login () {
      if (this.toRegister) {
        this.toRegister = false
      } else {
        let self = this
        axios
          .post(
            'http://localhost:3000/api/login',
            {
              email: self.email,
              password: self.password
            }
          )
          .then(({data}) => {
            console.log('----login', data)
            localStorage.token = data.token
            self.changeLoginState(true)
            this.$router.push('/')
          })
          .catch(err => {
            axiosErrorHandling(err)
          })
      }
    },

    ...mapMutations ([
      'changeLoginState'  
    ])
  }
}
</script>

<style scoped>
  small {
    color: red;
  }

  #users {
    margin-top: 5rem;
    /* border: 1px solid red */
  }
</style>
