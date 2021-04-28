<template>
  <div>
    <SingleMessage/>
    <MessageForm/>
  </div>
</template>

<script>
import SingleMessage from '@/components/messages/SingleMessage';
import MessageForm from '@/components/messages/MessageForm';
import firebase from 'firebase/app';

export default {
  name: 'messages',
  components: {
    SingleMessage,
    MessageForm,
  },
  data () {
    return {
      messagesRef: firebase.database().ref('messages')
    };
  },
}
</script>
