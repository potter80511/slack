<template>
  <div
    id="msgContainer"
    class="mt-3 messages"
    ref="msgContainer"
  >
    <div
      class="media mb-3"
      v-for="message in messages"
      :key="message.id"
    >
      <img :src="message.user.avatar" height="50" class="align-self-start mr-3">
      <div class="media-body">
        <h6 class="mt-0">
          <a href="#">{{ message.user.name }}</a> - {{ message.timestamp | fromNow }}
        </h6>
        <p class="mb-0" :class="{'self_message': selfMessage(message.user)}">{{ message.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  name: 'single-message',
  props: {
    messages: Array,
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  filters: {
    fromNow(value) {
      return moment(value).fromNow();
    }
  },
  mounted() {
    this.scrollToBottom();
  },
  methods: {
    selfMessage (user) {
      return user.id === this.currentUser.uid;
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.msgContainer;
        container.scrollTop = container.scrollHeight - 80;
      })
    },
  },
  watch: {
    messages(val) {
      if (val) {
        this.scrollToBottom();
      }
    }
  },
}
</script>
<style lang="scss">
body {
  height: 100vh;
  overflow: hidden;
}
</style>

<style lang="scss" scoped>
#msgContainer {
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 80px;
  img {
    border-radius: 5px;
  }
  .self_message {
    border-left: 3px solid #dc2d2d;
    padding: 0 10px;
  }
}
</style>
