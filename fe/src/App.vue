<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      disable-resize-watcher
      class="hidden-lg-and-up"
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          @click="$router.push({ name: item.target })"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-lg-and-up"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-md-and-down">
        <v-btn
        v-for="(i, index) in items"
        :key="index"
        flat
        :to="i.to">{{ i.title }}</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <template v-if="!auth">
        <user-signin @isLoggedin="setLoggedin()" />
        <user-register />
      </template>
      <template v-if="auth">
        <div>{{ `${$auth.getUserInfo().username}님 환영합니다.` }}</div>
        <user-signout @isLoggedout="setLoggedout()" />
      </template>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<style>
.v-toolbar__content {
  width: 100%;
  max-width: 1200px;
  margin: auto;
}

.__content {
  max-width: 1200px;
  width: 100%;
  margin: auto;
}
</style>

<script>
import userSignin from '@/components/auth/user-signin'
import userRegister from '@/components/auth/user-register'
import userSignout from '@/components/auth/user-signout'

export default {
  name: 'app',
  components: {
    userSignin,
    userRegister,
    userSignout
  },
  data () {
    return {
      drawer: false,
      items: [
        {
          title: '덱 리스트',
          to: '/deck/list'
        },
        {
          title: '카드 목록',
          to: '/card/list'
        }
      ],
      title: '아컴DB',
      auth: this.$auth.isLoggedin()
    }
  },
  methods: {
    setLoggedin () {
      this.auth = true
    },
    setLoggedout () {
      this.auth = false
    }
  }
}
</script>
