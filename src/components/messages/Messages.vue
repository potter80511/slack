<template>
  <div>
    <SingleMessage :messages="messages" />
    <MessageForm/>
  </div>
</template>

<script>
import SingleMessage from '@/components/messages/SingleMessage';
import MessageForm from '@/components/messages/MessageForm';
import firebase from 'firebase/app';
import { mapGetters } from 'vuex';

export default {
  name: 'messages',
  components: {
    SingleMessage,
    MessageForm,
  },
  data () {
    return {
      messagesRef: firebase.database().ref('messages'),
      messages: [],
      channel: '',
    };
  },
  mounted() {

  },
  computed: {
    ...mapGetters(['currentChannel'])
  },
  watch: {
    currentChannel() {
      this.messages = [];
      this.loadMessages();
      this.channel = this.currentChannel;
    }
  },
  methods: {
    loadMessages () {
      this.messagesRef.child(this.currentChannel.id).on('child_added', snapshot => {
        // console.log('load')
        const value = snapshot.val();
        this.messages.push(value);
        // this.loading = false;
      });
    },
    detachListeners() {
      const {
        channel,
        channel: { id },
      } = this;
      if (channel !== null) {
        this.messagesRef.child(id).off();
      }
    },
  },
  beforeDestroy() {
    this.detachListeners();
  },
}
</script>
