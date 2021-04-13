<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 sidebar">
        <Sidebar/>
      </div>
      <div class="col-md-8 content">content</div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import Sidebar from '@/components/Sidebar';

export default {
  name: 'chat',
  components: {
    Sidebar
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
