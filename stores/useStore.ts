import { defineStore } from "pinia";
import productsData from "../components/data/products.json";

export const useStore = defineStore("main", {
  state: () => ({
    products: productsData,
    favorites: [] as Object[],
    deals: [] as Object[],
  }),
  actions: {
    addToFavorites(product: Object) {
      if (this.favorites.find((deal) => deal.id === product.id) == undefined) {
        this.favorites.push(product);
      }
    },
    addToDeals(product: Object) {
      if (this.deals.find((deal) => deal.id === product.id) == undefined) {
        const newObject = { ...product, payment: false, liked: false };
        this.deals.push(newObject);
      }
    },
    payTheBill(product: Object) {
      const deal = this.deals.find((deal) => deal.id === product.id); // Находим объект в deals
      if (deal) {
        deal.payment = true; // Устанавливаем payment в true
      }
    },
  },
});
