<template>
  <b-navbar toggleable="md" type="dark" variant="dark">

    <b-navbar-brand :to="{name: 'home'}">Blog</b-navbar-brand>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-collapse is-nav id="nav_collapse">

      <!-- Right aligned nav items -->
      <b-navbar-nav class="mr-auto">

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            User
          </template>
          <b-dropdown-item :to="{name: 'users'}" v-if="isLogin">Profile</b-dropdown-item>
          <b-dropdown-item :to="{name: 'login'}" v-if="!isLogin">Login</b-dropdown-item>
          <b-dropdown-item :to="{name: 'home'}" v-else-if="isLogin" @click="cleanLocal">Logout</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState ([
      'isLogin'
    ])
  },

  methods: {
    cleanLocal () {
      localStorage.clear()
      this.$store.commit('changeLoginState', false)
      this.$router.push({name: 'home'})
    }
  }
}
</script>
