<template>
  <div>
    <div class="users text-light">
      <h4>Users</h4>
      <ul class="nav flex-column">
        <Channel
          v-for="(user, index) in users"
          :key="user.uid"
          :isUser="true"
          :isCurrentUser="isCurrentUser(user)"
          :isLastChild="index + 1 === users.length"
          :isOnline="isOnline(user)"
          :avatar="user.avatar"
          :name="user.name"
          :active="isActive(user)"
          :changeChannel="() => changeChannel(user)"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import { mapGetters } from 'vuex';
import Channel from '@/components/sidebar/channels/Channel';

export default {
  name: 'users',
  components: {
    Channel,
  },
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
    ...mapGetters(['currentUser', 'currentChannel']),
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

    isActive(user) {
      const channelId = this.getChannelId(user.uid);
      return this.currentChannel.id === channelId;
    },

    addStatusToUser(userId, connected = true) {
      const index = this.users.findIndex(user => user.uid === userId);
      if (index !== -1) {
        this.users[index].status = connected === true ? 'online' : 'offline';
      }
    },

    changeChannel(user) {
      // to change channel, we need channel id
      const channelId = this.getChannelId(user.uid);

      // to get channel id, user getChannelId below
      const channel = { id: channelId, name: user.name };

      this.$store.dispatch('setPrivate', true);
      this.$store.dispatch('setCurrentChannel', channel);
    },

    getChannelId(userId) {
      return userId < this.currentUser.uid
        ? userId + '/' + this.currentUser.uid
        : this.currentUser.uid + '/' + userId;
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
