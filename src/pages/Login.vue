<template>
  <div>
    <div class="jumbotron bg-primary text-white text-center">
      <h2 class="lead display-3">#SLACK#</h2>
      <p>Realtime communication at it's best!</p>
    </div>

    <!-- show loading state -->
    <div v-if="loading" class="alert alert-info">Processing ...</div>
    <!-- show loading state end -->

    <!-- show loading state -->
    <div v-if="hasErrors" class="alert alert-danger">
      <div v-for="(error, index) in errors" :key="`${error}-${index}`">{{ error }}</div>
    </div>
    <!-- show loading state end -->

    <div class="container-fluid">
      <div class="row mt-5">
        <div class="col text-center">
          <button @click="loginWithGoogle" class="btn btn-outline-danger btn-lg">
            Login with Google
          </button>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col text-center">
          <button class="btn btn-outline-info btn-lg">
            Login with Twitter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/database';

export default {
  name: 'login',
  data () {
    return {
      errors: [],
      loading: false,
      usersRef: firebase.database().ref('users'),
    }
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0
    },
  },
  methods: {
    loginWithGoogle() {
      this.loading = true;
      this.errors = [];

      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((res) => {
          this.saveUserToUsersRef(res.user);

          this.$store.dispatch('setUser', res.user);
          this.$router.push('/');
          // console.log(res.user)
        }).catch(error => {
          this.errors.push(error.message);
          this.loading = false;
        });
    },
    // save user to database
    saveUserToUsersRef(user) {
      return this.usersRef.child(user.uid).set({
        name: user.displayName,
        avatar: user.photoURL,
      });
    },
  }
}
</script>

<style lang="scss">
.btn, .jumbotron {
  border-radius: 0;
}
</style>
