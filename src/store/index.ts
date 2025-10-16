import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const cartStore = (set: any) => ({
  cart: [],
  //add to product cart
  addProductToCart: (product: any) => {
    set((state: any) => ({
      cart: [...state.cart, product],
    }));
    //remove product from cart
  },
    removeProductFromCart: (productId: string) =>
    set((state:any) => ({
      cart: state.cart.filter((item: any) => item.id !== productId),
    })),
  clearCart: () => set({ cart: [] }),

});
const useCartStore = create(devtools(persist(cartStore, { name: "cart" })));

export default useCartStore;
