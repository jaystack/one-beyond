<template>
  <q-layout view="lHr lpR lFr">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <UserList />
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar class="bg-grey-3 text-black row">
        <q-input
          rounded
          outlined
          dense
          class="col-grow q-mr-sm"
          bg-color="white"
          v-model="message"
          placeholder="Type a message"
          @keydown.enter="createMessage({name: player.name, message})"
        />
        <q-btn round flat icon="send" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

import UserList from '../components/UserList';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    UserList,
  },
  setup() {
    const leftDrawerOpen = ref(true);
    const rightDrawerOpen = ref(true);

    return {
      leftDrawerOpen,
      rightDrawerOpen,
    };
  },
  methods: {
    ...mapActions({
      create: 'message/createMessage'
    }),
    createMessage(data){
      console.log('irjad ki',data);
      this.create(data);
    }
  },
    computed: {
    ...mapGetters({
      player: 'player/player',
    }),
  },
};
</script>
