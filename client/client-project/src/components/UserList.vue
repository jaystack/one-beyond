<template>
  <q-scroll-area style="height: calc(100% - 100px)">
    <q-list>
      <q-item v-for="player in players" :key="player.name" v-ripple clickable>
        <q-item-section>
          <q-item-label lines="1">
            {{ player.name }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>score: {{player.score}} </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'UserList',
  computed: {
    ...mapGetters({
      players: 'player/players',
    }),
  },
};
</script>

<style lang="sass">
.conversation__summary
  margin-top: 4px
.conversation__more
  margin-top: 0!important
  font-size: 1.4rem
</style>
