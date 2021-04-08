<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 sidebar">
        <h2 class="text-light">#SLACK#</h2>
        <hr>
        <button class="btn btn-outline-light" @click="logout">Logout</button>
      </div>
      <div class="col-md-8 content">content</div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  name: 'chat',
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
  hr {
    border: 1px solid #333;
  }
}
.content {
  width: 66%;
  float: left;
  margin-left: 34%;
}
</style>
