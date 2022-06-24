<template>
  <div>
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

export default {
  setup() {
    return {
      isChooseDialogShown: ref(false),
    };
  },
}
</script>