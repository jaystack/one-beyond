<template>
  <div>
   <q-btn @click="joinPlayer()" >hi</q-btn>
  </div>
</template>


<script>
import { mapActions } from "vuex";
export default {
  name: "IndexPage",
  methods: {
    ...mapActions({
      join: 'player/join',
      getPlayers: 'player/getPlayers'
    }),
     joinPlayer() {
      this.join('hakunamatata');
      this.getPlayers();
    }
  }
}
</script>