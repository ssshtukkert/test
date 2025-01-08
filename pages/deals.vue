<template>
  <q-layout class="rubik">
    <q-header elevated>
      <q-toolbar class="toolbar"> </q-toolbar>
    </q-header>
    <q-page-container style="width: 70%; display: flex; justify-self: center">
      <q-page class="q-pa-md" style="width: 100%">
        <nav class="navField">
          <div class="navbar">
            <div class="navbarItem">
              <img src="../components/images/favourite_20.png" alt="" />
              <nuxt-link to="/favourites">Избранное</nuxt-link>
            </div>
            <div class="navbarItem">
              <img src="../components/images/stock_20.png" alt="" />
              <nuxt-link to="/">Склад</nuxt-link>
            </div>
            <div class="navbarItem">
              <img src="../components/images/bag_20.png" alt="" />
              <nuxt-link to="/deals">Сделки</nuxt-link>
            </div>
          </div>
        </nav>
        <div class="filterSection">
          <div class="types">
            <q-btn-toggle
              class="toggle"
              no-caps
              v-model="sellType"
              flat
              :options="[
                { label: 'Все типы', value: 'all' },
                { label: 'Прямые продажи', value: 'direct' },
                { label: 'Аукцион', value: 'auction' },
              ]"
            />
          </div>
          <div class="search">
            <q-input
              dense
              outlined
              v-model="searchText"
              label="Поиск"
              class="searchField"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
        <div style="width: 100%" v-for="card in filteredProducts">
          <productCardCe
            :image="card.image"
            :type="card.type"
            :name="card.name"
            :city="card.city"
            :seller="card.seller"
            :category="card.category"
            :description="card.description"
            :finalPrice="card.price * card.quantity"
            :quantity="card.quantity"
            :price="card.price"
            :obj="card"
            :currentRoute="route.path"
            :paymentState="card.payment"
          />
        </div>
        <div
          style="color: #2d3b87; font-size: 15px; margin-top: 20px"
          v-if="filteredProducts[0] == undefined"
        >
          Результатов: 0
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "../stores/useStore";
import { useRoute } from "vue-router";
import productCardCe from "~/components/ui/productCard.ce.vue";

const store = useStore();
const deals = store.$state.deals;

const sellType = ref<string>("all");
const searchText = ref<string>("");

const route = useRoute();

const filteredProducts = computed(() => {
  return deals.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchText.value.toLowerCase());
    const matchesType =
      sellType.value === "all" ||
      product.typeEN.toLowerCase() === sellType.value.toLowerCase();
    return matchesSearch && matchesType;
  });
});
</script>
