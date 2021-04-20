<template>
  <div>
    <SingleMessage/>
    <MessageForm/>
  </div>
</template>

<script>
import SingleMessage from '@/components/messages/SingleMessage';
import MessageForm from '@/components/messages/MessageForm';

export default {
  name: 'messages',
  components: {
    SingleMessage,
    MessageForm,
  },
}
</script>
