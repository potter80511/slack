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
      privateMessagesRef: firebase.database().ref('privateMessages'),
      messages: [],
      channel: null,
      listeners: [],
    };
  },
  mounted() {

  },
  computed: {
    ...mapGetters(['currentChannel', 'currentUser', 'isPrivate']),
    getMessagesRef() {
      const {
        isPrivate,
        privateMessagesRef,
        messagesRef,
      } = this;

      return isPrivate ? privateMessagesRef : messagesRef;
    },
  },
  watch: {
    currentChannel() {
      // this.messages = [];
      this.detachListeners();
      this.loadMessages();
      this.channel = this.currentChannel;
    }
  },
  methods: {
    loadMessages () {
      const messagesRef = this.getMessagesRef;
      messagesRef.child(this.currentChannel.id).on('child_added', snapshot => {
        // console.log('load')
        const message = snapshot.val();
        message['id'] = snapshot.key;

        this.messages.push(message);
        // this.loading = false;

      });

      this.addToListeners(this.currentChannel.id, messagesRef, 'child_added');
    },

    addToListeners(id, ref, event) {
      const index = this.listeners.findIndex(el => {
        return el.id === id && el.ref === ref && el.event === event;
      });

      if (index === -1) {
        this.listeners.push({ id, ref, event });
      }
    },

    detachListeners() {
      this.listeners.forEach(listener => {
        listener.ref.child(listener.id).off(listener.event);
      });

      this.listeners = [];
      this.messages = [];
      // const {
      //   channel,
      //   channel: { id },
      // } = this;
      // if (channel !== null) {
      //   this.messagesRef.child(id).off();
      // }
    },
  },
  beforeDestroy() {
    this.detachListeners();
  },
}
</script>
