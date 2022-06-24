<template>
  <div>
    <vue-drawing-canvas ref="VueCanvasDrawing" line-join="round"></vue-drawing-canvas>
   <q-btn @click="joinPlayer()" >hi</q-btn>
       <q-dialog v-model="isChooseDialogShown" persistent transition-show="scale" transition-hide="scale">
      <div class="q-pa-md q-gutter-sm">
        <q-btn label="WORD" color="white" text-color="black" size="xl" />
        <q-btn label="WORD" color="white" text-color="black" size="xl" />
        <q-btn label="WORD" color="white" text-color="black" size="xl" />
      </div>
    </q-dialog>
  </div>
</template>


<script>
import { ref } from 'vue';
import { mapActions } from "vuex";
import VueDrawingCanvas from 'vue-drawing-canvas';
export default {
  components: {
    VueDrawingCanvas
  },
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
  },
    setup() {
    return {
      isChooseDialogShown: ref(false),
    };
  },
}
</script>