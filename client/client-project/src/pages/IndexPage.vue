<template>
  <div>
    <vue-drawing-canvas id="canvas" ref="canvas" line-join="round"></vue-drawing-canvas>
    <q-btn @click="joinPlayer()">hi</q-btn>
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
import { ref, onMounted } from 'vue';
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
    const canvas = ref(null);

    onMounted(() => {
      const canvas = document.getElementById('canvas');
      console.log(canvas.getContext('2d'));
    });

    return { 
      canvas, 
      isChooseDialogShown: ref(false),
    };
  },
}
</script>