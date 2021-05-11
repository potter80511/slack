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

    <hr style="border: 1px solid #333;">

    <Users/>
  </div>
</template>

<script>
import Channels from '@/components/sidebar/channels/Channels';
import Users from '@/components/sidebar/Users';
import firebase from 'firebase/app';
import { mapGetters } from 'vuex';

export default {
  name: 'sidebar',
  components: {
    Channels,
    Users,
  },
  data() {
    return {
      presenceRef: firebase.database().ref('presence'),
    };
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    logout() {
      this.presenceRef.child(this.currentUser.uid).remove();
      firebase.auth().signOut();
      this.$store.dispatch('setUser', null);
      this.$router.push('/login');
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
