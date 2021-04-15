<template>
  <div>
    <!-- <button class="btn btn-outline-primary">Add Channel</button> -->
    <b-button v-b-modal.channelModal>Add Channel</b-button>

    <!-- Modal -->

    <b-modal id="channelModal">
      <template #modal-header="{ close }">
        <h5 class="modal-title text-dark">Modal title</h5>
        <button
          type="button"
          class="close"
          @click="close()"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </template>
      <form action="">
        <div class="form-group">
          <input type="text" id="new_channel" name="new_channel" placeholder="Channel Name" class="form-control">
        </div>
      </form>
      <template #modal-footer="{ ok, cancel }">
        <button
          type="button"
          class="btn btn-secondary"
          @click="cancel()"
        >
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="ok()"
        >
          Add Channel
        </button>
      </template>
    </b-modal>
    <!-- <div class="modal fade" id="channelModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <form action="">
              <div class="form-group">
                <input type="text" id="new_channel" name="new_channel" placeholder="Channel Name" class="form-control">
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary">Add Channel</button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>

export default {
  name: 'channels',
}
</script>
