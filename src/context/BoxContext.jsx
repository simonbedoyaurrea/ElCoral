import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBoxStore = create(
  persist(
    (set, get) => ({
      cart: [], // lista de productos en el carrito

      // Agregar un producto
      addToCart: (product) => {
        const cart = get().cart;
        const existing = cart.find((item) => item.id === product.id);

        if (existing) {
          // si ya existe, aumentar la cantidad
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // si no existe, agregarlo
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },

      // Quitar un producto
      removeFromCart: (id) => {
        const cart = get().cart;
        set({ cart: cart.filter((item) => item.id !== id) });
      },

      // Cambiar cantidad manualmente
      updateQuantity: (id, quantity) => {
        const cart = get().cart;
        set({
          cart: cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      // Vaciar carrito
      clearCart: () => set({ cart: [] }),

      // Calcular total
      total: () => {
        const cart = get().cart;
        return cart.reduce(
          (acc, item) => acc + (item.precio ?? item.price ?? 0) * item.quantity,
          0
        );
      },
    }),
    {
      name: "elcoral-cart", // key in localStorage
    }
  )
);

export default useBoxStore;



