<template>
  <div>
    <h2 class="text-light">#SLACK#</h2>

    <hr style="border: 1px solid #333;">
    <span>
      <img :src="currentUser.photoURL" height="30" class="rounded-circle mr-2">
      <span class="text-light">{{ currentUser.displayName }}</span>
    </span>
    <hr style="border: 1px solid #333;">

    <button class="btn btn-outline-light" @click="logout">Logout</button>

    <hr style="border: 1px solid #333;">

    <Channels/>
  </div>
</template>

<script>
import Channels from '@/components/sidebar/Channels';
import firebase from 'firebase/app';
import { mapGetters } from 'vuex';

export default {
  name: 'sidebar',
  components: {
    Channels,
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    logout() {
       firebase.auth().signOut();
       this.$store.dispatch('setUser', null);
       this.$router.push('/login');
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
