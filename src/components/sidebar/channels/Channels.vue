<template>
  <div>
    <!-- <button class="btn btn-outline-primary">Add Channel</button> -->
    <b-button v-b-modal.channelModal>Add Channel</b-button>

    <!-- show channel list -->
    <div class="mt-4">
      <div v-if="loading" class="loading">loading...</div>
      <ul
        v-else
        class="channels-block nav flex-column"
      >
        <Channel
          v-for="(channel, index) in channels"
          :key="channel.id"
          :isLastChild="index + 1 === channels.length"
          :changeChannel="() => changeChannel(channel)"
          :name="channel.name"
          :active="activeChannel(channel)"
        />
      </ul>
    </div>

    <!-- Modal -->

    <b-modal id="channelModal">
      <template #modal-header>
        <h5 class="modal-title text-dark">Modal title</h5>
        <button
          type="button"
          class="close"
          @click="cancelAddChannel()"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </template>
      <form action="">
        <div class="form-group">
          <input
            type="text"
            v-model="newChannel"
            id="new_channel"
            name="new_channel"
            placeholder="Channel Name"
            class="form-control"
          />
        </div>
        <!-- errors -->
        <ul class="list-group" v-if="hasErrors">
          <li
            class="text-danger"
            v-for="(error, index) in errors"
            :key="'error-' + index"
          >
            {{ error }}
          </li>
        </ul>
      </form>
      <template #modal-footer>
        <button
          type="button"
          class="btn btn-secondary"
          @click="cancelAddChannel()"
        >
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="addChannel()"
        >
          Add Channel
        </button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Channel from '@/components/sidebar/channels/Channel';
import firebase from 'firebase/app';
import { mapGetters } from 'vuex';

export default {
  name: 'channels',
  components: {
    Channel,
  },
  data () {
    return {
      loading: true,
      newChannel: '',
      errors: [],
      channelsRef: firebase.database().ref('channels'),
      channels: [],
    }
  },
  mounted () {
    this.loadChannels();
    // this.addListeners();
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0
    },
    ...mapGetters(['currentChannel']),
  },
  methods: {
    loadChannels () {
      this.channelsRef.on('value', snapshot => {
        const value = snapshot.val();
        this.channels = value ? value : [];
        this.loading = false;

        if (this.channels.length > 0) {
          const channel = this.channels[0];
          this.$store.dispatch('setCurrentChannel', channel);
        }
      });
    },
    cancelAddChannel () {
      this.newChannel = '';
      this.errors = [];
      this.$bvModal.hide('channelModal')
    },

    addChannel () {
      const { channels } = this;

      const nextKey = channels.length;
      const id = this.channelsRef.push().key;

      const newChannel = { id, name: this.newChannel };

      this.channelsRef.child(nextKey).update(newChannel)
        .then(() => {
          this.cancelAddChannel();
        }).catch((error) => {
          this.errors.push(error.message);
        });
    },
    activeChannel (channel) {
      return channel.id === this.currentChannel.id;
    },
    changeChannel (channel) {
      this.$store.dispatch('setPrivate', false);
      this.$store.dispatch('setCurrentChannel', channel);
    },
    // addListeners () {
    //   this.channelsRef.on('child_added', snapshot => {
    //     this.channels.push(snapshot.val());

    //     // set current channel
    //     if (this.channels.length > 0) {
    //       this.currentChannel = this.channels[0];
    //       this.$store.dispatch('setCurrentChannel', this.currentChannel);
    //     }
    //   });

    // },
    detachListeners() {
      this.channelsRef.off();
    },
  },
  beforeDestroy() {
    this.detachListeners();
  },
}
</script>
