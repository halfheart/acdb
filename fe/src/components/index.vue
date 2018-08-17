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
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-lg-and-up"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title" @click="$router.push({ name: 'intro' })"></v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-md-and-down">
        <v-btn flat ripple>덱 리스트</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <user-signin />
      <user-register />
    </v-toolbar>
    <v-content>
      <router-view/>
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
import userRegister from '@/components/auth/user-register'
import userSignin from '@/components/auth/user-signin'

export default {
  components: {
    userRegister,
    userSignin
  },
  data () {
    return {
      sss: '',
      drawer: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      title: '아컴DB'
    }
  }
}
</script>
