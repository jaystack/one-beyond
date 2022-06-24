<template>
  <div>
    <vue-drawing-canvas
      id="canvas"
      line-join="round"
    ></vue-drawing-canvas>
  </div>
</template>

<script>
import { Dialog } from 'quasar';
import { ref } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import VueDrawingCanvas from 'vue-drawing-canvas';
export default {
  name: 'IndexPage',
  components: { VueDrawingCanvas },
  data(){
    return {
      isChooseDialogShown: false
    }
  },
  mounted() {
    Dialog.create({
      title: 'Prompt',
      message: 'What is your name? (Minimum 3 characters)',
      prompt: {
        model: '',
        isValid: (val) => val.length > 2, // << here is the magic
        type: 'text', // optional
      },
      cancel: true,
      persistent: true,
    }).onOk((data) => {
      this.joinPlayer(data);
    });
  },
  methods: {
    ...mapActions({
      join: 'player/join',
      getPlayers: 'player/getPlayers',
    }),
    joinPlayer(data) {
      this.join(data);
      this.getPlayers();
    },
  },
  computed: {
    ...mapGetters({
      player: 'player/player',
    }),
  },
};
</script>
