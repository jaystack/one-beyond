<template>
  <div>
    <q-dialog
      v-model="isChooseDialogShown"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <div class="q-pa-md q-gutter-sm">
        <q-btn label="WORD" color="white" text-color="black" size="xl" />
        <q-btn label="WORD" color="white" text-color="black" size="xl" />
        <q-btn label="WORD" color="white" text-color="black" size="xl" />
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { Dialog } from 'quasar'
import { ref } from 'vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'IndexPage',
  setup() {
    return {
      isChooseDialogShown: ref(false),
    };
  },
  mounted(){
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
