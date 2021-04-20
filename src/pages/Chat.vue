<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 sidebar">
        <Sidebar/>
      </div>
      <div class="col-md-8 content">
        <Messages/>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import Sidebar from '@/components/sidebar/Sidebar';
import Messages from '@/components/messages/Messages';

export default {
  name: 'chat',
  components: {
    Sidebar,
    Messages,
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
.sidebar {
  width: 33.5%;
  height: 100%;
  position: fixed;
  background: black;
  float: left;
  padding-top: 2em;
  overflow: scroll;
}
.content {
  width: 66%;
  float: left;
  margin-left: 34%;
}
</style>
