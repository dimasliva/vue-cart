<template>
  <div>
    <div class="d-flex justify-content-end m-2">
      <cart :total="total" :products="inCart" />
    </div>
    <div class="container">
      <div class="row">
      <div class="border border-1 w-25 mx-auto mt-2 rounded py-2" v-for="(card, i) in products">

          <img class="w-75" :src="require(`/src/assets/img/${card.img}`)"/>
          <h5>{{card.title}}</h5>

          <div class="d-flex flex-column">
            <span @click="getCart(i)">{{card.desc}}</span>
            <span>{{card.price}}₽</span>
          </div>
          <div class="d-flex justify-content-center">
            <button v-if="card.total == 0" @click="toCart(i, card)" class="btn btn-success">Купить</button>
            <router-link :to="{name: 'Order', params: {total: total, inCart: JSON.stringify(products) }}">
              <button v-if="card.total > 0" class="btn btn-outline-warning">В корзине</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <span><a style="text-decoration: none" target="_blank" href="https://github.com/dimasliva/vue-cart">Ссылка</a> на github проекта</span>
    </div>
  </div>
</template>

<script>
import Cart from "@/components/Cart";
export default {
  name: 'Products',
  components: {Cart},
  data: () => ({
    // Cards - Имитация данных, что приходят с сервера
    cards: [
      {id: 1, img: 'one.png', price: 300, sum_price: 0, title: 'Кепка', desc: 'Модный кепарь', total: 0},
      {id: 2, img: 'two.png', price: 100, sum_price: 0, title: 'Шапка', desc: 'Модная шапка', total: 0},
      {id: 3, img: 'three.png', price: 150, sum_price: 0, title: 'Очки', desc: 'Усатые очки', total: 0},
    ],
    total: 0,
    products: [],
    inCart: 0,
  }),
  methods: {
    getCart(i) {
    },
    toCart(i, card) {
      console.log(this.inCart)
      console.log(this.inCart)
      this.products[i].total = 1
      this.total += this.cards[i].price
      this.inCart = parseInt(this.inCart) + parseInt(this.products[i].total)
    }
  },
  created() {
    if(this.$route.params.total) {
      this.total = parseInt(this.$route.params.total);
      this.products = JSON.parse(this.$route.params.products);
      this.products.map((val, i) => {
        this.inCart = parseInt(this.inCart) + parseInt(this.products[i].total)
      })
    }
    this.products.length == 0 ? this.products = this.cards : this.products
  }
}
</script>
