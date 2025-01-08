<template>
  <div class="cardMainBlock">
    <div class="leftCardBlock">
      <div style="display: flex; flex-direction: column; width: 30%">
        <img
          alt="Изображение товара"
          :src="image"
          style="margin-bottom: 20px; border-radius: 10px; max-height: 250px"
        />
      </div>
      <div
        style="
          display: flex;
          flex-direction: column;
          row-gap: 10px;
          margin-left: 10px;
          width: 70%;
        "
      >
        <div style="color: #969dc3; font-size: 13px; font-weight: 400">
          {{ type }}
        </div>
        <div style="color: #2d3b87; font-weight: 500; font-size: 15px">
          {{ name }}
        </div>
        <div
          style="
            background-color: #f4f5f9;
            border-radius: 5px;
            display: inline-flex;
            align-items: center;
            column-gap: 5px;
            color: #616ca5;
            font-size: 13px;
            font-weight: 400;
            padding: 5px;
          "
        >
          <img
            style="margin-top: 2px"
            src="../images/geo_15.png"
            alt="Геолокация"
          />
          <div>{{ city }}</div>
        </div>
        <div
          style="
            color: #969dc3;
            font-size: 13px;
            font-weight: 400;
            display: flex;
            flex-direction: row;
            column-gap: 5px;
          "
        >
          <div>Продавец:</div>
          <div style="color: #2d3b87; font-size: 13px; font-weight: 400">
            {{ seller }}
          </div>
        </div>
        <div
          style="
            background-color: #f4f5f9;
            border-radius: 5px;
            font-size: 13px;
            font-weight: 400;
            padding: 5px;
            display: inline-flex;
            flex-direction: column;
            row-gap: 5px;
          "
        >
          <div style="color: #969dc3; font-weight: 400">Вид товара:</div>
          <div style="color: #616ca5">{{ category }}</div>
        </div>
        <div
          style="color: #2d3b87; font-size: 13px; font-weight: 400; width: 90%"
        >
          <p
            style="text-overflow: ellipsis; overflow: hidden; max-height: 60px"
          >
            {{ description }}
          </p>
        </div>
      </div>
    </div>
    <div class="rightCardBlock">
      <div>
        <div style="color: #2d3b87; font-weight: 500; font-size: 20px">
          {{ finalPrice }} ₽
        </div>
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 95%;
            margin-top: 10px;
          "
        >
          <div style="color: #969dc3">Количество</div>
          <div style="color: #2d3b87">{{ quantity }} шт.</div>
        </div>
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 95%;
            margin-top: 5px;
          "
        >
          <div style="color: #969dc3">Стоимость за штуку</div>
          <div style="color: #2d3b87">{{ price }} ₽</div>
        </div>
      </div>
      <div class="btnGroup">
        <q-btn
          v-if="currentRoute == '/' || currentRoute == '/favourites'"
          class="button"
          no-caps
          label="Добавить в сделки"
          @click="addToDeals()"
        />
        <q-btn
          v-if="currentRoute == '/deals' && !paymentState"
          class="button"
          no-caps
          label="Оплатить"
          @click="pay"
          style="background-color: #69c57f; color: white"
        />
        <q-btn
          v-if="currentRoute == '/deals' && paymentState"
          class="button"
          no-caps
          label="Оплачено"
          @click="pay"
          style="background-color: #ffffff; color: #969dc3"
          disabled
        />

        <q-btn
          v-if="currentRoute == '/favourites'"
          class="button"
          style="background-color: #2d3b87"
          ><img
            src="../images/Vector (Stroke) (1).png"
            alt="Добавить в избранное"
        /></q-btn>
        <q-btn v-else class="button" @click="addToFav()"
          ><img src="../images/Vector (Stroke).png" alt="Добавить в избранное"
        /></q-btn>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  image: {
    type: String,
  },
  type: {
    type: String,
    default: "Прямая продажа",
  },
  name: {
    type: String,
    default: "Брус",
  },
  city: {
    type: String,
    default: "",
  },
  seller: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "Стройматериалы",
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  finalPrice: {
    type: Number,
    default: 0,
  },
  obj: {
    type: Object,
    required: true,
  },
  currentRoute: {
    type: String,
  },
  paymentState: {
    type: Boolean,
    default: false,
  },
});

import { useStore } from "../../stores/useStore";

const store = useStore();
const productIsPayed = ref<Boolean>(false);

function addToDeals() {
  store.addToDeals(props.obj);
}
function addToFav() {
  store.addToFavorites(props.obj);
}
function pay() {
  store.payTheBill(props.obj);
  productIsPayed.value = true;
}
</script>
