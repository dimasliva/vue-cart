<template>
  <div class="d-flex align-items-center" @click="countProducts">
    <div class="d-flex me-1">
      <i style="position: relative; font-size: 25px" class="fa-solid fa-cart-shopping">
        <span class="products">{{products}}</span>
      </i>
    </div>
    <span>{{total}}₽</span>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: {
    total: {
      type: Number,
      required: true
    },
    products: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    inCart: 0
  }),
  methods: {
    countProducts() {
      console.log(this.$props.products)
    }
  }
}
</script>
<style>
  .products {
    position: absolute;
    left: 18px;
    top: -5px;
    background-color: #42b983;
    border: none;
    border-radius: 20px;
    padding: 3px;
    font-size: 12px;
    color: white;
  }
</style>

