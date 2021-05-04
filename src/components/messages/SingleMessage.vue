<template>
  <div class="mt-3 messages" ref="msgContainer" id="msgContainer" @scroll="checkScroll">
    <div @click="scrollToBottom">scroll</div>
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
      console.log('click')
      // const container = this.$refs.msgContainer;
      // container.scrollTop = 300;
      // container.scrollTop = container.scrollHeight - 50;
    },
    checkScroll() {
      console.log('checkScroll');
      // const container = this.$refs.msgContainer;
      // console.log(container.scrollBottom, 'scrollToBottom');
    },
  },
  // watch: {
  //   messages(val) {
  //     // console.log('add')
  //     // console.log(val)
  //     this.scrollToBottom();
  //     this.$nextTick(function() {
  //       console.log(val, 'message')
  //       // const container = this.$refs.msgContainer;
  //       // console.log(container.scrollHeight, 'container')
  //       // container.scrollTop = container.scrollHeight - 50;
  //     });
  //   }
  // },
}
</script>

<style lang="scss" scoped>
#msgContainer {
  // height: 300px;
  overflow-y: scroll;
  padding-bottom: 50px;
  img {
    border-radius: 5px;
  }
  .self_message {
    border-left: 3px solid #dc2d2d;
    padding: 0 10px;
  }
}
</style>
