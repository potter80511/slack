<template>
  <li
    class="each-channel"
    :class="!isLastChild && 'mb-3'"
    @click.prevent="() => changeChannel()"
  >
    <span>
      <span class="avatar mr-2">
        <span
          v-if="isUser && !isCurrentUser"
          class="online-light rounded-circle"
          :class="isOnline ? 'bg-success' : 'bg-secondary'"
        />
        <img alt="" class="img rounded-circle" :src="avatar" height="30" />
      </span>
      <span
        class="channel-name"
        :class="active ? 'text-light font-weight-bold' : 'text-muted'"
      >
        <span v-if="!isUser" class="mr-3">#</span>
        {{ name }}
      </span>
      <span v-if="isCurrentUser" class="text-secondary ml-2">you</span>
    </span>
  </li>
</template>

<script>

export default {
  props: {
    isUser: {
      type: Boolean,
    },
    isOnline: {
      type: Boolean,
    },
    isCurrentUser: {
      type: Boolean,
    },
    active: {
      type: Boolean,
    },
    isLastChild: {
      type: Boolean,
    },
    avatar: {
      type: String,
    },
    name: {
      type: String,
    },
    changeChannel: {
      type: Function,
    },
  },
}
</script>

<style lang="scss" scoped>
.each-channel {
  cursor: pointer;
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

