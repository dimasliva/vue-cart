<template>
  <div class="modal d-flex black_bg" v-if="$props.isOpen">
    <div class="modal-dialog my-auto">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Заказ отправлен!</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Заказ на сумму ₽{{total}} совершён. Спасибо за заказ.
        </div>
        <div class="modal-footer mx-auto">
          <button @click="isClose()" type="button" class="btn btn-success">Окей</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Confirm',
  props: {
    total: {
      type: Number,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: true
    },
    products: {
      type: Array,
      required: true
    },
  },
  methods: {
    isClose() {
      this.$props.total = 0;
      this.$props.products = [];
      this.$emit('updateParent', {
        products: [],
        total: 0,
        isOpen: false
      })
    }
  },
}
</script>
<style scoped>
  body {
    position: relative;
    -webkit-background-size: cover;
    background-size: cover;
  }

  body:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    z-index: 2;
  }
</style>

