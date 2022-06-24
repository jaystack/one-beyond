<template>
  <div>
    <vue-drawing-canvas ref="VueCanvasDrawing" class="whiteboard" line-join="round"></vue-drawing-canvas>
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
import { Dialog } from 'quasar';
import { ref, onMounted } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import VueDrawingCanvas from 'vue-drawing-canvas';
export default {
  name: 'IndexPage',
  components: { VueDrawingCanvas },
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
  setup() {
    onMounted(() => {
      const canvas = document.getElementsByClassName('whiteboard')[0];
      console.log(canvas.getContext('2d'));
    });
    return { 
      isChooseDialogShown: ref(false),
    };
  },
};
</script>
