<template>
  <div>
    <div class="messageForm">
      <form @submit.prevent="sendMessage">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control mt-3"
            v-model.trim="message"
            name="message"
            id="message"
            placeholder="Write someting..."
          />

          <div class="input-group-append">
            <button
              class="btn btn-primary mt-3"
              type="button"
              @click="sendMessage"
            >Send</button>
          </div>
          <div class="input-group-append">
            <button class="btn btn-warning mt-3" type="button">Upload</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import { mapGetters } from 'vuex';

export default {
  name: 'message-form',
  data () {
    return {
      message: '',
      errors: [],
    };
  },
  computed: {
    ...mapGetters(['currentChannel', 'currentUser']),
  },
  methods: {
    sendMessage () {
      const {
        currentUser: {
          displayName,
          photoURL,
          uid,
        },
        currentChannel,
        message,
      } = this;

      const newMessage = {
        content: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          name: displayName,
          avatar: photoURL,
          id: uid,
        },
      };

      if (currentChannel !== null) {
        if (message) {
          this.$parent.messagesRef.child(currentChannel.id).push().set(newMessage)
           .then(() => {
             console.log('message send!')
           }).catch(error => {
             this.errors.push(error.message);
           });

           // reset message
           this.message = '';
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .messageForm {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 66.7%;
    z-index: 100;
    color: white;
    text-align: center;
    margin-bottom: -16px;
    margin-left: 33.3%;
    input, button {
      height: 50px;
    }
  }
</style>
