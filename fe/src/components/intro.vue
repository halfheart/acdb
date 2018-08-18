<template>
  <div>
    <v-jumbotron
    src="http://localhost:3000/images/index.jpg"
    height="500px"
    app>
    </v-jumbotron>
    <v-container grid-list-md class="__content">
      <v-layout column justify-center>
        <v-flex>
          <h2 class="intro_title mt-2 mb-3">최근 덱 리스트</h2>
          <h3 class="intro_title mb-3">Recent Decks</h3>
          <deck-list :limit="3" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style>
.intro_title {
  text-align: center;
}
</style>

<script>
import deckList from '@/components/deck/deck-list'

export default {
  components: {
    deckList
  },
  data () {
    return {

    }
  }
}
</script>
