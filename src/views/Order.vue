<template>
  <section style="background-color: #d2c9ff; height: 100%">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12">
          <div class="card card-registration card-registration-2" style="border-radius: 15px;">
            <div class="card-body p-0">
              <div class="row g-0">
                <div class="col-lg-8">
                  <div class="p-5">
                    <div class="d-flex justify-content-between align-items-center mb-5">
                      <h1 class="fw-bold mb-0 text-black">Корзина</h1>
                      <h6 class="mb-0 text-muted" v-if="inCart == 1">Итого {{this.inCart}} товар</h6>
                      <h6 class="mb-0 text-muted" v-else>Итого {{this.inCart}} товаров</h6>
                    </div>
                    <div v-for="(product,i ) in products">
                      <div v-if="product.total > 0">
                        <hr class="my-4">
                        <div class="row mb-4 d-flex justify-content-between align-items-center">
                          <div class="col-md-2 col-lg-2 col-xl-2">
                            <img
                                    :src="require(`/src/assets/img/${product.img}`)"
                                    class="img-fluid rounded-3" alt="Cotton T-shirt">
                          </div>
                          <div class="col-md-3 col-lg-3 col-xl-3">
                            <h6 class="text-muted">{{product.desc}}</h6>
                            <h6 class="text-black mb-0">{{product.title}}</h6>
                          </div>
                          <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <button class="btn btn-link px-2"
                                    @click="delProduct(i)">
                              <i class="fas fa-minus"></i>
                            </button>
                            <button class="btn btn-outline">{{product.total}}</button>
                            <button class="btn btn-link px-2"
                                    @click="addProduct(i)">
                              <i class="fas fa-plus"></i>
                            </button>
                          </div>
                          <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 class="mb-0">₽ {{product.sum_price}}</h6>
                          </div>
                          <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                            <a @click="removeProduct(i)" class="text-muted cursor"><i class="fas fa-times"></i></a>
                          </div>
                        </div>
                        <hr class="my-4">
                      </div>
                    </div>


                    <div class="pt-5">
                      <h6 class="mb-0">
                        <router-link :to="{name: 'products', params: {total: total, products: JSON.stringify(products) }}" class="text-body">
                        <i class="fas fa-long-arrow-alt-left me-2"></i>Назад к товарам
                        </router-link>
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 bg-grey">
                  <div class="p-5">
                    <div class="d-flex justify-content-between mb-5">
                      <h5 class="text-uppercase">Итого</h5>
                      <h5>₽ {{this.total}}</h5>
                    </div>

                    <button :disabled="products.length == 0" type="button" class="btn btn-dark btn-block btn-lg"
                            data-mdb-ripple-color="dark" @click="confirmOrder()">Заказать</button>

                  </div>
                </div>
              </div>
            </div>
          </div>
<!--     Popup     -->
          <div class="my-auto">
            <Confirm :total="total"
                     :is-open="isConfirm"
                     :products="products"
                     @updateParent="afterConfirm"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import Confirm from "@/components/Confirm";
  export default {
    name: 'Order',
    components: {Confirm},
    data: () => ({
      total: 0,
      isConfirm: false,
      products: [],
      inCart: 0,
    }),
    methods: {
      confirmOrder() {
        this.isConfirm = !this.isConfirm
      },
      afterConfirm(data) {
        this.products = data.products;
        this.total = data.total;
        this.isConfirm = data.isOpen;
      },
      addProduct(i) {
        this.products[i].total = this.products[i].total + 1;
        this.total = parseInt(this.total) + parseInt(this.products[i].price)
        this.inCart = 0
        this.products.map((val, i) => {
          this.inCart = parseInt(this.inCart) + parseInt(this.products[i].total)
        })

        if(this.products[i].total < 0) {
          this.products[i].total = 0;
        } else if (this.products[i].total > 99) {
          this.products[i].total = 99;
        }
          this.products[i].sum_price = this.products[i].price * this.products[i].total;
      },
      delProduct(i) {
        this.products[i].total = this.products[i].total - 1;
        this.total = parseInt(this.total) - parseInt(this.products[i].price)
        this.inCart = 0
        this.products.map((val, i) => {
          this.inCart = parseInt(this.inCart) + parseInt(this.products[i].total)
        })
      },
      removeProduct(i) {
        this.products[i].total = 0
      }
    },
    created() {
      this.total = this.$route.params.total;
      this.products = JSON.parse(this.$route.params.inCart);
      this.products.map((val, i) => {
        val.sum_price = val.price
        this.inCart = parseInt(this.inCart) + parseInt(this.products[i].total)
      })
      console.log(this.products)
    }
  }
</script>
