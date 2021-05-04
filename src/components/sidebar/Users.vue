<template>
  <div>
    <div class="users text-light">
      <h4>Users</h4>
      <ul class="nav flex-column">
        <li v-for="user in users" :key="user.uid" class="mb-3">
          <span>
            <span class="avatar mr-2">
              <span
                v-if="!isCurrentUser(user)"
                class="online-light rounded-circle"
                :class="isOnline(user) ? 'bg-success' : 'bg-secondary'"
              />
              <img alt="" class="img rounded-circle" :src="user.avatar" height="30" />
            </span>
            <span class="text-light">{{ user.name }}</span>
            <span v-if="isCurrentUser(user)" class="text-secondary ml-2">you</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import { mapGetters } from 'vuex';

export default {
  name: 'users',
  data() {
    return {
      users: [],
      usersRef: firebase.database().ref('users'),
      connectedRef: firebase.database().ref('.info/connected'),
      presenceRef: firebase.database().ref('presence'),
    };
  },
  mounted() {
    this.loadUsers();
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  methods: {
    loadUsers () {
      this.usersRef.on('child_added', snapshot => {
        const user = snapshot.val();
        user.uid = snapshot.key;
        user.status = 'offline';

        this.users.push(user);
        // this.loading = false;
      });

      // presence child added
      this.presenceRef.on('child_added', snapshot => {
        if (this.currentUser.uid !== snapshot.key) {
          this.addStatusToUser(snapshot.key);
        }
      });

      // presence child removed
      this.presenceRef.on('child_removed', snapshot => {
        if (this.currentUser.uid !== snapshot.key) {
          this.addStatusToUser(snapshot.key, false);
        }
      });

      this.connectedRef.on('value', snapshot => {
        // console.log(snapshot.val())
        if (snapshot.val() === true) {
          const ref = this.presenceRef.child(this.currentUser.uid);
          ref.set(true);
          ref.onDisconnect().remove();
        }
      });
    },

    isOnline (user) {
      return user.status === 'online';
    },

    isCurrentUser(user) {
      return user.uid === this.currentUser.uid;
    },

    addStatusToUser(userId, connected = true) {
      const index = this.users.findIndex(user => user.uid === userId);
      if (index !== -1) {
        this.users[index].status = connected === true ? 'online' : 'offline';
      }
    },

    detachListeners() {
      this.usersRef.off();
      this.presenceRef.off();
      this.connectedRef.off();
    },

    beforeDestroy() {
      this.detachListeners();
    },
  },
}
</script>

<style lang="scss" scoped>
.users {
  .avatar {
    display: inline-block;
    position: relative;
    .online-light {
      position: absolute;
      bottom: -2px;
      right: -5px;
      width: 15px;
      height: 15px;
      border: 3px solid black;
    }
  }
}
</style>
