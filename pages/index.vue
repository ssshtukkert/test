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
import { ref } from "vue";
import productCardCe from "~/components/ui/productCard.ce.vue";
import { useStore } from "../stores/useStore";
import { useRoute } from "vue-router";

const store = useStore();
const cards = store.$state.products;

const sellType = ref<string>("all");
const searchText = ref<string>("");

const route = useRoute();

const filteredProducts = computed(() => {
  return cards.filter((product) => {
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

<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap");
body {
  overflow-x: hidden;
}
.toolbar {
  width: 100vw;
  height: 70px;
  background-color: #e0e3ee;
}
.navField {
  width: 100%;
}
.navbar {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  column-gap: 30px;
  color: #2d3b87;
}
.navbarItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.filterSection {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
}
.toggle {
  background-color: #f4f5f9;
  color: #969dc3;
}
.rubik {
  font-family: "Rubik", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}
.searchField {
  display: flex;
  width: 200px;
}
.types {
  display: flex;
  width: 50%;
  justify-content: start;
}
.search {
  display: flex;
  width: 50%;
  justify-content: end;
}
a {
  text-decoration: none;
  color: inherit;
}

/* --------- */
.cardMainBlock {
  display: flex;
  flex-direction: row;
  border-color: #e0e3ee;
  border-radius: 20px;
  border: 1px solid #e0e3ee;
  width: 100%;
  margin-top: 20px;
  max-height: 300px;
}
.leftCardBlock {
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  width: 70%;
  align-items: start;
}
.rightCardBlock {
  border-color: #e0e3ee;
  border-radius: 20px;
  border: 1px solid #e0e3ee;
  width: 30%;
  padding-top: 15px;
  border-top: none;
  border-bottom: none;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.button {
  background-color: #f4f5f9;
  color: #2d3b87;
}
.btnGroup {
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  position: absolute;
  bottom: 20px;
}
</style>
